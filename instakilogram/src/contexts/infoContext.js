/* eslint-disable function-paren-newline */
/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable implicit-arrow-linebreak */
import React, { createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { firestore, storage } from '../firebase/config';
import { useAuth } from './authContext';
import defaultPicture from '../images/default_profile_picture.png';

const InfoContext = createContext();

export function useInfo() {
  return useContext(InfoContext);
}

export function InfoProvider({ children }) {
  const { currentUser } = useAuth();
  const currentPath = window.location.pathname.slice(3);

  const getNavbarAvatar = async () => {
    const docs = [];
    await firestore
      .collection('users')
      .where('uid', '==', currentUser.uid)
      .get()
      .then((data) => data.forEach((doc) => docs.push(doc.data())));
    return docs;
  };

  const getUserAvatar = (username) => {
    const docs = [];
    firestore
      .collection('users')
      .where('username', '==', username)
      .get()
      .then((data) =>
        data.forEach((doc) => docs.push(doc.data().profilePicture)),
      );
    return docs;
  };

  const getProfileInfo = async (username) => {
    const docs = [];
    await firestore
      .collection('users')
      .where('username', '==', username || currentPath)
      .get()
      .then((data) => data.forEach((doc) => docs.push(doc.data())));
    return docs;
  };

  const getUserDoc = async (username) => {
    const docs = [];
    await firestore
      .collection('users')
      .where('username', '==', username || currentUser.displayName)
      .get()
      .then((data) =>
        data.forEach((doc) => docs.push({ id: doc.id, ...doc.data() })),
      );

    return docs;
  };

  const updateUserAvatar = async (file, doc) => {
    const storageRef = storage.ref(
      `profile_pictures/profilepic_${currentUser.uid}`,
    );

    storageRef.put(file).on(
      'state_changed',
      null,
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();

        await firestore
          .collection('users')
          .doc(doc[0].id)
          .update({
            profilePicture: url,
          })
          .then(() => window.location.reload());
      },
    );
  };

  const removeUserAvatar = async (doc) => {
    await firestore
      .collection('users')
      .doc(doc[0].id)
      .update({
        profilePicture: defaultPicture,
      })
      .then(() => window.location.reload());
  };

  const addNewPhoto = async (file, doc) => {
    const uniqueId = uuidv4();

    const storageRef = storage.ref(`user_photos/photo_${uniqueId}`);
    const usersRef = firestore.collection('users').doc(doc[0].id);
    storageRef.put(file).on(
      'state_changed',
      null,
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();

        await usersRef
          .update({
            photos: firebase.firestore.FieldValue.arrayUnion({
              photoId: uniqueId,
              photoUrl: url,
              postedAt: firebase.firestore.Timestamp.now(),
              author: currentUser.displayName,
              likes: [],
            }),
          })
          .then(() => window.location.reload());
      },
    );
  };

  const getFeed = async (followingList) => {
    const outputList = [];
    const promises = [];

    followingList.forEach((following) => {
      const avatar = getUserAvatar(following);
      const promise = firestore
        .collection('users')
        .where('username', '==', following)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            outputList.push({
              photos: doc.data().photos,
              profilePicture: avatar,
            });
          });
        });
      promises.push(avatar);
      promises.push(promise);
    });

    return Promise.all(promises).then(() => outputList);
  };

  const addNewFollowing = async (doc, targetDoc, targetUid, targetUsername) => {
    const usersRef = firestore.collection('users').doc(doc[0].id);
    const targetUsersRef = firestore.collection('users').doc(targetDoc[0].id);

    await usersRef.update({
      following: firebase.firestore.FieldValue.arrayUnion({
        uid: targetUid,
        username: targetUsername,
      }),
    });

    await targetUsersRef
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion({
          uid: currentUser.uid,
          username: currentUser.displayName,
        }),
      })
      .then(() => window.location.reload());
  };

  const removeFollowing = async (doc, targetDoc, targetUid, targetUsername) => {
    const usersRef = firestore.collection('users').doc(doc[0].id);
    const targetUsersRef = firestore.collection('users').doc(targetDoc[0].id);

    await usersRef.update({
      following: firebase.firestore.FieldValue.arrayRemove({
        uid: targetUid,
        username: targetUsername,
      }),
    });

    await targetUsersRef
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove({
          uid: currentUser.uid,
          username: currentUser.displayName,
        }),
      })
      .then(() => window.location.reload());
  };

  const getFollowingList = async (username) => {
    const docs = [];
    const followingList = [];

    await firestore
      .collection('users')
      .where('username', '==', username || currentUser.displayName)
      .get()
      .then((data) => data.forEach((doc) => docs.push(doc.data().following)))
      .then(() =>
        docs[0].forEach((following) => followingList.push(following.username)),
      );
    return followingList;
  };

  const getFollowersList = async (username) => {
    const docs = [];
    const followersList = [];

    await firestore
      .collection('users')
      .where('username', '==', username || currentUser.displayName)
      .get()
      .then((data) => data.forEach((doc) => docs.push(doc.data().followers)))
      .then(() =>
        docs[0].forEach((followers) => followersList.push(followers.username)),
      );
    return followersList;
  };

  const getExploreList = async () => {
    const docs = [];

    await firestore
      .collection('users')
      .where('username', '!=', currentUser.displayName)
      .get()
      .then((data) => data.forEach((doc) => docs.push(doc.data())));
    return docs;
  };

  const value = {
    currentPath,
    getProfileInfo,
    getUserDoc,
    getNavbarAvatar,
    updateUserAvatar,
    removeUserAvatar,
    addNewPhoto,
    getFollowingList,
    getFollowersList,
    addNewFollowing,
    removeFollowing,
    getFeed,
    getUserAvatar,
    getExploreList,
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
}
