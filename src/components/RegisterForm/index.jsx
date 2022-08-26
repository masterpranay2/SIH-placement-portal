import { useState } from 'react';
import styles from './style.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import {
  addBreadCrumb,
  removeBreadCrumb,
} from '../../redux/reducers/breadCrumbReducer';
import { login } from '../../redux/reducers/loginReducer';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const StudentInputs = ({setInstituteId}) => {
  const [institutions, setInstitutions] = useState([]);
  const fetchInstitutions = async () => {
    const { data } = await axios.get(
      'http://localhost:5000/api/institution/all'
    );
    console.log(data)
    setInstitutions(data);
  };
  const findInstitution = (opt) => {
    return institutions.find(
      (institution) => institution.institutionname === opt
    );
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);
  return (
    <>
      <Input
        label="Aadhar Number"
        placeholder="Enter your aadhar card number"
        // err = "Enter a valid aadhar card number"
        type="number"
        aadhar
      />
      <Input
        label="Name"
        placeholder="Enter your Name on Aadhar Card"
        // err = "Enter your first name"
        type="text"
      />

      <Input
        label="Institution Name"
        placeholder="Enter your Institution Name"
        // err = "Enter your institution name"
        type="dropdown"
        addScroll
        options={institutions.map(
          (institution) => institution.institutionname
        )}
        onOptionClick={(opt) => {
          institutions.forEach((e, i) => {
            if (e.institutionname === opt) {
              console.log(e.id);
              setInstituteId(e.id);
            }
          })
        }} // TODO : update the onOptionClick function
      />

      <Input
        label="Degree"
        placeholder="Enter your Degree"
        // err = "Enter your degree"
        type="text"
      />

      {/* <div className={styles.datesWrapper}>
        <Input
          label="Starting Year"
          placeholder="Pick Date"
          // err = "Date is required"
          type="date"
          size="small"
        />

        <Input
          label="Ending Year"
          placeholder="Pick Date"
          // err = "Date is required"
          type="date"
          size="small"
        />
      </div> */}

      <Input
        label="Company Name"
        placeholder="Enter your Company Name"
        // err = "Enter your company name"
        type="text"
      />

      <Input label="Branch" placeholder="Enter your Branch" type="text" />
      <Input 
        label="Is Higher Education Opted"
        placeholder="Enter yes or no" 
        type="text" 
      />
      <Input
        label="Passing Year"
        placeholder="Enter your passing year"
        type="number"
      />

    </>
  );
};

const InstitutionInputs = () => {
  return (
    <>
      <Input
        label={'institution Name'}
        placeholder={'Enter your Institution Name'}
        // err = "Enter your institution name"
        type="text"
        required
      />

      <Input
        label="institution Id"
        placeholder="Enter your Institution Id"
        // err = "Enter your institution id"
        type="number"
        required
      />

      <Input
        label="Proof"
        placeholder="Upload your Proof"
        // err = "Upload your proof"
        type="upload"
      />
    </>
  );
};

const CorporateInputs = () => {
  return (
    <>
      <Input
        label="Company Name"
        placeholder="Enter your Company Name"
        // err = "Enter your company name"
        type="text"
      />

      <Input
        label="Proof"
        placeholder="Upload your Proof"
        // err = "Upload your proof"
        type="upload"
      />
    </>
  );
};

/* *********************************** */
/* Register Form Component Starts Here */
/* *********************************** */

const RegisterForm = () => {
  const ROLES = ['student', 'institution', 'corporate'];
  const [selectedInstitutionId, setSelectedInstitutionId] = useState('')
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

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    if (role === '') {
      alert('Please choose a role');
      return;
    }
    dispatch(removeBreadCrumb());
    dispatch(
      addBreadCrumb({
        name: `${role.charAt(0).toUpperCase() + role.slice(1)}`,
        url: `/${role}/profile`,
      })
    );

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key.toLowerCase().split(' ').join('')] = value;
    });
    if (role === 'student') {
      data['institution'] = selectedInstitutionId;
    }
    console.log(data)
    const config = {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/${role}/register`,
        data,
        config
      );
      console.log(response)
      dispatch(login({
        role: role,
        roleId: response.data.id,
      }))
      navigate(`/${role}/profile`);
    } catch (err) {
      alert(
        `Error in registering.\n${
          JSON.parse(err.request.response).error.message
        }`
      );
    }
  };

  return (
    <div className={styles.registerForm}>
      <h1>Get Started</h1>
      <p>
        Already have an account ? &nbsp;
        <span className={`highlight underline`}>
          <Link to="/auth/login">Login</Link>
        </span>
      </p>

      <form onSubmit={handleRegisterFormSubmit}>
        <Input
          label="email"
          placeholder="Enter your email"
          // err="Enter a valid email"
          type="email"
          required
        />

        <Input
          label="password"
          placeholder="Enter your password"
          // err="Enter a valid password"
          type="password"
          required
        />

        <Input
          label="role"
          placeholder="Choose your role"
          type="dropdown"
          options={ROLES}
          onOptionClick={handleDropdownOptionClick}
          required
        />

        {role === ROLES[0] && <StudentInputs setInstituteId={setSelectedInstitutionId}/>}

        {role === ROLES[1] && <InstitutionInputs />}

        {role === ROLES[2] && <CorporateInputs />}

        {/* <Button type="submit" text={<Link to={`/${role}/profile`}>Register</Link>} stretch size="large"/> */}
        <Button type="submit" text="Register" stretch size="large" notLink />
      </form>
    </div>
  );
};

export default RegisterForm;
