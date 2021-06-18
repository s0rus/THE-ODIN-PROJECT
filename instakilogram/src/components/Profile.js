/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useInfo } from '../contexts/infoContext';
import { useAuth } from '../contexts/authContext';
import '../styles/Profile.css';
import defaultPicture from '../images/default_profile_picture.png';
import Navbar from './Navbar';
import ProfileStats from './ProfileStats';
import ProfileInfo from './ProfileInfo';
import ProfilePosts from './ProfilePosts';

const initialUserInfo = {
  profileUsername: '',
  profileAvatar: defaultPicture,
  uid: '',
  profileName: '',
  profileSurname: '',
  profileDescription: '',
  profilePhotos: '',
  profileFollowing: '',
};

const Profile = ({ match }) => {
  const history = useHistory();
  const {
    currentPath,
    getProfileInfo,
    addNewPhoto,
    getUserDoc,
    addNewFollowing,
    getFollowingList,
    getFollowersList,
    removeFollowing,
  } = useInfo();

  const { currentUser } = useAuth();
  const [info, setInfo] = useState(initialUserInfo);
  const [following, setFollowing] = useState(null);
  const [ownFollowing, setOwnFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPhotoLoading, setNewPhotoLoading] = useState(false);

  useEffect(async () => {
    try {
      const followingList = await getFollowingList(currentPath);
      const ownFollowingList = await getFollowingList();
      const followersList = await getFollowersList(currentPath);
      const profileData = await getProfileInfo();

      if (!profileData.length) {
        setLoading(false);
        throw new Error('NO USER FOUND');
      }

      setFollowing(followingList);
      setOwnFollowing(ownFollowingList);
      setFollowers(followersList);
      setInfo({
        profileUsername: profileData[0].username,
        profileAvatar: profileData[0].profilePicture,
        uid: profileData[0].uid,
        profileName: profileData[0].name,
        profileSurname: profileData[0].surname,
        profileDescription: profileData[0].description,
        profilePhotos: profileData[0].photos.reverse(),
        profileFollowing: profileData[0].following,
      });

      setLoading(false);
    } catch (err) {
      setInfo(initialUserInfo);
      setLoading(false);
      history.push('/error');
    }
  }, [match]);

  const handleFollowUser = async () => {
    try {
      const doc = await getUserDoc();
      const targetDoc = await getUserDoc(info.username);

      await addNewFollowing(doc, targetDoc, info.uid, info.profileUsername);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      const doc = await getUserDoc();
      const targetDoc = await getUserDoc(info.username);

      await removeFollowing(doc, targetDoc, info.uid, info.profileUsername);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleAddNewPhoto = async (e) => {
    setNewPhotoLoading(true);
    try {
      const newPhoto = e.target.files[0];
      const doc = await getUserDoc();
      await addNewPhoto(newPhoto, doc);
      setNewPhotoLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setNewPhotoLoading(false);
    }
  };

  return (
    <main className='profile--page'>
      <Navbar />
      {!loading && info && followers && following && (
        <section className='profile--root'>
          <ProfileInfo
            info={{
              profileOwner: currentUser.displayName === info.profileUsername,
              profileUsername: info.profileUsername,
              profileName: info.profileName,
              profileSurname: info.profileSurname,
              profileDescription: info.profileDescription,
              pictureUrl: info.profileAvatar,
              photosCount: info.profilePhotos.length,
              followersCount: followers.length,
              followingCount: following.length,
              isNotFollowed: !ownFollowing.includes(info.profileUsername),
              handleFollowUser,
              handleUnfollowUser,
              handleAddNewPhoto,
              newPhotoLoading,
            }}
          />
          <ProfileStats
            className='profile--info--stats--mobile'
            photosCount={info.profilePhotos.length}
            followersCount={followers.length}
            followingCount={following.length}
          />
          <ProfilePosts
            posts={info.profilePhotos}
            profileUsername={info.profileUsername}
            loading={loading}
          />
        </section>
      )}
    </main>
  );
};

export default Profile;
