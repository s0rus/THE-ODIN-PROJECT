/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';
import ProfileStats from './ProfileStats';
import Loader from '../svgs/Loader';

const ProfileInfo = ({ info }) => (
  <>
    <div className='profile--info'>
      <ProfilePicture
        pictureUrl={info.pictureUrl}
        profileOwner={info.profileOwner}
      />
      <div className='profile--info--content'>
        <h1>
          <p>{info.profileUsername}</p>
          {info.profileOwner ? (
            <Link to={`/p/${info.profileUsername}/edit`}>Edit Profile</Link>
          ) : info.isNotFollowed ? (
            <button
              type='button'
              title='Follow'
              className='button--primary'
              onClick={() => info.handleFollowUser()}
            >
              Follow
            </button>
          ) : (
            <button
              type='button'
              title='Unfollow'
              className='button--secondary'
              onClick={() => info.handleUnfollowUser()}
            >
              Unfollow
            </button>
          )}
        </h1>
        <ProfileStats
          className='profile--info--stats'
          photosCount={info.photosCount}
          followersCount={info.followersCount}
          followingCount={info.followingCount}
        />
        <div className='profile--info--personal'>
          <h2>{`${info.profileName} ${info.profileSurname}`}</h2>
          <p>{info.profileDescription}</p>
        </div>
      </div>
    </div>
    {info.profileOwner && (
      <div className='new--photo--post--container'>
        <label
          htmlFor='new--photo--post'
          className='new--photo--post--label'
          title='Upload your new profile photo'
        >
          Upload Photo
          {info.newPhotoLoading && <Loader color='#0095f6' />}
          <input
            id='new--photo--post'
            name='new--photo--post'
            type='file'
            onChange={(e) => info.handleAddNewPhoto(e)}
            className='new--photo--post--fileinput'
            disabled={info.newPhotoLoading}
          />
        </label>
      </div>
    )}
  </>
);

export default ProfileInfo;
