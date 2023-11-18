import { useEffect, useState } from "react";
import './Profile.scss';
import { Link, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from '../../customerHook/UserRedirect';
import { useDispatch, useSelector } from 'react-redux';
import Card from "../../Component/card/Card";
import Loader from "../../Component/loading/Loader";
import { toast } from "react-toastify";
import './Profile.scss';



const EditProfile = () => {

//from our cutom hook
useRedirectLoggedOutUser('/login');

const [loading, setLoading] = useState(false);
const { UserProfile } = useSelector((state) => state.profile);

const user = UserProfile;  //de-structuring the userProfile 
const { email } = user; //de-structuring the email


const initialState = {
    name: user?.name,   
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
};




  return (
    <div>
      <h2>Edit profile page</h2>
    </div>
  )
};

export default EditProfile;

