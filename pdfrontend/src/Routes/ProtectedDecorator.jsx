import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosPost } from '../Hooks/useFetchChannel';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const isValidToken = useRef(null)
  const [tokenValidity, setTokenValidity] = useState(null)

  useEffect(() => {
    // Make a request to validate the token
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem("refresh_token")

    if (access_token) {
      axios.get('http://127.0.0.1:8000/user/auth/validate-token/', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(response => {
        setTokenValidity(true)
      })
      .catch(error => {
        // If token is expired, make request with refresh token to generate a new access token
        if (error?.response?.data.messages[0]?.message === "Token is invalid or expired") {
          if (refresh_token) {
            axiosPost('http://127.0.0.1:8000/user/auth/api/token/refresh/', {
              refresh: refresh_token,
            })
            .then(res => {
              const {error, response, loading} = res
              console.log(loading, error, response)
              if (error){
                console.log(error)
                navigate("/auth/login")
              } else {
                window.localStorage.setItem("access_token", response?.access)
                console.log(response?.access)
                console.log(refresh_token)
                setTokenValidity(true)
                console.log("refresh token works")
              }
            })
          } else {
            setTokenValidity(false)
            navigate("/auth/login")
          }
        }
      });

    } else {
      navigate("/auth/login")
    }
  }, []);

  console.log(tokenValidity)

  return (
    tokenValidity && (
      children
    )
  );
};

export default ProtectedRoute;
