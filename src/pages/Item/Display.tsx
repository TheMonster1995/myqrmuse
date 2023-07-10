import { Box } from '@mui/material';
// import mqmApi from 'axios/mqmApi';
// import React, { useState } from 'react';
import React from 'react';
import Preview from './Preview';
import { useParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

const Display: React.FC = () => {
  const { id } = useParams();
  // const [isLoading, setLoading] = useState(true);
  // const [query] = useSearchParams();

  // const getItem = async () => {
  //   try {
  //     const menu = await mqmApi.get(
  //       `/item/${query.get('id')}`,
  //     );

  //     const newMenu = menu.data?.payload;

  //     if (newMenu) updateMenu(newMenu);
  //     return true;
  //   } catch (err: any) {
  //     enqueueSnackbar('There was a problem getting the menu', {
  //       variant: 'warning',
  //     });
  //     return false;
  //   }
  // }

  return (
    <Box>
      {/* <iframe src="http://eclient.imnstr.com/no_image.jpg"></iframe> */}
      <Preview
        url={id ? `preview/${id}` : null}
        className="mt-8"
        iClassName="mx-auto border-0 w-full h-[92vh]"
      />
    </Box>
  );
};

export default Display;
