import { useEffect, useState } from 'react';
import cmsApi from '../utils/StrapiApi';

export default function usePromoData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await cmsApi.getPromo();
        const promo = res?.data?.[0];
        if (!promo)
          throw new Error('[usePromoData] Promo не найден в ответе API');
        setData(promo);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };
    fetchData();
  }, []);

  return { data, error };
}
