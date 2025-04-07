import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/x-icon';
export const size = {
  width: 32,
  height: 32,
};

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <img
          src="/logo.png"
          alt="SourceShip Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
} 