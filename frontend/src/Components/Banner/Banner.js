import React, { useContext } from 'react'
import { ImageContainer } from './BannerStyle'
import { ThemeContext } from '../../Context/ThemeProvider';


// Banner component displays an image based on the current theme (light/dark)
const Banner = () => {
  console.log("Banner=>");

  // Accessing theme context to determine the current theme and toggle function
  const { isDark } = useContext(ThemeContext);
  return (
    <ImageContainer>
      <img src={isDark ? process.env.PUBLIC_URL + '/assets/images/Bitmap.jpg' : process.env.PUBLIC_URL + '/assets/images/Bitmap.png'} alt='banner-image' />
    </ImageContainer>
  )
}

export default Banner