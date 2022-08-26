import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import axios from 'axios';

import { addBreadCrumb, removeBreadCrumb } from '../../redux/reducers/breadCrumbReducer';
import { login } from '../../redux/reducers/loginReducer';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
  const ROLES = ['student', 'institution', 'corporate', 'government'];
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currRole = useSelector(state => state.login.role);

  useEffect(() => {
    if(currRole !== '') {
      if(currRole !== 'government')
        navigate('/' + currRole + '/profile')
      else 
        navigate('/government/dashboard')
    }
  })

  const handleDropdownOptionClick = (option) => {
    setRole(option);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    if (role === '') {
      alert('Please choose a role');
      return;
    }
    dispatch(removeBreadCrumb())
    dispatch(addBreadCrumb({
      name: `${role.charAt(0).toUpperCase() + role.slice(1)}`,
      url : `/${role}/profile`
    }))

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key.toLowerCase().split(' ').join('_')] = value;
    });
    console.log(data);
    const config = {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/${role}/login`,
        data,
        config
      );
      console.log(response);
      dispatch(login({
        role: role,
        roleId: response.data._id,
      }))
      if(role === 'government') navigate(`/${role}/dashboard`);
      else navigate(`/${role}/profile`);
    } catch (err) {
      alert('Invalid Credentials');
      console.log(err);
    }
  }

  return (
    <div className={styles.loginForm}>
      <h1>Welcome Back</h1>
      <p>
        Don't have an account? &nbsp;
        <span className="highlight underline">
          <Link to="/auth/register">Register</Link>
        </span>
      </p>

      <form onSubmit={handleLoginFormSubmit}>
        <Input
          label="Email"
          placeholder="Enter your email"
          // err="Enter a valid email"
          type="email"
          required
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          // err="Enter a valid password"
          type="password"
          required
        />

        <Input
          label="Role"
          placeholder="Choose your role"
          type="dropdown"
          options={ROLES}
          onOptionClick={handleDropdownOptionClick}
        />

        <span className={`highlight underline pointer`}>Forgot your password</span>

        {/* TODO : Render Button Conditionally based on the role */}
        <Button text="Login" type="submit" stretch size="large" notLink/>
      </form>

    </div>
  );
}

export default LoginForm;