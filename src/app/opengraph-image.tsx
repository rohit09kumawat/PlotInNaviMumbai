import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'PlotInNaviMumbai.com — Honest Property Guidance';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAFAF7',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
          border: '16px solid #1E4D3A',
        }}
      >
        {/* Top Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '2px',
              background: '#83A83B',
            }}
          />
          <div
            style={{
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: '#5C6B60',
              textTransform: 'uppercase',
            }}
          >
            NAVI MUMBAI · PLOTS & LAND ADVISORY
          </div>
        </div>

        {/* Middle Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 600,
              color: '#12261D',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            We&apos;ll tell you when a plot isn&apos;t right for you.
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#5C6B60',
              lineHeight: 1.5,
              maxWidth: '900px',
            }}
          >
            Independent advice on residential and commercial land across Ulwe, Kharghar, Panvel, Taloja and Dronagiri.
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #D6DACD',
            paddingTop: '32px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#1E4D3A',
              letterSpacing: '-0.01em',
            }}
          >
            PlotInNaviMumbai.com
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#83A83B',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            WE CHECK THE PAPERWORK BEFORE WE SHOW YOU ANYTHING
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
