import React, { useEffect, useRef, useState } from 'react';

const HOST = 'http://localhost:8080';
const SITE_ID = 'remark';

export default function Remark42({ url }) {
  const [status, setStatus] = useState('loading');
  const [targetUrl, setTargetUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl =
        url || window.location.origin + window.location.pathname;
      setTargetUrl(currentUrl);
      setStatus('ready');
      console.log('Remark42: Widget initialized for URL:', currentUrl);
    }
  }, [url]);

  const commentsUrl = `${HOST}/web/?site=${SITE_ID}&url=${encodeURIComponent(
    targetUrl
  )}`;

  if (status === 'loading') {
    return (
      <div style={{ margin: '40px 0' }}>
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666',
            background: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #e1e1e1',
          }}
        >
          Loading comments... 💬
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <div
        style={{
          background: 'white',
          borderRadius: '8px',
          padding: '20px',
          border: '1px solid #e1e1e1',
          minHeight: '200px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>💬</span>
            <h4 style={{ margin: 0, color: '#333' }}>Comments</h4>
          </div>
          <span style={{ fontSize: '12px', color: '#666' }}>
            Powered by Remark42
          </span>
        </div>

        {/* Content */}
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666',
          }}
        >
          <div style={{ fontSize: '16px', marginBottom: '15px' }}>
            Join the conversation! 🎯
          </div>

          <div style={{ margin: '20px 0' }}>
            <a
              href={commentsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #007acc 0%, #0056b3 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,122,204,0.2)',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) =>
                (e.target.style.transform = 'translateY(-1px)')
              }
              onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
            >
              📝 Open Comments
            </a>
          </div>

          <div
            style={{
              fontSize: '12px',
              color: '#999',
              lineHeight: '1.4',
              marginTop: '15px',
            }}
          >
            Comments open in a new window for the best experience.
            <br />
            This ensures compatibility across all browsers and devices.
          </div>

          {/* Show iframe attempt message */}
          <div
            style={{
              marginTop: '20px',
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '4px',
              fontSize: '11px',
              color: '#6c757d',
            }}
          >
            <div>📊 Debug Info:</div>
            <div>Host: {HOST}</div>
            <div>Site: {SITE_ID}</div>
            <div>URL: {targetUrl}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
