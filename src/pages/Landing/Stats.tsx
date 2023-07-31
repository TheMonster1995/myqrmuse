import { Box, Typography } from '@mui/material';
import React from 'react';
import SectionWrapper from './SectionWrapper';

const Stats: React.FC = () => {
  return (
    <SectionWrapper className="grid grid-cols-3 gap-4 bg-black">
      <Box className="rounded-3xl bg-[#1f1f1f] col-span-2 flex flex-col items-center justify-center">
        <Typography variant="h2" className="text-5xl text-[#ef476f] text-syne mb-2">50</Typography>
        <Typography variant="h4" className="text-syne text-white">Excited users</Typography>
      </Box>
      <Box className="rounded-3xl bg-[#1f1f1f] flex justify-center items-center py-6">
        <img src="./abst1.png" className="w-36" />
      </Box>
      <Box className="rounded-3xl bg-[#1f1f1f] flex justify-center items-center py-6">
        <img src="./abst2.png" className="w-36" />
      </Box>
      <Box className="rounded-3xl bg-[#1f1f1f] col-span-2 flex flex-col items-center justify-center">
        <Typography variant="h2" className="text-5xl text-[#ef476f] text-syne mb-2">200</Typography>
        <Typography variant="h4" className="text-syne text-white">Codes scanned</Typography>
      </Box>
    </SectionWrapper>
  )
};

export default Stats;
