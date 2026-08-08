export default function NotFound() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99999,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        /* Extra safety: forcefully hide body scrolling so they can't scroll past the overlay */
        body { overflow: hidden !important; }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          margin: 0, 
          borderRight: '1px solid #333', 
          paddingRight: '20px',
          fontWeight: 500
        }}>
          404
        </h1>
        <p style={{ 
          fontSize: '1rem', 
          margin: 0, 
          color: '#888' 
        }}>
          This page could not be found.
        </p>
      </div>
      <a href="/" style={{ 
        marginTop: '30px', 
        color: '#b03a2e', 
        textDecoration: 'none',
        fontSize: '0.9rem',
        borderBottom: '1px solid #b03a2e',
        paddingBottom: '2px'
      }}>
        Return to Homepage
      </a>
    </div>
  );
}
