import { useEffect } from 'react';
import { GoogleAdsManager } from '../GoogleAdsManager';

const adsManager = new GoogleAdsManager({
    id: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
});

export function useGoogleAds() {
    useEffect(() => {
        adsManager.initialize();
    }, []);

    return {
        trackConversion: (label, value) => adsManager.trackConversion(label, value),
    };
}
