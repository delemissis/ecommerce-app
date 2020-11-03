import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';

function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispath = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispath(signin(email, password));
  };
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          {error && (
            <li>
              <ErrorBox message={error} />
            </li>
          )}
          {loading && (
            <li>
              <LoadingBox />
            </li>
          )}

          <li>
            <label htmlFor="email">Email </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button id="submit" type="submit" className="button primary">Sign in</button>
          </li>
          <li>New to Amazona?</li>
          <li>
            <Link
              to={redirect === '/' ? '/register' : `/register?redirect=${redirect}`}
              className="button secondary text-center"
            >
              Create Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default SigninScreen;
