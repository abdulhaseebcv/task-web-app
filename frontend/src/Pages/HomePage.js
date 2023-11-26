import React, { useContext } from 'react';
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import Todo from '../Components/Todo/Todo';
import { ThemeContext } from '../Context/ThemeProvider';
import styled from 'styled-components';

// Styled component for the main container of the home page
const PageContainer = styled.div`
display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ $isDark }) => $isDark ? '#171823' : '#fafafa'};
  overflow-y: auto;
  position: relative;
`;

// HomePage component that includes the Header, Banner, and Todo components
const HomePage = () => {

  // Accessing the theme context to determine the current theme
  const { isDark } = useContext(ThemeContext);

  return (
    <PageContainer $isDark={isDark}>
      <Header />
      <Banner />
      <Todo />
    </PageContainer>
  );
};

export default HomePage;
