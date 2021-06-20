/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const HomePost = ({ photo, determineTime }) => (
  <>
    <div className='home--photo--title'>
      <img
        src={photo.authorPicture}
        alt={`${photo.author} Profile Avatar`}
        className='home--photo--avatar'
        loading='lazy'
      />
      <Link to={`/p/${photo.author}`}>
        <h1>{photo.author}</h1>
      </Link>
    </div>
    <div className='home--photo--container'>
      <img
        src={photo.photoUrl}
        alt={`Post by ${photo.author}`}
        loading='lazy'
      />
    </div>
    <div className='home--photo--info'>
      <p>{determineTime(photo.postedSince)}</p>
    </div>
  </>
);

export default HomePost;
