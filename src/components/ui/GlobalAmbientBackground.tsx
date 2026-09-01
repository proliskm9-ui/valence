'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function GlobalAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // ─────────────────────────────────────────────────────────────────────────
    // SIZING: always work in CSS pixels (no DPR multiplier on the canvas size).
    // The DPR scaling is applied via canvas style, so we never get the
    // "appears in top-left corner" bug caused by oversized internal resolution.
    // ─────────────────────────────────────────────────────────────────────────
    const setSize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Internal resolution = real device pixels → sharp on retina
      canvas.width  = W * dpr;
      canvas.height = H * dpr;

      // CSS size = CSS pixels → covers the full fixed layer correctly
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;

      // Scale context once so all draw calls use CSS-pixel coordinates
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();
    window.addEventListener('resize', setSize, { passive: true });

    let time = 0;

    // ── Wave mesh config ──────────────────────────────────────────────────────
    // Everything below uses CSS pixels (post-transform).
    const COLS = 38;
    const ROWS = 22;

    const render = () => {
      time += 0.006; // Slow, silky

      const W = window.innerWidth;
      const H = window.innerHeight;

      ctx.clearRect(0, 0, W, H);

      // ── Subtle warm ambient glow drifting in the background ──
      const glowX = W * 0.5 + Math.sin(time * 0.5) * W * 0.15;
      const glowY = H * 0.5 + Math.cos(time * 0.4) * H * 0.12;
      const glow  = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, W * 0.55);
      glow.addColorStop(0,   'rgba(255, 77, 0, 0.07)');
      glow.addColorStop(0.5, 'rgba(255, 45, 0, 0.02)');
      glow.addColorStop(1,   'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // ── 3D perspective wave surface ───────────────────────────────────────
      //
      // World coordinate system (all in CSS pixels, camera at origin):
      //   X → screen-right
      //   Y → screen-down   (positive = visually lower on screen)
      //   Z → into screen   (positive = far)
      //
      // Camera is positioned above the surface looking forward-and-down.
      // The horizon line sits at ~55 % of screen height.

      const cameraY  = -H * 0.28;      // camera height above the grid plane
      const fov      = H * 0.7;        // focal length (perspective strength)
      const zNear    = H * 0.25;       // closest depth slice
      const zFar     = H * 2.8;        // farthest depth slice
      const xHalfSpan = W * 0.85;      // half-width of the grid in world space

      // Project a 3D point to 2D canvas coordinates.
      // Camera at (0, cameraY, 0) looking along +Z.
      const project = (xW: number, yW: number, zW: number): [number, number, number] => {
        const relY = yW - cameraY;      // y relative to camera
        const scale = fov / Math.max(zW, 1);
        const sx = W * 0.5 + xW * scale;
        const sy = H * 0.55 + relY * scale;
        return [sx, sy, scale];
      };

      // Build grid of projected points
      const pts: [number, number, number][][] = [];

      for (let r = 0; r < ROWS; r++) {
        const rNorm = r / (ROWS - 1);
        // Exponential depth distribution → denser near horizon, sparser in foreground
        const zW = zNear + (zFar - zNear) * (rNorm * rNorm);

        const row: [number, number, number][] = [];
        for (let c = 0; c < COLS; c++) {
          const cNorm = c / (COLS - 1);
          const xW = (cNorm - 0.5) * xHalfSpan * 2;

          // Natural sinusoidal wave in world Y (vertical displacement)
          const edgeFade = Math.sin(cNorm * Math.PI);              // pinch to 0 at edges
          const amp      = H * 0.09 * edgeFade;

          const y1 = Math.sin(cNorm * 5.5  + time * 1.0 + rNorm * 3.5) * amp;
          const y2 = Math.cos(cNorm * 3.2  - time * 0.7 + rNorm * 4.8) * (amp * 0.55);
          const y3 = Math.sin(cNorm * 8.8  + time * 1.6 - rNorm * 2.2) * (amp * 0.25);

          const yW = y1 + y2 + y3;
          row.push(project(xW, yW, zW));
        }
        pts.push(row);
      }

      // ── Draw horizontal contour lines (the "ribbons") ──
      for (let r = 0; r < ROWS; r++) {
        const rNorm  = r / (ROWS - 1);
        // Fade with depth: near rows are brighter, far rows (near horizon) fade
        const depthAlpha = 1 - rNorm * 0.7;
        const alpha  = depthAlpha * 0.38 * Math.sin(rNorm * Math.PI * 1.1 + 0.1);

        ctx.beginPath();
        const row = pts[r];
        ctx.moveTo(row[0][0], row[0][1]);
        for (let c = 1; c < COLS; c++) {
          // Smooth quadratic spline through midpoints
          const [ax, ay] = row[c - 1];
          const [bx, by] = row[c];
          ctx.quadraticCurveTo(ax, ay, (ax + bx) * 0.5, (ay + by) * 0.5);
        }
        const last = row[COLS - 1];
        ctx.lineTo(last[0], last[1]);

        ctx.strokeStyle = `rgba(255, 77, 0, ${Math.max(0.025, alpha)})`;
        ctx.lineWidth   = Math.max(0.6, (1 - rNorm * 0.5) * 1.1);
        ctx.stroke();
      }

      // ── Draw vertical connecting struts every Nth column ──
      const strutStep = 4;
      for (let c = 0; c < COLS; c += strutStep) {
        const cNorm = c / (COLS - 1);
        const strutAlpha = Math.sin(cNorm * Math.PI) * 0.1;
        if (strutAlpha < 0.01) continue;

        ctx.beginPath();
        for (let r = 0; r < ROWS; r++) {
          const [sx, sy] = pts[r][c];
          r === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(255, 100, 20, ${strutAlpha})`;
        ctx.lineWidth   = 0.55;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animId);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 select-none"
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
