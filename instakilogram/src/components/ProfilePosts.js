/* eslint-disable react/prop-types */
/* eslint-disable operator-linebreak */
import React from 'react';

const ProfilePosts = ({ posts, profileUsername, loading }) => (
  <section className='profile--info--photos'>
    <div className='photo--root'>
      <div className='photo--container'>
        {!loading &&
          posts &&
          posts.map((photo) => (
            <div key={photo.photoId} className='photo--content'>
              <img alt={`Post by ${profileUsername}`} src={photo.photoUrl} />
            </div>
          ))}
      </div>
    </div>
  </section>
);

export default ProfilePosts;
