import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: '#f4f4f2',
              letterSpacing: -2,
            }}
          >
            V
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: '#ff4d00',
              marginLeft: 2,
            }}
          >
            ·
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
