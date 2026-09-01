"""Put live screenshots onto the original device mockups.

The previous approach failed because it chroma-keyed silver metal against a
gray studio: the laptop body was classified as background, so the themed
backdrop leaked through as green noise and leftover studio stayed as white
jagged patches. JPEG then crushed the holes.

This version:
  1. Warps screenshots onto hardcoded screen quads (fixed mockup templates).
  2. Cuts the device with a border flood-fill against the studio gradient,
     never against device luminance.
  3. Keeps contact shadows as a soft alpha ring.
  4. Composites onto a themed studio and saves PNG.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
CASES = ROOT / "public" / "cases"

THEMES = {
    "zaz": {
        "base": np.array([10.0, 24.0, 38.0]),
        "accent": np.array([46.0, 148.0, 164.0]),
        "glow_xy": (0.22, 0.42),
        "floor": True,
    },
    "mesti": {
        "base": np.array([6.0, 8.0, 7.0]),
        "accent": np.array([36.0, 168.0, 78.0]),
        "glow_xy": (0.76, 0.40),
        "floor": False,
    },
}

# Inner screen corners on the original mockups, TL → TR → BR → BL.
# Mac: outer bezel (not eroded inner) so corners stay filled under perspective.
MAC_SCREEN = [(224.0, 147.0), (686.0, 112.0), (742.0, 437.0), (263.0, 449.0)]
IPHONE_FRONT = [(335.0, 231.0), (462.0, 247.0), (447.0, 580.0), (322.0, 572.0)]
IPHONE_REAR = [(525.0, 119.0), (664.0, 104.0), (670.0, 448.0), (534.0, 456.0)]
ZAZ_FRONT = [(323.0, 198.0), (473.0, 207.0), (474.0, 520.0), (323.0, 525.0)]


def find_coeffs(dest, src):
    matrix = []
    for d, s in zip(dest, src):
        matrix.append([d[0], d[1], 1, 0, 0, 0, -s[0] * d[0], -s[0] * d[1]])
        matrix.append([0, 0, 0, d[0], d[1], 1, -s[1] * d[0], -s[1] * d[1]])
    a = np.array(matrix, dtype=np.float64)
    b = np.array(src, dtype=np.float64).reshape(8)
    return np.linalg.lstsq(a, b, rcond=None)[0].tolist()


def expand_quad(quad, t: float):
    cx = sum(p[0] for p in quad) / 4
    cy = sum(p[1] for p in quad) / 4
    return [(x + (x - cx) * t, y + (y - cy) * t) for x, y in quad]


def polygon_mask(shape, quad, feather: float = 0.0) -> Image.Image:
    img = Image.new("L", (shape[1], shape[0]), 0)
    ImageDraw.Draw(img).polygon([(p[0], p[1]) for p in quad], fill=255)
    if feather > 0:
        img = img.filter(ImageFilter.GaussianBlur(feather))
    return img


def load_shot(path: Path) -> Image.Image:
    img = Image.open(path)
    if img.mode == "RGBA":
        bg = Image.new("RGB", img.size, (8, 8, 8))
        bg.paste(img, mask=img.split()[3])
        return bg
    return img.convert("RGB")


def warp_into(
    base: Image.Image,
    shot: Image.Image,
    quad,
    *,
    grow=0.0,
    feather=0.7,
    clip: np.ndarray | None = None,
) -> Image.Image:
    sw, sh = shot.size
    dest = expand_quad(quad, grow)
    coeffs = find_coeffs(dest, [(0, 0), (sw, 0), (sw, sh), (0, sh)])
    warped = shot.transform(base.size, Image.Transform.PERSPECTIVE, coeffs, Image.Resampling.BICUBIC)
    mask = np.array(polygon_mask((base.size[1], base.size[0]), dest, feather=0.0), dtype=np.float32) / 255.0
    if clip is not None:
        mask = np.minimum(mask, clip.astype(np.float32))
    mimg = Image.fromarray(np.clip(mask * 255, 0, 255).astype(np.uint8), "L")
    if feather > 0:
        mimg = mimg.filter(ImageFilter.GaussianBlur(feather))
    out = base.copy()
    out.paste(warped, (0, 0), mimg)
    return out


def studio_alpha(arr: np.ndarray, tol: float | None = None) -> np.ndarray:
    """Alpha of the device + contact shadow. 1 = keep mockup, 0 = studio."""
    h, w = arr.shape[:2]
    gray = arr.mean(axis=2).astype(np.float32)
    corners = np.array(
        [gray[4:18, 4:18], gray[4:18, -18:-4], gray[-18:-4, 4:18], gray[-18:-4, -18:-4]]
    )
    uniform = float(corners.std()) < 3.5
    if tol is None:
        tol = 3.2 if uniform else 8.0

    edge = np.concatenate([gray[:, :8], gray[:, -8:]], axis=1).mean(axis=1)
    expected = np.repeat(edge[:, None], w, axis=1)
    dist = np.abs(gray - expected)
    local = ndimage.uniform_filter(gray, size=5)
    local_var = ndimage.uniform_filter((gray - local) ** 2, size=5)
    chroma = arr.max(axis=2).astype(np.float32) - arr.min(axis=2).astype(np.float32)
    studio_cand = (dist <= tol) & (local_var < 6) & (chroma <= 4)

    labeled, _n = ndimage.label(studio_cand)
    border_ids = np.unique(
        np.concatenate([labeled[0], labeled[-1], labeled[:, 0], labeled[:, -1]])
    )
    border_ids = border_ids[border_ids != 0]
    studio = np.isin(labeled, border_ids)

    device = ndimage.binary_fill_holes(~studio)
    device |= chroma > 14
    lab, n = ndimage.label(device)
    if n:
        sizes = ndimage.sum(device, lab, range(1, n + 1))
        keep = np.zeros(n + 1, dtype=bool)
        keep[1:] = np.array(sizes) >= max(600, float(device.sum()) * 0.008)
        device = keep[lab]
    device = ndimage.binary_fill_holes(device)
    # Close small inward bites (camera island vs studio) without growing a halo.
    device = ndimage.binary_closing(device, iterations=6)

    hard = device.astype(np.float32)
    # Soft contact shadow: darkened studio around the device.
    ring = ndimage.binary_dilation(device, iterations=22) & ~device
    delta = np.clip(expected - gray, 0, 70) / 70.0
    shadow = ring.astype(np.float32) * np.clip(delta * 1.35, 0, 1)
    alpha = np.clip(hard + shadow, 0, 1)
    # Feather the hard edge so the cut is not crunchy.
    alpha = ndimage.gaussian_filter(alpha, sigma=0.45)
    alpha = np.clip(alpha, 0, 1)
    return alpha


def paint_backdrop(w: int, h: int, theme: str) -> np.ndarray:
    cfg = THEMES[theme]
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    nx = xx / max(w - 1, 1)
    ny = yy / max(h - 1, 1)
    gx, gy = cfg["glow_xy"]
    glow = np.exp(-((nx - gx) ** 2 / 0.13 + (ny - gy) ** 2 / 0.28))
    vignette = 1.0 - np.clip(np.sqrt((nx - 0.5) ** 2 + (ny - 0.52) ** 2) / 0.82, 0, 1) * 0.32
    studio = cfg["base"] + glow[..., None] * cfg["accent"] * 0.22
    studio = studio * vignette[..., None]
    if cfg["floor"]:
        floor = np.clip((ny - 0.62) / 0.38, 0, 1)
        studio = studio + floor[..., None] * np.array([8.0, 16.0, 22.0])
    return np.clip(studio, 0, 255).astype(np.uint8)


def finish(mock: Image.Image, ref: np.ndarray, theme: str, canvas: tuple[int, int] | None = None) -> Image.Image:
    alpha = studio_alpha(ref)
    rgb = np.array(mock.convert("RGB"), dtype=np.float32)
    h, w = rgb.shape[:2]
    backdrop = paint_backdrop(w, h, theme).astype(np.float32)
    out = backdrop * (1.0 - alpha[..., None]) + rgb * alpha[..., None]
    img = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")
    if canvas and (canvas[0] != w or canvas[1] != h):
        stage = Image.fromarray(paint_backdrop(canvas[0], canvas[1], theme), "RGB")
        stage.paste(img, ((canvas[0] - w) // 2, (canvas[1] - h) // 2))
        return stage
    return img


def save(img: Image.Image, path: Path):
    img.save(path, format="PNG", optimize=True)
    print("saved", path.name, img.size)


def build_mac(shot: Path, out: Path, theme: str):
    ref = np.array(Image.open(CASES / "mock-macbook.png").convert("RGB"))
    mock = warp_into(Image.fromarray(ref.copy()), load_shot(shot), MAC_SCREEN, grow=0.03, feather=0)
    save(finish(mock, ref, theme), out)


def yellow_clip(arr: np.ndarray) -> np.ndarray:
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    yellow = (r > 170) & (g > 140) & (b < 110)
    return ndimage.binary_dilation(ndimage.binary_fill_holes(yellow), iterations=5)


def build_iphones(shot_front: Path, shot_rear: Path, out: Path, theme: str):
    ref = np.array(Image.open(CASES / "mock-iphones.png").convert("RGB"))
    clip = yellow_clip(ref)
    mock = Image.fromarray(ref.copy())
    mock = warp_into(mock, load_shot(shot_front), IPHONE_FRONT, grow=0.028, clip=clip)
    mock = warp_into(mock, load_shot(shot_rear), IPHONE_REAR, grow=0.028, clip=clip)
    save(finish(mock, ref, theme), out)


def build_zaz_phones(shot: Path, out: Path, theme: str):
    ref = np.array(Image.open(CASES / "mock-zaz-phones.png").convert("RGB"))
    mock = warp_into(Image.fromarray(ref.copy()), load_shot(shot), ZAZ_FRONT, grow=-0.004)
    save(finish(mock, ref, theme, canvas=(1024, 682)), out)


def main():
    second = CASES / "mesti-mobile-2.png"
    if not second.exists():
        second = CASES / "mesti-mobile.png"
    build_mac(CASES / "retro-zaz-desktop.png", CASES / "zaz-pc.png", "zaz")
    build_mac(CASES / "mesti-desktop.png", CASES / "mesti-pc.png", "mesti")
    build_zaz_phones(CASES / "retro-zaz-mobile.png", CASES / "zaz-mobile.png", "zaz")
    build_iphones(CASES / "mesti-mobile.png", second, CASES / "mesti-mobile-pair.png", "mesti")


if __name__ == "__main__":
    main()
