import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from './BackgroundImage';
import SectionWrapper from './SectionWrapper';

const MainLanding: React.FC = () => {
  return (
    <SectionWrapper className="h-[72vh] flex flex-col justify-between">
      <BackgroundImage />
      <div className="flex justify-between items-center">
        <Typography className="text-syne !text-base">MyQRMuse</Typography>
        <Link to="/dashboard" className="text-syne text-gray-900 !text-base">Dashboard</Link>
      </div>
      <Typography className="!text-9xl text-mirza-base text-center">Unleash Your Creativity, One QR at a Time</Typography>
      <div className="flex justify-between items-center">
        <Typography className="text-syne !text-base">Free</Typography>
        <Typography className="text-syne !text-base">Easy</Typography>
      </div>
    </SectionWrapper>
  )
};

export default MainLanding;
