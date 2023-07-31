import { Box, Typography } from '@mui/material';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import QA from './QA';

const KnowMore: React.FC = () => {
  return (
    <SectionWrapper className="bg-[#06d6a0]">
      <Typography variant="h2" className="text-syne text-5xl mb-8">Curious to Know More?</Typography>
      <Box className="grid grid-cols-2">
        <QA
          q="What types of files can I upload?"
          a="You can upload images, short videos, and audio files"
        />
        <QA
          q="Is it really free for everyone?"
          a="Yes our basic version is 100% free for everyone to use"
        />
        <QA
          q="Is is open source?"
          a="Yes you can find the entire source code on github"
        />
        {/* <QA
          q="Is its content moderated?"
          a="No. My QR Muse is not responsible for the content uploaded and shared by its users"
        /> */}
        {/* <QA
          q="Is it anonymous?"
          a="Yes, My QR Muse only stores your email for account recover - optional, and you can delete your account and history at any time"
        /> */}
        <QA
          q="How can I join?"
          a="For now the only way to join is to be invited by a friend"
        />
      </Box>
    </SectionWrapper>
  )
};

export default KnowMore;
