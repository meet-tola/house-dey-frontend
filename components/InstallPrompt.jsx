"use client";
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Share } from 'lucide-react';

const InstallAppPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    // Detect if the app is running as standalone (PWA mode)
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    // Show the prompt only if it's an iPhone and not in standalone mode
    if (isIOS && !isStandalone) {
      setShowPrompt(true);

      // Set a timer to automatically remove the prompt after 1 minute (60,000ms)
      const hidePromptTimeout = setTimeout(() => {
        setShowPrompt(false);
      }, 60000); // 1 minute (60 seconds)

      // Cleanup the timeout when the component unmounts or showPrompt changes
      return () => {
        clearTimeout(hidePromptTimeout);
      };
    }
  }, []);

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <>
      {showPrompt && (
        <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 flex justify-between items-center shadow-lg">
          <p className="text-sm">
            Install this app on your iOS device: tap the 
            <span className="inline-block mx-1 bg-white text-primary px-2 py-1 rounded"><Share size={16} /></span> 
            icon and then "Add to Home Screen".
          </p>
          <Button
            variants="secondary"
            className="bg-white text-primary hover:bg-white/80"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      )}
    </>
  );
};

export default InstallAppPrompt;
