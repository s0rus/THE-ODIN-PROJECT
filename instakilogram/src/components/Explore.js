/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useInfo } from '../contexts/infoContext';
import '../styles/Explore.css';

const Explore = () => {
  const {
    getExploreList,
    getFollowingList,
    addNewFollowing,
    removeFollowing,
    getUserDoc,
  } = useInfo();
  const [exploreList, setExploreList] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const exploreListing = await getExploreList();
    const followingListing = await getFollowingList();

    setExploreList(exploreListing);
    setFollowingList(followingListing);
    setLoading(false);
  }, []);

  const handleFollowUser = async (userId, username) => {
    try {
      const doc = await getUserDoc();
      const targetDoc = await getUserDoc(username);

      await addNewFollowing(doc, targetDoc, userId, username);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleUnfollowUser = async (userId, username) => {
    try {
      const doc = await getUserDoc();
      const targetDoc = await getUserDoc(username);

      await removeFollowing(doc, targetDoc, userId, username);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className='explore--page'>
      <Navbar />
      <div className='explore--root'>
        {!loading &&
          exploreList &&
          exploreList.map((exploreUser) => (
            <div key={exploreUser.uid} className='explore--user'>
              <img
                src={exploreUser.profilePicture}
                alt={`Profile avatar of ${exploreUser.username}`}
              />
              <Link to={`/p/${exploreUser.username}`}>
                <h1>{exploreUser.username}</h1>
              </Link>
              {!followingList.includes(exploreUser.username) ? (
                <button
                  type='button'
                  onClick={() =>
                    handleFollowUser(exploreUser.uid, exploreUser.username)
                  }
                  className='button--primary'
                >
                  Follow
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() =>
                    handleUnfollowUser(exploreUser.uid, exploreUser.username)
                  }
                  className='button--secondary'
                >
                  Unfollow
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Explore;
