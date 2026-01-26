import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fulkrums - Under Construction",
};

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0A',
        color: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '800px',
          animation: 'fadeIn 1s ease-in',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: '300',
            marginBottom: '2rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}>
            FULKRUMS
          </h1>

          <div style={{
            width: '80px',
            height: '1px',
            background: '#FFFFFF',
            margin: '3rem auto',
            opacity: 0.6
          }}></div>

          <h2 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: '400',
            marginBottom: '1.5rem',
            letterSpacing: '0.05em',
            opacity: 0.9
          }}>
            UNDER CONSTRUCTION
          </h2>

          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            lineHeight: '1.8',
            opacity: 0.7,
            marginBottom: '3rem',
            fontWeight: '300',
            letterSpacing: '0.02em'
          }}>
            We're crafting something exceptional. Stay tuned.
          </p>

          <div style={{
            display: 'flex',
            gap: '0.6rem',
            justifyContent: 'center',
            marginTop: '4rem'
          }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Background subtle pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '50px 50px',
          zIndex: 1
        }}></div>
      </div>
    </>
  );
}
