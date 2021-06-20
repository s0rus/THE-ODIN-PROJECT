/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import { useInfo } from '../contexts/infoContext';
import Loader from '../svgs/Loader';

const ProfilePicture = ({ pictureUrl, profileOwner }) => {
  const { getUserDoc, updateUserAvatar, removeUserAvatar } = useInfo();
  const [pictureModal, setPictureModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileTypes = ['image/png', 'image/jpeg'];

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (file && fileTypes.includes(file.type)) {
      setLoading(true);
      const doc = await getUserDoc();
      await updateUserAvatar(file, doc);
      setLoading(false);
    }
  };

  const handleAvatarRemoval = async () => {
    setLoading(true);
    const doc = await getUserDoc();
    await removeUserAvatar(doc);
    setLoading(false);
  };

  const handlePictureModal = () => {
    setPictureModal(true);
  };

  useEffect(() => {
    document.body.style.overflow = pictureModal ? 'hidden' : 'auto';
  }, [pictureModal]);

  return (
    <div className='profile--user--picture--container'>
      {profileOwner ? (
        <button
          className='profile--user--picture--change--button'
          type='button'
          title='Change profile picture'
          onClick={() => handlePictureModal()}
        >
          <img
            className='profile--user--picture'
            src={pictureUrl}
            alt='profile avatar'
          />
        </button>
      ) : (
        <img
          className='profile--user--picture'
          src={pictureUrl}
          alt='profile avatar'
        />
      )}
      {pictureModal && profileOwner && (
        <div className='global--modal--container'>
          <div className='global--modal--content'>
            <h1>
              Change profile photo
              {loading && <Loader color='#000000' />}
            </h1>
            <label
              htmlFor='new--photo'
              className='global--modal--fileinput--label'
              title='Upload your new profile photo'
            >
              Upload Photo
              <input
                id='new--photo'
                name='new--photo'
                type='file'
                onChange={(e) => handleAvatarChange(e)}
                className='global--modal--fileinput'
              />
            </label>
            <button
              type='button'
              title='Remove your current profile photo'
              onClick={() => handleAvatarRemoval()}
              className='global--modal--remove--photo'
            >
              Remove Current Photo
            </button>
            <button
              type='button'
              title='Cancel changing profile photo'
              onClick={() => setPictureModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
