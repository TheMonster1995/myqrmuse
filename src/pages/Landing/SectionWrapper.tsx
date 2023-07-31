import { Box } from '@mui/material';
import classNames from 'classnames';
import React from 'react';

interface Props {
  className?: string;
}

const SectionWrapper: React.FC<Props> = ({ children, className }) => (
  <Box className={classNames('!m-0 p-36 relative', className)}>
    {children}
  </Box>
);

export default SectionWrapper;
