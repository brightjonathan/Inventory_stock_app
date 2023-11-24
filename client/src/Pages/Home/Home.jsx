import React from 'react';
import './Home.scss';
import {RiProductHuntLine} from 'react-icons/ri';
import { Link } from "react-router-dom";
import hero from '../../assets/hero-inve.png';
import {useSelector} from 'react-redux';
import logo from '../../../public/e-ventorylogo.png';

const Home = () => {

  const {currentUser} = useSelector(state => state.user);

  //functionality for the greeting 
  const hourNow = new Date().getHours();
  let greeting;
  if (hourNow >= 16) {
    greeting = 'Good evening';
  } else if (hourNow >= 12) {
    greeting = 'Good afternoon';
  } else if (hourNow >= 0) {
    greeting= ' Good morning';
  } else {
    greeting = 'Welcome';
  };


  return (
    <div className="home">
      <nav className='container --flex-between'>
      <div className="logo">
          <img src={logo} alt="logo" className='w-[9vh] h-[9vh] lg:w-[15vh] lg:h-[15vh]' />
        </div>

        <ul className="home-links">

          {!currentUser ? <li> <Link to="/register">Register</Link> </li> : null}

          {currentUser && <h2 className='text-[white] text-[15px]'> {greeting}, {currentUser.username} </h2>}

            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>

            {currentUser && <Link to={'/edit-profile'}><img src={currentUser.photo} className='rounded-[50%] h-7 w-7 object-cover' alt='profile' /></Link>}
         
         </ul>
      </nav>

      {/* hero section */}
      <section className="container hero">
        <div className="hero-text">
        <h2>e-ventory & Stock Management Solution for business</h2> 
        <p>
           our e-ventory system control and manage products in the warehouse in
            real time and integrated to make it easier to develop your business.
          </p><div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Get started for Free</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="14K" text="Brand Owners"/>
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Inventory" />
        </div>
      </section>
    </div>
  )
};


const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;

