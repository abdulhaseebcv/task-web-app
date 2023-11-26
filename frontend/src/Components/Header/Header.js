import React, { useContext, useEffect, useState } from 'react'
import { LeftSection, Logo, RightSection, Row } from './HeaderStyle'
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../Context/ThemeProvider';

const Header = () => {
  console.log("Header=>");

  // State to store user details
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const { setIsDark } = useContext(ThemeContext);

  // Handling user logout
  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsDark(false)
    navigate('/login')
  }

  // Fetching and setting user details on component mount
  useEffect(() => {
    const getUserDetails = () => {
      const userDetails = localStorage.getItem('user');
      setUser(JSON.parse(userDetails) || {});
    };

    getUserDetails();
  }, []);


  return (
    <header>
      <Row>
        <LeftSection>
          < Logo src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="" />
          {user?.username && <h2>{`Welcome ${user?.username}`}</h2>}
        </LeftSection>
        <RightSection>
          <button onClick={handleLogOut}>Log Out <span><MdLogout size={20} /></span></button>
        </RightSection>
      </Row>
    </header>
  )
}

export default Header