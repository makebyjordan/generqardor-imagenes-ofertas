import React, { ChangeEvent } from 'react';
import { OfferData } from '../types';
import { Wand2, Type, AlignLeft, MousePointerClick, Tag, Palette } from 'lucide-react';

interface OfferFormProps {
  data: OfferData;
  onChange: (key: keyof OfferData, value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const OfferForm: React.FC<OfferFormProps> = ({ data, onChange, onGenerate, isGenerating }) => {
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name as keyof OfferData, e.target.value);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl h-full">
      <div className="flex items-center gap-2 mb-6 text-indigo-400">
        <Wand2 className="w-5 h-5" />
        <h2 className="font-bold text-lg text-white">Offer Details</h2>
      </div>
      
      <div className="space-y-5">
        
        {/* Niche Input - The most important for AI */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
            <Tag className="w-4 h-4" /> Niche / Industry
          </label>
          <input
            type="text"
            name="niche"
            value={data.niche}
            onChange={handleChange}
            placeholder="e.g. Yoga Studio, Cyber Monday Electronics, Burger Joint"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">Uses AI to generate the background image.</p>
        </div>

        {/* Primary Color Picker */}
        <div>
           <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
            <Palette className="w-4 h-4" /> Brand Color
          </label>
          <div className="flex gap-2">
            <input 
              type="color" 
              name="primaryColor"
              value={data.primaryColor || '#4f46e5'}
              onChange={handleChange}
              className="h-11 w-12 rounded-lg bg-transparent cursor-pointer border-0 p-0"
            />
             <input
              type="text"
              name="primaryColor"
              value={data.primaryColor || '#4f46e5'}
              onChange={handleChange}
              className="flex-1 bg-gray-900 border border-gray-600 rounded-lg p-3 text-white uppercase font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
            <Type className="w-4 h-4" /> Headline
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="e.g. 50% OFF All Items"
            maxLength={40}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
            <AlignLeft className="w-4 h-4" /> Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Brief details about the offer..."
            rows={3}
            maxLength={120}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* CTA */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
            <MousePointerClick className="w-4 h-4" /> Call To Action
          </label>
          <input
            type="text"
            name="ctaText"
            value={data.ctaText}
            onChange={handleChange}
            placeholder="e.g. Shop Now"
            maxLength={20}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="pt-4">
          <button
            onClick={onGenerate}
            disabled={!data.niche || isGenerating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-indigo-900/50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Dreaming up visual...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Background
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};