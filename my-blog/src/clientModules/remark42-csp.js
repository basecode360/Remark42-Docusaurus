// Client module to configure CSP for Remark42
export default function configureCspForRemark42() {
  if (typeof window !== 'undefined') {
    // Configure CSP to allow Remark42 connections
    const existingMeta = document.querySelector(
      'meta[http-equiv="Content-Security-Policy"]'
    );

    if (existingMeta) {
      // Modify existing CSP
      const content = existingMeta.getAttribute('content') || '';

      // Add Remark42 permissions to existing CSP
      const updatedContent = content
        .replace(/frame-src[^;]*;?/, (match) => {
          if (
            match.includes('localhost:8080') &&
            match.includes('127.0.0.1:8080')
          ) {
            return match;
          }
          return match.replace(
            /;?$/,
            ' http://localhost:8080 http://127.0.0.1:8080;'
          );
        })
        .replace(/connect-src[^;]*;?/, (match) => {
          if (
            match.includes('localhost:8080') &&
            match.includes('127.0.0.1:8080')
          ) {
            return match;
          }
          return match.replace(
            /;?$/,
            ' http://localhost:8080 http://127.0.0.1:8080;'
          );
        })
        .replace(/script-src[^;]*;?/, (match) => {
          if (
            match.includes('localhost:8080') &&
            match.includes('127.0.0.1:8080')
          ) {
            return match;
          }
          return match.replace(
            /;?$/,
            ' http://localhost:8080 http://127.0.0.1:8080;'
          );
        });

      existingMeta.setAttribute('content', updatedContent);
      console.log('Remark42: Updated existing CSP:', updatedContent);
    } else {
      // Create new CSP meta tag
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content =
        "default-src 'self'; frame-src 'self' http://localhost:8080 http://127.0.0.1:8080; connect-src 'self' http://localhost:8080 http://127.0.0.1:8080; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:8080 http://127.0.0.1:8080;";
      document.head.appendChild(meta);
      console.log('Remark42: Created new CSP for Remark42');
    }

    // Also try to modify any existing CSP headers via fetch interception
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      return originalFetch.apply(this, args).then((response) => {
        // Log CSP headers for debugging
        const csp = response.headers.get('content-security-policy');
        if (csp) {
          console.log('Remark42: Detected CSP header:', csp);
        }
        return response;
      });
    };
  }
}
