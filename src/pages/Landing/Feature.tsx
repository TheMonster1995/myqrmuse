import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  imgUrl?: string;
  title?: string;
  desc?: string;
}

const Feature: React.FC<Props> = ({ imgUrl, title, desc }) => (
  <Box className="flex justify-center min-w-[33%] mb-8">
    <Box className="text-left">
      <img src={imgUrl} alt={`${title} image`} className="w-48 rounded-3xl" />
      <Typography variant="h3" className="text-syne">{title}</Typography>
      <Typography variant="caption" className="text-syne">{desc}</Typography>
    </Box>
  </Box>
);

export default Feature;
