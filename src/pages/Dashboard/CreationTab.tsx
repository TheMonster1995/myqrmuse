import React, { useEffect, useState } from 'react';
import { WebStories } from '@mui/icons-material';
import { Typography, Box, IconButton } from '@mui/material';
import mqmApi from 'axios/mqmApi';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import Preview from 'pages/Item/Preview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export interface ITabProps {
  hidden: boolean;
}

const CreationTab: React.FC<ITabProps> = ({ hidden }) => {
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

  const getCurrFileContent = () => {
    if (!currFile) return (
      <>
        <WebStories />
        <Typography variant="caption">Waiting for your story</Typography>
      </>
    )
    return (
      <>
        <Typography variant="h3" className="text-syne">
          Current file
        </Typography>
        <Box className="flex justify-start">
          <Box className="text-left mr-8">
            <Typography variant="h6" className="text-syne">
              {currFile.name}
            </Typography>
            <Typography variant="caption" className="text-syne">
              {formatBytes(currFile.size)}
            </Typography>
          </Box>
          <IconButton onClick={handleDelete} className="rounded-full text-red-700">
            <DeleteIcon />
          </IconButton>
        </Box>
      </>
    )
  } 

  if (hidden) return null;

  return (
    <Box className="py-8">
      <Preview url={currFile ? `preview/${userid}` : null} />
      <Box className="bg-gray-300 rounded-xl px-4 py-2 my-4 w-fit mx-auto">
        {getCurrFileContent()}
      </Box>
      <label
        htmlFor="uploadFileInput"
        className="bg-[#1b9aaa] rounded flex flex-col items-center justify-center p-2 cursor-pointer text-white mt-8 w-96 mx-auto"
      >
        <FontAwesomeIcon icon={faUpload} className="text-5xl" />
        <Typography variant="h4">Click me to upload a file</Typography>
      </label>
      <input
        className="hidden"
        type="file"
        id="uploadFileInput"
        onChange={handleUploadFile}
      />
    </Box>
  )
};

export default CreationTab;
