import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';

function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const dispath = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispath(register(name, email, password, repassword));
  };
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

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
            <h2>Create account</h2>
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
            <label htmlFor="name">Your name </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
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
            <label htmlFor="repassword">Re-enter Password </label>
            <input
              type="password"
              name="repassword"
              id="repassword"
              required
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
          </li>
          <li>
            <button id="submit" type="submit" className="button primary">Create your Amazona account</button>
          </li>

          <li>
            <div>
              Already have an account?
               &nbsp;
              <Link to={redirect === '/' ? '/signin' : `/signin?redirect=${redirect}`}>
                Sign-In
              </Link>

            </div>

          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
