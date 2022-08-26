import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import WorkCardView from '../components/Work-Card';
import Footer from '../components/Footer';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  const role = useSelector(state => state.login.role);
  const navigate = useNavigate()

  useEffect(() => {
    if(role !== '') {
      if(role !== 'government')
        navigate('/' + role + '/profile')
      else 
        navigate('/government/dashboard')
    }
  })

  return (
  <>
    <NavBar />
    <Hero />
    <WorkCardView />
    <Footer />
  </>
)};

export default HomePage;
