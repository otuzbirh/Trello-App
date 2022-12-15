import React from 'react'
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


interface Props {
  children: JSX.Element
}




const IsAuthenticated: React.FC<Props> = ({ children }) => {
  const token = window.localStorage.getItem('Token');
  const navigate = useNavigate();
  if (!token) {
    return <Navigate to='/login' replace={true} />
    // navigate('/dashboard');
  }

  return children
}

export default IsAuthenticated;