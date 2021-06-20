/* eslint-disable react/prop-types */
import React from 'react';

const ProfileStats = ({
  className,
  photosCount,
  followingCount,
  followersCount,
}) => (
  <div className={className}>
    <p>
      <strong>{photosCount}</strong>
      posts
    </p>
    <p>
      <strong>{followersCount}</strong>
      followers
    </p>
    <p>
      <strong>{followingCount}</strong>
      following
    </p>
  </div>
);

export default ProfileStats;
