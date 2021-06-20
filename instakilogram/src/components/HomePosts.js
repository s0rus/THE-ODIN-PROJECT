/* eslint-disable react/prop-types */
import React from 'react';
import Loader from '../svgs/Loader';
import HomePost from './HomePost';

const HomePosts = ({ posts, determineTime, loading }) => (
  <>
    {!loading ? (
      posts
        .sort((a, b) => b.postedAt.seconds - a.postedAt.seconds)
        .map((photo) => (
          <div key={photo.photoId} className='home--photo--content'>
            <HomePost photo={photo} determineTime={determineTime} />
          </div>
        ))
    ) : (
      <Loader margin={{ marginTop: `${2}rem` }} color='#8e8e8e' />
    )}
  </>
);

export default HomePosts;
