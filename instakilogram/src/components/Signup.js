/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import SignupInput from './SingupInput';
import '../styles/AccountForms.css';

const Signup = () => {
  const { currentUser, signUp } = useAuth();
  const [lastStep, setLastStep] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSurname = (e) => {
    setSurname(e.target.value);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setLastStep((prevStep) => !prevStep);
  };

  const handleSignUp = async (e) => {
    setError('');
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match.');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(email, password, username, name, surname, description);
      history.push('/');
    } catch (err) {
      setLoading(false);
      return setError(err.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, []);

  return (
    <main className='signup--page'>
      <section className='signup--root'>
        <h1>INSTAKILOGRAM</h1>
        <p>Sign up to see photos and videos from your friends.</p>
        {error && <p className='error--container'>{error}</p>}
        <div className='signup--container'>
          <form onSubmit={handleSignUp}>
            {!lastStep ? (
              <>
                <SignupInput
                  value={username}
                  label='Username'
                  nameValue='username'
                  handleValue={(e) => handleUsername(e)}
                />
                <SignupInput
                  value={email}
                  label='Email'
                  nameValue='email'
                  handleValue={(e) => handleEmail(e)}
                />
                <SignupInput
                  value={password}
                  label='Password'
                  nameValue='password'
                  handleValue={(e) => handlePassword(e)}
                  type='password'
                />
                <SignupInput
                  value={passwordConfirm}
                  label='Confirm password'
                  nameValue='password--confirm'
                  handleValue={(e) => handlePasswordConfirm(e)}
                  type='password'
                />
                <button
                  type='button'
                  title='Next'
                  className='signup--step'
                  onClick={(e) => handleNextStep(e)}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <SignupInput
                  value={name}
                  label='Name'
                  nameValue='name'
                  handleValue={(e) => handleName(e)}
                />
                <SignupInput
                  value={surname}
                  label='Surname'
                  nameValue='surname'
                  handleValue={(e) => handleSurname(e)}
                />
                <div>
                  <label
                    htmlFor='signup--description'
                    className='signup--label'
                  >
                    <span
                      className={
                        description
                          ? 'signup--label--content--moved--textarea'
                          : 'signup--label--content--textarea'
                      }
                    >
                      Profile description
                    </span>
                    <textarea
                      name='signup--description'
                      id='signup--description'
                      className={
                        description
                          ? 'signup--input--moved--textarea'
                          : 'signup--input--textarea'
                      }
                      value={description}
                      onChange={handleDescription}
                      maxLength='100'
                    />
                  </label>
                </div>
                <input
                  className='signup--submit'
                  disabled={loading}
                  type='submit'
                  value='Sign up'
                />
                <button
                  type='button'
                  title='Back'
                  className='signup--step previous--step'
                  onClick={(e) => handleNextStep(e)}
                >
                  Back
                </button>
              </>
            )}
          </form>
        </div>
        <div className='signup--disclaimer'>
          <span className='signup--disclaimer--content'>
            INSTAKILOGRAM by any means is not connected with Instagram and was
            created only for educational purposes. Only data this site collects
            is what you provide in the forms.
          </span>
        </div>
      </section>
      <section className='signup--login'>
        Have an account?
        <Link to='/login'> Log in</Link>
      </section>
    </main>
  );
};

export default Signup;
