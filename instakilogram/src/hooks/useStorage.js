import { useState, useEffect } from 'react';
import { storage, firestore, timestamp } from '../firebase/config';

const useStorage = (file, currentUser) => {
  const [imageUploadError, setImageUploadError] = useState(null);

  useEffect(() => {
    if (file) {
      const storageRef = storage.ref(
        `profile_pictures/profilepic_${currentUser.uid}`,
      );

      storageRef.put(file).on(
        'state_changed',
        null,
        (err) => {
          setImageUploadError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();

          firestore.collection('profile-pictures').add({
            createdAt: timestamp(),
            uid: currentUser.uid,
            url,
            username: currentUser.displayName,
          });
        },
      );
    }
  }, [file]);

  return { imageUploadError };
};

export default useStorage;
