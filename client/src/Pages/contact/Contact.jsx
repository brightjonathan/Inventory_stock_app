import React, { useState } from "react";
import Card from "../../Component/card/Card";
import "./Contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import Loader from "../../Component/loading/Loader";

const Contact = () => {

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] =  useState(false);

  const form_data = {
    subject,
    message,
  };


  const sendEmail = async (e) => {
    e.preventDefault();
  
    // Check if required fields are filled
    if (!subject || !message) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    const form_data = {
      subject,
      message,
    };
  
    try {
      setLoading(true);
  
      const res = await fetch('/api/contact', {
        method: 'POST',
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
          // Clear the form inputs
          setSubject("");
          setMessage("");
        setLoading(false);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while sending the email");
      console.error(error);
    } 
  
  };

  return (
    <div className="contact">
        {loading && <Loader />}
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="text-[black]"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              cols="30"
              rows="10"
              name="message"
              className="text-[black]"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="--btn bg-[#183017]">Send Message</button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>+234 (0)81 3712 2768</p>
              </span>
              <span>
                <FaEnvelope />
                <p>brightjonathan64@gmail.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Port Harcourt, Nigeria</p>
              </span>
              <span>
                <FaTwitter />
                <p>@BJonathan64</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Contact
