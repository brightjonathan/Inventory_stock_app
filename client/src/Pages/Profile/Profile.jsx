import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Card from "../../Component/card/Card";
import Loader from "../../Component/loading/Loader";
import { 
    profileFailure, 
    profileStart, 
    profileSuccess 
} from "../../Redux/Profile/Profile";

const Profile = () => {

    const dispatch = useDispatch();

    const { isLoggedIn} = useSelector((state) => state.user);
    const { UserProfile } = useSelector((state) => state.profile);

    const [profile, setProfile] = useState(UserProfile);
    const [loading, setLoading] = useState(false);

    const fetchingProfileUser = async ()=>{
        try {
            setLoading(true)
            dispatch(profileStart())
      
            const res = await fetch(`/api/profile/getuser`);
            const data = await res.json();
      
            if (data.success === false ) {
                setLoading(false)
                dispatch(profileFailure(data.message))
                toast.error(data.message);
                return; 
            };
      
            //console.log(data);
            dispatch(profileSuccess(data));
            setProfile(data)
            setLoading(false);
        } catch (error) {
           setError(true)
           setLoading(false)
        }
    };


    useEffect(()=>{
    
          fetchingProfileUser();
    
      },[dispatch, isLoggedIn]);
      


    

  return (
    <div className="profile --my2">
      {loading && <Loader />}
      <>
        {!loading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name : </b> {profile?.username}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <p>
                <b>Phone : </b> {profile?.phone}
              </p>
              <p>
                <b>Bio : </b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  )
}

export default Profile;
