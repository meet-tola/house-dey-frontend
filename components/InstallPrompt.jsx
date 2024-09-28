import React, { useState, useEffect } from 'react';

const InstallAppPrompt = () => {
  const [isIphone, setIsIphone] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    // Check if the device is an iPhone
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setIsIphone(true);
    }
  }, []);

  return (
    <>
      {isIphone && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white p-4 flex justify-between items-center shadow-lg">
          <p className="text-sm">
            Install this app on your iOS device: tap the 
            <span className="inline-block mx-1 bg-white text-blue-500 px-2 py-1 rounded">share</span> 
            icon and then "Add to Home Screen".
          </p>
          <button
            className="ml-4 bg-white text-blue-500 px-3 py-1 rounded-md hover:bg-gray-200"
            onClick={() => setIsIphone(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default InstallAppPrompt;
