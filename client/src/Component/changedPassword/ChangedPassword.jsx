import {useState} from 'react';
import './changed.scss';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Card from '../card/Card';
import Loader from '../loading/Loader';



const ChangedPassword = () => {

  const navigate = useNavigate();
  const [oldpassword, setoldpassword] = useState('');
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');
  const [loading, setLoading] = useState(false);


  const changePassword = async(e) =>{
    e.preventDefault();
  
    if (password !== password2) {
        return toast.error("New passwords do not match");
      }
  
    const form_data = {
      oldpassword,
      password
    };
  
    try {
      setLoading(true);
  
      const res = await fetch('/api/profile/changepassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data),
      });
  
       const data = await res.json();
  
      if (data.success === false) {
        toast.error(data.message);
        setLoading(false);
    } else {
        setLoading(false);
        toast.success('Password changed successfully');
        navigate('/profile')
      }
    } catch (error) {
      toast.error("An error occurred while sending the email");
      console.error(error);
    }
  };



  
  return (
    <div className="change-password">
        {loading && <Loader />}
    <Card cardClass={"password-card"}>
      <h3>Change Password</h3>
      <form onSubmit={changePassword} className="--form-control text-[black]">
        <input
          type="password"
          placeholder="Old Password"
          required
          name="oldpassword"
          value={oldpassword}
          onChange={(e) => setoldpassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          required
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          required
          name="password2"
          value={password2}
          onChange={(e) => setpassword2(e.target.value)}
        />
        <button type="submit" className="--btn --btn-primary">
          Change Password
        </button>
      </form>
    </Card>
  </div>
  )
}

export default ChangedPassword
