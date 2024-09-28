"use client";
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const InstallAppPrompt = () => {
  const [isIphone, setIsIphone] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    // Check if the device is an iPhone
    if (isIOS) {
      setIsIphone(true);
    }
  }, []);

  return (
    <>
      {isIphone && (
        <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 flex justify-between items-center shadow-lg">
          <p className="text-sm">
            Install this app on your iOS device: tap the 
            <span className="inline-block mx-1 bg-white text-primary px-2 py-1 rounded">share</span> 
            icon and then "Add to Home Screen".
          </p>
          <Button
          variants="secondary"
          className="bg-white text-primary hover:bg-white/80"
            onClick={() => setIsIphone(false)}
          >
            Close
          </Button>
        </div>
      )}
    </>
  );
};

export default InstallAppPrompt;
