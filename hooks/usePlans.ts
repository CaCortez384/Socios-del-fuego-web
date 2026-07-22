import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PLANS as FALLBACK_PLANS } from '@/lib/plans';

export function usePlans() {
  const [plans, setPlans] = useState(FALLBACK_PLANS);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [errorPlans, setErrorPlans] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "plans"));
        
        if (querySnapshot.empty) {
          // Si no hay planes en Firestore aún, usar los locales
          setPlans(FALLBACK_PLANS);
          setLoadingPlans(false);
          return;
        }

        const fetchedPlans: (typeof FALLBACK_PLANS[number] & { id: string })[] = [];
        querySnapshot.forEach((doc) => {
          fetchedPlans.push({ id: doc.id, ...doc.data() } as typeof FALLBACK_PLANS[number] & { id: string });
        });

        // Ordenamos por categoría (primero full, luego cocktail) y luego por priceLevel
        fetchedPlans.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category === 'full' ? -1 : 1;
          }
          return a.priceLevel - b.priceLevel;
        });

        setPlans(fetchedPlans);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setErrorPlans((err as Error).message);
        // Fallback a planes locales en caso de error
        setPlans(FALLBACK_PLANS);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loadingPlans, errorPlans };
}
