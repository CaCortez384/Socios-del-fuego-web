"use client";

import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ClientInfo {
  clientName: string;
  note?: string;
}

interface BookedDetails {
  [date: string]: ClientInfo;
}

export function useAvailability() {
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [bookedDetails, setBookedDetails] = useState<BookedDetails>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "booked_dates"), 
      (snapshot) => {
        const dates: string[] = [];
        const details: BookedDetails = {};
        
        snapshot.forEach((doc) => {
          const date = doc.id;
          dates.push(date);
          details[date] = doc.data() as ClientInfo;
        });
        
        setBookedDates(dates);
        setBookedDetails(details);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching dates:", err);
        setError("Error de conexión con el calendario.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const toggleDateLock = async (dateStr: string, clientInfo: ClientInfo | null = null) => {
    const ref = doc(db, "booked_dates", dateStr);
    
    try {
      const snap = await getDoc(ref);
      
      if (snap.exists()) {
        await deleteDoc(ref);
      } else {
        const data = clientInfo || { clientName: 'Bloqueo Admin', note: 'Manual' };
        await setDoc(ref, data);
      }
    } catch (err) {
      console.error("Error toggling date:", err);
      alert("No se pudo actualizar la fecha. Revisa tu conexión o permisos.");
    }
  };

  return { bookedDates, bookedDetails, loading, error, toggleDateLock };
}
