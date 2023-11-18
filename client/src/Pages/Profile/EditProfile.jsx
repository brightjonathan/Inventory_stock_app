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

const navigate = useNavigate();
const dispatch = useDispatch();

//from our cutom hook
useRedirectLoggedOutUser('/login');

const [loading, setLoading] = useState(false);
const { UserProfile } = useSelector((state) => state.profile);

const user = UserProfile;  //de-structuring the userProfile 
const { email } = user; //de-structuring the email


useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);


const initialState = {
    username: user?.username,   
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
};

const [profile, setProfile] = useState(initialState);
const [profileImage, setProfileImage] = useState("");

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProfile({ ...profile, [name]: value });
};

const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
};


const saveProfile = async (e) => {
    e.preventDefault();
}

  return (
    <div className="profile --my2">
      {loading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.username}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" />
            </p>
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      {/* <ChangePassword /> */}
    </div>
  )
};

export default EditProfile;

