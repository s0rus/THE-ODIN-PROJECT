import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const subscriptionHandler = firestore
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const documents = [];
        snapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setDocs(documents);
      });

    return () => subscriptionHandler();
  }, [collection]);

  return { docs };
};

export default useFirestore;
