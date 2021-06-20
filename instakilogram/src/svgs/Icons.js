/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/Navbar.css';
import '../styles/Profile.css';

export const HomeIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='navbar--home--icon'
    width='36'
    height='36'
    viewBox='0 0 24 24'
    strokeWidth='1.2'
    stroke='#000000'
    fill={window.location.pathname === '/' ? '#000000' : 'none'}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <polyline points='5 12 3 12 12 3 21 12 19 12' />
    <path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' />
    <path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' />
  </svg>
);

export const SearchIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='navbar--search--icon'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='#000000'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <circle cx='10' cy='10' r='7' />
    <line x1='21' y1='21' x2='15' y2='15' />
  </svg>
);

export const ExploreIcon = () => (
  <svg
    height='36'
    width='36'
    viewBox='0 0 21 21'
    xmlns='http://www.w3.org/2000/svg'
    className='navbar--explore--icon'
    strokeWidth='1.2'
  >
    <g
      fill={window.location.pathname === '/explore' ? '#000000' : 'none'}
      stroke={window.location.pathname === '/explore' ? '#ffffff' : '#000000'}
      fillRule='evenodd'
      strokeLinecap='round'
      strokeLinejoin='round'
      transform='translate(2 2)'
    >
      <circle cx='8.5' cy='8.5' r='8' />
      <path d='m10.5 9.5-4 3v-5l4-3z' />
    </g>
  </svg>
);

export const NavProfileIcon = ({
  onClick,
  imageUrl,
  modalVisibility,
  stroke,
}) => (
  <img
    src={imageUrl}
    className={
      modalVisibility || stroke
        ? 'navbar--user--icon user--icon-stroked'
        : 'navbar--user--icon'
    }
    alt='profile avatar'
    onClick={onClick}
  />
);

export const ProfileModalIcon = () => (
  <svg
    height='36'
    width='36'
    viewBox='0 0 21 21'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g
      fill='none'
      fillRule='evenodd'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      transform='translate(2 2)'
    >
      <circle cx='8.5' cy='8.5' r='8' />
      <path d='m14.5 13.5c-.6615287-2.2735217-3.1995581-3.0251263-6-3.0251263-2.72749327 0-5.27073171.8688092-6 3.0251263' />
      <path d='m8.5 2.5c1.6568542 0 3 1.34314575 3 3v2c0 1.65685425-1.3431458 3-3 3-1.65685425 0-3-1.34314575-3-3v-2c0-1.65685425 1.34314575-3 3-3z' />
    </g>
  </svg>
);
