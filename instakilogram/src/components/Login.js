/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import '../styles/AccountForms.css';

const Login = () => {
  const { currentUser, logIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await logIn(email, password);
      history.push('/');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, []);

  return (
    <main className='login--page'>
      <section className='login--root'>
        <h1>INSTAKILOGRAM</h1>
        {error && <p className='error--container'>{error}</p>}
        <div className='login--container'>
          <form onSubmit={handleLogIn}>
            <div>
              <label htmlFor='login--email' className='login--label'>
                <span
                  className={
                    email
                      ? 'login--label--content--moved'
                      : 'login--label--content'
                  }
                >
                  E-mail
                </span>
                <input
                  name='login--email'
                  id='login--email'
                  type='text'
                  className={email ? 'login--input--moved' : 'login--input'}
                  value={email}
                  onChange={handleEmail}
                />
              </label>
            </div>
            <div>
              <label htmlFor='login--password' className='login--label'>
                <span
                  className={
                    password
                      ? 'login--label--content--moved'
                      : 'login--label--content'
                  }
                >
                  Password
                </span>
                <input
                  name='login--password'
                  id='login--password'
                  type='password'
                  className={password ? 'login--input--moved' : 'login--input'}
                  value={password}
                  onChange={handlePassword}
                />
              </label>
            </div>
            <input
              disabled={loading}
              className='login--submit'
              type='submit'
              value='Log in'
            />
          </form>
        </div>
        <div className='login--disclaimer'>
          <span className='login--disclaimer--content'>
            INSTAKILOGRAM by any means is not connected with Instagram and was
            created only for educational purposes. Only data this site collects
            is what you provide in the forms.
          </span>
        </div>
      </section>
      <section className='login--signup'>
        Do not have an account?
        <Link to='/signup'> Sign up</Link>
      </section>
    </main>
  );
};

export default Login;
