import React, { useState, useEffect, useContext } from "react";
import './Phone_verify.css';
import logo from './logo.jpeg';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from "../GlobalStateContext/GlobalStateContext";

export const Phone_verify = () => {
  const { isAuthenticated, setIsAuthenticated, user_details, setUserDetails, existing_cart, setExistingCart, yesterday_cart, setYesterdaycart } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const [ph, setPh] = useState("");
  const [phonevalid, setPhonevalid] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpvalid, setOtpvalid] = useState(true);
  const [error, setError] = useState('');
  const [otpsuccess, setOtpsuccess] = useState(false);

  const checkphonenumbervalid = () => /^\d{10}$/.test(ph);

  const checkotpvalid = () => /^\d{6}$/.test(otp);

  const fetchOTP = async (ph) => {
    const url = `https://summer-project-backend.onrender.com/api/auth/genotp?mobile_number=${ph}`;
    try {
      const res = await fetch(url, { method: 'POST' });
      const data = await res.json();
      return data;
    } catch (error) {
      setError('Failed to generate OTP. Please try again.');
    }
  };

  const verifyOTPapi = async (ph, otp) => {
    const url = "https://summer-project-backend.onrender.com/api/auth/verifyotp";
    const body = JSON.stringify({ mobile_number: ph, otp: otp });

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });
      const data = await res.json();
      return data;
    } catch (error) {
      setError('Error Occurred.');
    }
  };

  const generate_otp = async () => {
    const validPhone = checkphonenumbervalid();
    setPhonevalid(validPhone);
    if (validPhone) {
      const response = await fetchOTP(ph);
      if (response && response.success) {
        setShowOTP(true);
      } else {
        setError('Failed to generate OTP. Please try again.');
      }
    } else {
      setError('Please enter a valid phone number.');
    }
  };

  const verifyOTP = async () => {
    const validOtp = checkotpvalid();
    setOtpvalid(validOtp);
    if (validOtp) {
      const response = await verifyOTPapi(ph, otp);
      if (response && response.success) {
        setIsAuthenticated(true);
        setOtpsuccess(true);
        setUserDetails({ ...response.user });
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } else {
      setError('Please enter a valid OTP.');
    }
  };

  useEffect(() => {
    if (user_details.id) {
      fetchCartData(user_details.id);
    }
  }, [user_details]);

  const fetchCartData = async (user_id) => {
    const url = `https://summer-project-backend.onrender.com/api/auth/getcart/${user_id}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setExistingCart(data.today);
      setYesterdaycart(data.yesterday);
    } catch (error) {
      setError('Error fetching cart data.');
    }
  };

  useEffect(() => {
    if (otpsuccess) {
      navigate('/orders');
    }
  }, [otpsuccess, navigate]);

  return (
    <div className='container'>
      <h1 className='company-name'>Javi Logistics</h1>
      <img src={logo} alt="Company's logo" className='company-logo' />

      <div className='phone-number'>
        <label className='label'>Please Enter your phone Number:</label>
        <div className="phone-input">
          <div className="country-code">+91</div>
          <input
            placeholder='0123456789'
            className="phone-field"
            type="text"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
          />
        </div>
        {!phonevalid && <p className='error-message'>Enter a valid 10-digit phone number.</p>}
        <button className='otp-button' onClick={generate_otp}>Generate OTP</button>
      </div>

      {showOTP && (
        <div className={`otp-number ${showOTP ? 'active' : ''}`}>
          <label className='label'>Enter the OTP below:</label>
          <div className="otp-input">
            <input
              className="otp-field"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          {!otpvalid && <p className='error-message'>Enter the correct OTP.</p>}
          <button className='otp-button' onClick={verifyOTP}>Submit</button>
        </div>
      )}

      {error && <div className='error-message'>{error}</div>}
      {otpsuccess && <div className='success-message'>OTP Verified Successfully.</div>}
    </div>
  );
};
