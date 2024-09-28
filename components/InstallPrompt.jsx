"use client";
import { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    // Function to detect if the device is iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    // Function to detect if the app is in standalone mode
    const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;

    // Check if the app is on iOS and not in standalone mode
    if (isIos() && !isInStandaloneMode()) {
      setShowInstallMessage(true);
    }
  }, []); // The empty dependency array ensures this runs only on component mount

  return (
    <>
      {showInstallMessage && (
        <div className="install-popup">
          <p>Install this app on your iOS device: tap the share icon and then "Add to Home Screen".</p>
        </div>
      )}
    </>
  );
};

export default InstallPrompt;
