import React, { useRef, useState } from 'react';
import { OfferData } from '../types';
import { Download, Loader2, Sparkles } from 'lucide-react';

interface FlyerPreviewProps {
  data: OfferData;
  backgroundImage: string | null;
  isGenerating: boolean;
}

export const FlyerPreview: React.FC<FlyerPreviewProps> = ({ data, backgroundImage, isGenerating }) => {
  const flyerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const primaryColor = data.primaryColor || '#4f46e5';

  const handleDownload = async () => {
    if (!flyerRef.current || !window.html2canvas) return;

    try {
      setIsDownloading(true);
      const canvas = await window.html2canvas(flyerRef.current, {
        useCORS: true,
        scale: 2, // Higher resolution
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `offer-${data.niche.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Download failed", err);
      alert("Could not generate download. Please try taking a screenshot.");
    } finally {
      setIsDownloading(false);
    }
  };

  const hasContent = data.title || data.description || data.niche;

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      {/* Canvas Container */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-900 group">
        
        {/* The Actual Flyer Content (Ref for capture) */}
        <div ref={flyerRef} className="relative w-full h-full bg-gray-900 overflow-hidden flex">
          
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            {backgroundImage ? (
              <img 
                src={backgroundImage} 
                alt="Generated Background" 
                className="w-full h-full object-cover object-right"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                 {!isGenerating && <span className="flex items-center gap-2"><Sparkles className="w-5 h-5"/> AI Background Area</span>}
              </div>
            )}
          </div>

          {/* Gradient Overlay - Crucial for Left Text Readability */}
          <div className={`absolute inset-0 z-10 bg-gradient-to-r from-black via-black/80 to-transparent ${!backgroundImage ? 'opacity-50' : 'opacity-90 md:opacity-100'}`} />

          {/* Text Content Layer (Left Side) */}
          <div className="relative z-20 w-3/5 h-full flex flex-col justify-center pl-8 md:pl-16 pr-8">
            <div className="space-y-4 md:space-y-6">
              
              {/* Badge/Niche Tag */}
              {data.niche && (
                <span 
                  className="inline-block px-3 py-1 text-white text-xs md:text-sm font-bold tracking-wider uppercase rounded-full w-max backdrop-blur-sm border"
                  style={{ 
                    backgroundColor: `${primaryColor}E6`, // ~90% opacity
                    borderColor: `${primaryColor}4D`     // ~30% opacity
                  }}
                >
                  {data.niche}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white leading-tight drop-shadow-lg tracking-tight">
                {data.title || "Your Deal Headline"}
              </h1>

              {/* Description */}
              <p 
                className="text-gray-200 text-sm md:text-lg lg:text-xl font-light leading-relaxed max-w-md drop-shadow-md border-l-4 pl-4"
                style={{ borderColor: primaryColor }}
              >
                {data.description || "Compelling description of the offer goes here. Explain the value proposition concisely."}
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  className="text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg md:text-xl transform transition-transform border border-white/20 flex items-center gap-2"
                  style={{ 
                    backgroundColor: primaryColor,
                    boxShadow: `0 10px 15px -3px ${primaryColor}66` // Colored shadow with ~40% opacity
                  }}
                >
                  {data.ctaText || "Buy Now"}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Loading Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-400 mb-4" />
            <p className="font-medium animate-pulse">Generating bespoke visuals...</p>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="text-gray-400 text-sm">
          Preview Mode (16:9)
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownload}
            disabled={!hasContent || isGenerating || isDownloading}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-md font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Download className="w-4 h-4" />}
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
};