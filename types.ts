export interface OfferData {
  title: string;
  description: string;
  ctaText: string;
  niche: string;
  primaryColor: string;
}

export interface GeneratedImage {
  url: string;
  promptUsed: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

// Global definition for html2canvas loaded via CDN
declare global {
  interface Window {
    html2canvas: any;
  }
}