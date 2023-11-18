import React from 'react'
import useRedirectLoggedOutUser from '../../customerHook/UserRedirect';
import './Profile.scss';


const EditProfile = () => {

//from our cutom hook
useRedirectLoggedOutUser('/login');



  return (
    <div>
      <h2>Edit profile page</h2>
    </div>
  )
};

export default EditProfile;

