// Exports contstant API_URL 
const getApiUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  
  if (!url) {
    console.warn('NEXT_PUBLIC_API_URL not set, using default');
    return 'http://localhost:5156';
  }
  
  return url;
};

export const API_URL = getApiUrl();


