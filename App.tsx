import React, { useState } from 'react';
import { OfferData, AppStatus } from './types';
import { OfferForm } from './components/OfferForm';
import { FlyerPreview } from './components/FlyerPreview';
import { generateMarketingBackground } from './services/geminiService';
import { Layers } from 'lucide-react';

const App: React.FC = () => {
  const [offerData, setOfferData] = useState<OfferData>({
    title: 'Summer Sale',
    description: 'Get 50% off on all premium running gear. Limited time offer only.',
    ctaText: 'Shop Now',
    niche: 'Running Shoes',
    primaryColor: '#4f46e5' // Indigo-600 default
  });

  const [bgImage, setBgImage] = useState<string | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (key: keyof OfferData, value: string) => {
    setOfferData(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!offerData.niche) return;
    
    setStatus(AppStatus.GENERATING);
    setErrorMsg(null);

    try {
      const imageBase64 = await generateMarketingBackground(offerData.niche);
      setBgImage(imageBase64);
      setStatus(AppStatus.SUCCESS);
    } catch (error: any) {
      console.error(error);
      setStatus(AppStatus.ERROR);
      setErrorMsg("Failed to generate image. Please check API Key or try a different niche.");
    } finally {
      // If we errored but still want to show the form active
      if (status !== AppStatus.SUCCESS) {
         setStatus(prev => prev === AppStatus.ERROR ? AppStatus.ERROR : AppStatus.IDLE);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0b1120]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              OfferThumb AI
            </h1>
          </div>
          <div className="text-xs text-gray-500 border border-gray-700 rounded-full px-3 py-1">
             Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
             <div className="sticky top-24">
               <OfferForm 
                data={offerData} 
                onChange={handleInputChange} 
                onGenerate={handleGenerate}
                isGenerating={status === AppStatus.GENERATING}
              />
              {errorMsg && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-800 text-red-200 text-sm rounded-lg">
                  {errorMsg}
                </div>
              )}
             </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Live Preview</h2>
              <p className="text-gray-400">
                The layout automatically optimizes for text visibility on the left and visual impact on the right.
              </p>
            </div>
            
            <FlyerPreview 
              data={offerData} 
              backgroundImage={bgImage}
              isGenerating={status === AppStatus.GENERATING}
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;