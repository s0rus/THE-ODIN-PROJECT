/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useInfo } from '../contexts/infoContext';
import {
  HomeIcon,
  SearchIcon,
  ExploreIcon,
  NavProfileIcon,
  ProfileModalIcon,
} from '../svgs/Icons';
import defaultPicture from '../images/default_profile_picture.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const history = useHistory();
  const { currentUser, logOut } = useAuth();
  const [profileModal, setProfileModal] = useState(false);
  const { getNavbarAvatar } = useInfo();
  const [navbarAvatar, setNavbarAvatar] = useState(defaultPicture);
  const currentPath = window.location.pathname.slice(3);

  const toggleProfileModal = () => setProfileModal((prevModal) => !prevModal);

  const handleSignOut = async () => {
    try {
      await logOut();
      history.push('/login');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(async () => {
    try {
      const navbarData = await getNavbarAvatar();
      setNavbarAvatar(navbarData[0].profilePicture);
    } catch {
      setNavbarAvatar(defaultPicture);
    }
  }, []);

  return (
    <nav className='navbar--container'>
      <Link to='/' className='navbar--logo'>
        <h1>INSTAKILOGRAM</h1>
      </Link>
      <div className='navbar--explore'>
        <Link to='/explore' className='navbar--explore--container'>
          <SearchIcon />
          <p>Explore</p>
        </Link>
      </div>
      <div className='navbar--icon--nav'>
        <Link to='/explore' className='explore--mobile'>
          <ExploreIcon />
        </Link>
        <Link to='/'>
          <HomeIcon />
        </Link>
        <div className='navbar--profile--modal--container'>
          <NavProfileIcon
            onClick={() => toggleProfileModal()}
            imageUrl={navbarAvatar}
            modalVisibility={profileModal}
            stroke={currentPath === currentUser.displayName}
          />
          {profileModal && (
            <div className='navbar--profile--modal'>
              <Link
                to={`/p/${currentUser.displayName}`}
                onClick={() => setProfileModal(false)}
              >
                <ProfileModalIcon />
                <div className='modal--item modal--profile--link'>Profile</div>
              </Link>
              <div className='modal--item modal--logout--link'>
                <div onClick={() => handleSignOut()}>Log Out</div>
              </div>
              <div className='navbar--profile--modal--tick' />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
