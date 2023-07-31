import { Box } from '@mui/material';
import React from 'react';

const BackgroundImage: React.FC = () => {
  return (
    <Box className="!m-0 w-full h-full absolute top-0 left-0 bg-[#1b9aaa] -z-10">
      <img src="./bg-img.png" alt="abstract" />
    </Box>
  )
}

export default BackgroundImage;
