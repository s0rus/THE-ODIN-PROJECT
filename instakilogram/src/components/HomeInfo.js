/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const HomeInfo = ({
  isPhotoListPopulated,
  loading,
  name,
  username,
  avatar,
}) => (
  <>
    {!loading && isPhotoListPopulated && (
      <div className='home--info'>
        <div className='home--info--content'>
          <div className='home--info--current--user'>
            <Link to={`/p/${username}`}>
              <img src={avatar} alt={username} />
            </Link>
            <div className='current--user--info'>
              <Link to={`/p/${username}`}>
                <h1>{username}</h1>
              </Link>
              <h1 className='current--user--info--name'>{name}</h1>
            </div>
          </div>
          <div className='home--disclaimer'>
            <span className='home--disclaimer--content'>
              INSTAKILOGRAM by any means is not connected with Instagram and was
              created only for educational purposes. Only data this site
              collects is what you provide in the forms.
            </span>
          </div>
        </div>
      </div>
    )}
  </>
);

export default HomeInfo;
