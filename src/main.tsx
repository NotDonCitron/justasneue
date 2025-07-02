import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handle third-party script errors gracefully
window.addEventListener('error', (event) => {
  // Suppress SoundCloud widget errors, extension errors, and other third-party script errors
  if (
    event.filename?.includes('soundcloud.com') ||
    event.filename?.includes('widget') ||
    event.filename?.includes('content_script.js') ||
    event.filename?.includes('extension') ||
    event.message?.includes('allowRunFromHttpSchema') ||
    event.message?.includes('content_script.js') ||
    event.message?.includes('CORP_FAILED') ||
    event.message?.includes('Cross-Origin-Resource-Policy') ||
    event.message?.includes('chrome-extension') ||
    event.message?.includes('moz-extension')
  ) {
    console.warn('Suppressed third-party error:', event.message);
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections (network errors)
window.addEventListener('unhandledrejection', (event) => {
  // Suppress CORP policy errors from Instagram and other external sources
  if (
    event.reason?.message?.includes('CORP') ||
    event.reason?.message?.includes('Cross-Origin-Resource-Policy') ||
    event.reason?.toString()?.includes('instagram.com') ||
    event.reason?.toString()?.includes('cdninstagram.com') ||
    event.reason?.message?.includes('allowRunFromHttpSchema')
  ) {
    console.warn('Suppressed CORS/extension error:', event.reason);
    event.preventDefault();
    return false;
  }
});

// Suppress CSS parsing errors in console (they don't affect functionality)
const originalConsoleError = console.error;
console.error = function(...args) {
  const message = args.join(' ');
  if (
    message.includes('Error in parsing value') ||
    message.includes('Unknown pseudo-class') ||
    message.includes('Expected color but found') ||
    message.includes('Declaration dropped')
  ) {
    // Suppress CSS parsing errors from SoundCloud widget
    return;
  }
  originalConsoleError.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
