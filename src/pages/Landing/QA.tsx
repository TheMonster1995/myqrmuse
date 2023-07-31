import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import React from 'react';

interface Props {
  q: string;
  a: string;
  className?: string;
}

const QA: React.FC<Props> = ({q, a, className = ''}) => (
  <Box className={classNames(className, 'mb-6 max-w-3/4')}>
    <Typography variant="h4" className="text-syne text-2xl">{q}</Typography>
    <Typography variant="caption" className="text-syne text-base">{a}</Typography>
  </Box>
);

export default QA;
