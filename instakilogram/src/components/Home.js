/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useInfo } from '../contexts/infoContext';
import defaultPicture from '../images/default_profile_picture.png';
import Navbar from './Navbar';
import '../styles/Home.css';
import HomePosts from './HomePosts';
import HomeInfo from './HomeInfo';

const Home = () => {
  const { currentUser } = useAuth();
  const { getFeed, getFollowingList, getNavbarAvatar } = useInfo();
  const history = useHistory();
  const [photoList, setPhotoList] = useState({
    photoUrl: '',
    author: '',
    postedAt: '',
    photoId: '',
    authorPicture: '',
  });
  const [avatar, setAvatar] = useState(defaultPicture);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if (!currentUser) {
      history.push('/login');
    }

    try {
      const followingList = await getFollowingList();
      const feed = await getFeed(followingList);
      const feedList = [];
      await feed.forEach(async (feedObject) =>
        feedObject.photos.forEach((photo) =>
          feedList.push({
            ...photo,
            authorPicture: feedObject.profilePicture[0],
            postedSince: Date.now() / 1000 - photo.postedAt.seconds,
          }),
        ),
      );
      setPhotoList(feedList);

      const sideInfo = await getNavbarAvatar(currentUser.uid);
      setAvatar(sideInfo[0].profilePicture);
      setName(`${sideInfo[0].name} ${sideInfo[0].surname}`);

      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setLoading(false);
  }, []);

  const determineTime = (postedSince) => {
    let minutes = postedSince / 60;
    minutes = Math.floor(minutes);
    const postedSinceFormatted = new Date(Date.now() - postedSince * 1000);

    return minutes < 60
      ? `${minutes} minute${minutes === 1 ? '' : 's'} ago`
      : Math.floor(minutes / 60) < 24
      ? `${Math.floor(minutes / 60)} hour${
          Math.floor(minutes / 60) === 1 ? '' : 's'
        } ago`
      : Math.floor(minutes / 60 / 24) < 7
      ? `${Math.floor(minutes / 60 / 24)} day${
          Math.floor(minutes / 60 / 24) === 1 ? '' : 's'
        } ago`
      : `${postedSinceFormatted.toLocaleString('default', {
          // month name
          month: 'long',
        })} ${postedSinceFormatted.getDate()}`; // day number
  };

  return (
    <>
      <main className='home--page'>
        <Navbar />
        <section className='home--page--content'>
          <div className='home--root'>
            <HomePosts
              posts={photoList}
              determineTime={determineTime}
              loading={loading}
            />
            {!loading && !photoList.length && (
              <div className='home--nofollowers--disclaimer'>
                <h1>Looks like you don&apos;t follow anyone.</h1>
                <p>Explore to find people worth following!</p>
              </div>
            )}
          </div>
          <HomeInfo
            isPhotoListPopulated={photoList.length}
            loading={loading}
            name={name}
            username={currentUser.displayName}
            avatar={avatar}
          />
        </section>
      </main>
    </>
  );
};

export default Home;
