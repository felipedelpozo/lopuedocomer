import Script from 'next/script';
import { GOOGLE_ADS_CLIENT_ID } from '@/config';

const AdsByGoogle: React.FC = () => {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADS_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </>
  );
};

export default AdsByGoogle;
