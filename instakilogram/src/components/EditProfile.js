/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useInfo } from '../contexts/infoContext';
import Navbar from './Navbar';
import defaultPicture from '../images/default_profile_picture.png';
import '../styles/EditProfile.css';

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

const EditProfile = () => {
  const { currentUser, updateProfile, updatePassword } = useAuth();
  const { getProfileInfo, getUserDoc } = useInfo();
  const history = useHistory();
  const currentPath = window.location.pathname.slice(3);
  const [info, setInfo] = useState(initialUserInfo);
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isPersonal, setIsPersonal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(async () => {
    if (currentPath !== `${currentUser.displayName}/edit`) {
      history.push('/error');
    }
    try {
      setError('');
      const profileData = await getProfileInfo(currentUser.displayName);

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
      setError(err);
      setLoading(false);
    }
  }, []);

  const handleProfileChange = async (e) => {
    e.preventDefault();

    try {
      setError('');
      const doc = await getUserDoc();
      await updateProfile(
        doc,
        info.profileName,
        info.profileSurname,
        info.profileDescription,
      );
    } catch (err) {
      setError(err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      setError('');
      if (passwords.password === passwords.confirmPassword) {
        await updatePassword(passwords.password);
      } else {
        throw new Error('Passwords do not match');
      }
    } catch (err) {
      setError(err);
    }
  };

  const content = isPersonal ? (
    <form onSubmit={(e) => handleProfileChange(e)}>
      <div className='edit--profile--content--info'>
        <img src={info.profileAvatar} alt='avatar' />
        <p>{currentUser.displayName}</p>
      </div>
      <div className='edit--profile--content--input'>
        <label htmlFor='edit--name'>
          <p>Name</p>
          <input
            type='text'
            id='edit--name'
            name='edit--name'
            value={info.profileName}
            onChange={(e) => setInfo({ ...info, profileName: e.target.value })}
          />
        </label>
      </div>
      <div className='edit--profile--content--input'>
        <label htmlFor='edit--surname'>
          <p>Surname</p>
          <input
            type='text'
            id='edit--surname'
            name='edit--surname'
            value={info.profileSurname}
            onChange={(e) =>
              setInfo({ ...info, profileSurname: e.target.value })
            }
          />
        </label>
      </div>
      <div className='edit--profile--content--textarea'>
        <label htmlFor='edit--description'>
          <p>Description</p>
          <textarea
            name='edit--description'
            id='edit--description'
            value={info.profileDescription}
            onChange={(e) =>
              setInfo({ ...info, profileDescription: e.target.value })
            }
            maxLength='100'
          />
        </label>
      </div>
      <div className='edit--profile--content--submit'>
        <button type='submit' className='button--primary'>
          Submit
        </button>
      </div>
    </form>
  ) : (
    <form onSubmit={(e) => handlePasswordChange(e)}>
      <div className='edit--profile--content--input'>
        <label htmlFor='edit--password'>
          <p>New password</p>
          <input
            type='password'
            id='edit--password'
            name='edit--password'
            value={passwords.password}
            onChange={(e) =>
              setPasswords({ ...passwords, password: e.target.value })
            }
          />
        </label>
      </div>
      <div className='edit--profile--content--input'>
        <label htmlFor='edit--password--confirm'>
          <p>Confirm password</p>
          <input
            type='password'
            id='edit--password--confirm'
            name='edit--password--confirm'
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
          />
        </label>
      </div>
      <div className='edit--profile--content--submit'>
        <button type='submit' className='button--primary'>
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className='edit--profile--page'>
      <Navbar />
      <div className='edit--profile--root'>
        <div className='edit--profile--nav'>
          <button
            type='button'
            onClick={() => setIsPersonal(true)}
            className={isPersonal ? 'nav--button--active' : 'nav--button'}
          >
            Edit Profile
          </button>
          <button
            type='button'
            onClick={() => setIsPersonal(false)}
            className={!isPersonal ? 'nav--button--active' : 'nav--button'}
          >
            Change Password
          </button>
        </div>
        <div className='edit--profile--content'>
          {error && <h1 className='edit--profile--error'>{error.message}</h1>}
          {!loading && content}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
