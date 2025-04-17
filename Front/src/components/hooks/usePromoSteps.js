import { useEffect, useState } from 'react';
import cmsApi from '../utils/StrapiApi';

export default function usePromoSteps() {
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await cmsApi.getPromoSteps();
        const data = res?.data || [];
        setSteps(data);
      } catch (e) {
        console.error('Ошибка при загрузке promosteps:', e);
        setError(true);
      }
    };

    fetchSteps();
  }, []);

  return { steps, error };
}
