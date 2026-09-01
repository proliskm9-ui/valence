"""MacBook plate: natural display bezels, LCD hole only, open studio."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
CASES = ROOT / "public" / "cases"
SRC = ROOT / "scripts" / "assets" / "macbook-mesti-src.png"

# Inset from the placeholder white so the black display bezel stays on the plate.
LCD = (278, 171, 746, 464)
NOTCH = (487, 158, 536, 178)
CORNER_R = 7


def rounded_lcd(h: int, w: int) -> tuple[np.ndarray, np.ndarray]:
    hole_img = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(hole_img)
    x0, y0, x1, y1 = LCD
    draw.rounded_rectangle([x0, y0, x1 - 1, y1 - 1], radius=CORNER_R, fill=255)

    notch_img = Image.new("L", (w, h), 0)
    nd = ImageDraw.Draw(notch_img)
    nx0, ny0, nx1, ny1 = NOTCH
    nd.rectangle([nx0, ny0, nx1 - 1, ny1 - 1], fill=255)

    hole = np.array(hole_img) > 0
    notch = np.array(notch_img) > 0
    hole = ndimage.binary_dilation(hole, iterations=1)
    hole &= ~notch
    hole[469:, :] = False
    return hole, notch


def main() -> None:
    src = Image.open(SRC).convert("RGB")
    arr = np.array(src).astype(np.float32)
    sh, sw = arr.shape[:2]
    gray = arr.mean(axis=2)

    hole, notch = rounded_lcd(sh, sw)

    local = arr.copy()
    local[hole] = 5.0

    bezel = ndimage.binary_dilation(hole | notch, iterations=11) & ~hole
    bezel[478:, :] = False
    bezel[:, :262] = False
    bezel[:, 762:] = False
    bezel[:155, :] = False
    paint = bezel & ~notch & ((gray < 50) | (gray > 70))
    local[paint] = (28.0, 28.0, 31.0)

    inner = ndimage.binary_dilation(hole, iterations=1) & ~hole & ~notch
    local[inner] = (56.0, 56.0, 60.0)

    local[notch] = np.clip(arr[notch] * 0.88 + np.array([4.0, 4.0, 6.0]), 0, 255)

    lid = np.zeros((sh, sw), dtype=bool)
    lid[152:478, 256:768] = True
    # Specular metal of the chassis only — never the leftover LCD pixels.
    metal = lid & (gray > 48) & ~hole & ~ndimage.binary_dilation(hole, iterations=6)
    if metal.any():
        glow = np.empty_like(arr)
        for c in range(3):
            glow[..., c] = ndimage.gaussian_filter(arr[..., c], sigma=0.55)
        local[metal] = 0.7 * arr[metal] + 0.3 * glow[metal]

    ped = gray > 13
    ped[:472, :] = False
    ped = ndimage.binary_fill_holes(ped)
    ped = ndimage.binary_closing(ped, iterations=3)
    ped = ndimage.binary_dilation(ped, iterations=3)

    hard = (lid | ped | notch) & ~hole
    alpha_src = hard.astype(np.float32)
    ring = ndimage.binary_dilation(ped, iterations=10) & ~ped & ~lid
    ring[:505, :] = False
    alpha_src = np.clip(
        alpha_src + ndimage.gaussian_filter(ring.astype(np.float32), sigma=3.0) * 0.16,
        0,
        1,
    )
    alpha_src[hole] = 0.0

    stage_h = sh
    stage_w = int(round(stage_h * 1.6))
    ox = (stage_w - sw) // 2

    placed = np.zeros((stage_h, stage_w, 3), dtype=np.float32)
    alpha = np.zeros((stage_h, stage_w), dtype=np.float32)
    placed[0:sh, ox : ox + sw] = local
    alpha[0:sh, ox : ox + sw] = alpha_src

    out = Image.fromarray(
        np.dstack([placed, np.clip(alpha * 255, 0, 255)]).astype(np.uint8),
        "RGBA",
    )
    dest = CASES / "macbook-frame.png"
    out.save(dest, format="PNG")

    ys, xs = np.where(hole)
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    print("saved", dest.name, out.size)
    print("hole bbox src", x0, y0, x1, y1)
    print("screen css:")
    print(f"  left: {(ox + x0) / stage_w * 100:.4f}%;")
    print(f"  top: {y0 / stage_h * 100:.4f}%;")
    print(f"  width: {(x1 - x0) / stage_w * 100:.4f}%;")
    print(f"  height: {(y1 - y0) / stage_h * 100:.4f}%;")


if __name__ == "__main__":
    main()
