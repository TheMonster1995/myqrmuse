import { Box, Typography } from '@mui/material';
import React from 'react';
import SectionWrapper from './SectionWrapper';

const Intro: React.FC = () => {
  return (
    <SectionWrapper className="flex flex-col justify-between bg-[#ff961f]">
      <Box className="flex justify-between items-center">
        <img src="./bg-img.png" className="w-1/2" />
        <Box>
          <Typography variant="h2" className="text-syne text-5xl mb-4">Create, Share, and Connect with QR Codes</Typography>
          <Typography variant="subtitle1" className="text-syne !text-lg">Engage in the brave new world of QR Codes. Unleash your creative side and experiment with endless possiblities</Typography>
        </Box>
      </Box>
      <Box className="flex justify-between items-center">
        <Box>
          <Typography variant="h2" className="text-syne text-5xl mb-4">{`Scan Firends' Codes, Dive into Fresh Experiences`}</Typography>
          <Typography variant="subtitle1" className="text-syne !text-lg">{`Easily scan your friends' unique QR codes and explore their exciting treasures`}</Typography>
        </Box>
        <img src="./bg-img.png" className="w-1/2" />
      </Box>
    </SectionWrapper>
  )
};

export default Intro;
