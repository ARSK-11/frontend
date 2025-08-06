import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  
  const loadingMessages = [
    "Performing Honey Quote Magic",
    "Menyiapkan koleksi fashion...",
    "Mengatur tampilan produk...",
    "Hampir selesai...",
    "Siap untuk berbelanja! 🛍️"
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete && onComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 10 + 3;
      });
    }, 300);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const getLoadingMessage = () => {
    const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
    return loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)];
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center space-y-8 max-w-md mx-auto p-8">
        {/* Loading Text */}
        <div className="space-y-4">
          <div className="text-2xl font-bold text-black">
            {getLoadingMessage()}
          </div>
          
          {/* Animated Loading Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-black h-full rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
          
          <div className="text-sm text-black font-medium">
            {Math.round(progress)}% selesai
          </div>
        </div>
        
        <div className="text-xs text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
          This may take few minutes
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 