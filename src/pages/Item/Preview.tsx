import { Box } from '@mui/material';
// import mqmApi from 'axios/mqmApi';
// import React, { useState } from 'react';
import React from 'react';
// import { useSearchParams } from 'react-router-dom';

type Props = {
  url?: string;
  className?: string;
  iClassName?: string;
};

const Preview: React.FC<Props> = ({ url, className, iClassName }) => {
  const baseUrl = 'http://api.myqrmuse.com/';
  const finalUrl = !url
    ? 'http://eclient.imnstr.com/no_image.jpg'
    : `${baseUrl}${url}`;

  return (
    <Box className={className}>
      <iframe src={finalUrl} className={iClassName}></iframe>
      {/* <iframe src={`http://eclient.imnstr.com/no_image.jpg`}></iframe> */}
    </Box>
  );
};

export default Preview;
