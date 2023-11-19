import {useRef, useEffect, useState } from "react";
import './Profile.scss';
import { Link, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from '../../customerHook/UserRedirect';
import { useDispatch, useSelector } from 'react-redux';
import Card from "../../Component/card/Card";
import Loader from "../../Component/loading/Loader";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import './Profile.scss';
import {app} from '../../Firebase/FirebaseConfig';



const EditProfile = () => {

const fileRef = useRef(null); //for the image
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
    };
}, [email, navigate]);


const initialState = {
    username: user?.username,   
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
};

const [profile, setProfile] = useState(initialState);

const [file, setFile] = useState(undefined);
const [filePerc, setFilePerc] = useState(0);
const [fileUploadError, setFileUploadError] = useState(false);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProfile({ ...profile, [name]: value });
};


useEffect(() => {
    if (file) {
      handleGoogleFileUpload(file);
    }
  }, [file]);
  

//this func... handles the google flie upload 
const handleGoogleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setProfile({ ...profile, photo: downloadURL })
        );
      }
    );
  };


  const saveProfile = async (e)=>{
    e.preventDefault()
    try {
      setLoading(true);
     //dispatch(updateUserStart())
                                 //passing the id to the backend
     const res =  await fetch("/api/profile/updateprofile", {
       method: 'PATCH',
       headers: {
         'content-type': 'application/json'
       },
       body: JSON.stringify(profile),
     });
     const data = await res.json();
     if (data.success === false) {
      setLoading(false);
       //dispatch(updateUserFailure(data.message))
       console.log(data.error);
       return;
     }
     //dispatch(updateUserSuccess(data));
     setProfile(data)
     console.log(data);
     setLoading(false);
     toast.success('updated successfully')
     //setUpdateSuccess(true);
    } catch (error) {
      //dispatch(updateUserFailure(error.message));
      console.log(error);
      setLoading(false);
    }
 
   };


  return (
    <div className="profile --my2">
      {loading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img 
          src={profile.photo ||user?.photo} 
          alt="profilepic"
          onClick={() => fileRef.current.click()}
          />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                required
                type="text"
                name="username"
                value={profile?.username}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input 
              type="text" 
              name="email" 
              value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                required
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                required
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input 
              type="file" 
              name="image" 
              ref={fileRef}
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
               />
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

