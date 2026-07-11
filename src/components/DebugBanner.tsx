import React, { useEffect } from 'react';

export default function DebugBanner() {
  useEffect(() => {
    console.log('Kapandula DEBUG: App component mounted — build at', new Date().toISOString());
  }, []);

  return (
    <div style={{position: 'fixed', left: 8, bottom: 8, zIndex: 99999}}>
      <div style={{background: '#111', color: '#FFD96B', padding: '6px 10px', borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.6)', fontSize: 12, fontWeight: 700, fontFamily: 'sans-serif'}}>
        Kapandula · debug
      </div>
    </div>
  );
}
