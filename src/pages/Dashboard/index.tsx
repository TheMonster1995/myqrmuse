import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import mqmApi from 'axios/mqmApi';
import { useSnackbar } from 'notistack';
import { WebStories } from '@mui/icons-material';
import Preview from 'pages/Item/Preview';

const Dashboard: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currFile, setCurrFile] = useState(null);
  const userid = localStorage.getItem('user_id__mqm');
  const accesstoken = localStorage.getItem('accesstoken');

  useEffect(() => {
    if (!userid) return;

    const getItem = async () => {
      let userItem;
      try {
        userItem = await mqmApi.get(`/item/${userid}/`, {
          headers: {
            'Content-Type': 'application/json',
            accesstoken,
          },
        });

        setCurrFile(userItem.data.payload);
      } catch (err) {
        enqueueSnackbar('There was a problem getting item', {
          variant: 'error',
        });
        return false;
      }
    };
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fd = new FormData();
    const file = e.target.files[0];
    fd.append('userItem', file);
    let uploadImg;

    try {
      uploadImg = await mqmApi.post(`/upload/${userid}/`, fd, {
        headers: {
          'Content-Type': 'application/json',
          accesstoken,
        },
      });

      setCurrFile(uploadImg.data.payload);
    } catch (err) {
      enqueueSnackbar('There was a problem uploading item', {
        variant: 'error',
      });
      return false;
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Delete item permenantly?');
    if (!confirm) return;

    try {
      await mqmApi.put(
        `/item/${userid}/`,
        { default: null },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken,
          },
        },
      );

      setCurrFile(null);
    } catch (err) {
      enqueueSnackbar('There was a problem archiving item', {
        variant: 'error',
      });
      return false;
    }
  };

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      'Bytes',
      'KiB',
      'MiB',
      'GiB',
      'TiB',
      'PiB',
      'EiB',
      'ZiB',
      'YiB',
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <Box className="text-center border-gray-500 border-solid w-fit mx-auto p-16">
      <Typography variant="h2" className="mb-8">
        My QR Muse
      </Typography>
      <input
        className="hidden"
        type="file"
        id="uploadFileInput"
        onChange={handleUploadFile}
      />
      <label
        htmlFor="uploadFileInput"
        className="bg-primaryLight rounded text-center p-2 cursor-pointer"
      >
        Click me to upload a file
      </label>
      <Typography variant="h3" className="mt-8">
        Current file
      </Typography>
      <Box className="flex justify-between w-48 mx-auto text-center bg-secondary rounded px-4 py-2 mt-4">
        {!currFile ? (
          <>
            <WebStories />
            <Typography variant="caption">Waiting for your story</Typography>
          </>
        ) : (
          <>
            <Box className="text-left">
              <Typography variant="h6">
                {`${currFile.name.slice(0, 5)}...${currFile.name.slice(
                  currFile.name.length - 5,
                  currFile.name.length,
                )}`}
              </Typography>
              <Typography variant="subtitle1">
                {formatBytes(currFile.size)}
              </Typography>
            </Box>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Preview url={currFile ? `preview/${userid}` : null} className="mt-8" />
    </Box>
  );
};

export default Dashboard;
