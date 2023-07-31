import React, { useEffect, useState } from 'react';
import { ITabProps } from './CreationTab';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import mqmApi from 'axios/mqmApi';
import { IInviteData } from 'types/general';

const InvitesTab: React.FC<ITabProps> = ({ hidden }) => {
  const [response, setResponse] = useState<IInviteData>({ inviteLink: null, remainingInvites: null });
  const userid = localStorage.getItem('user_id__mqm');
  const accesstoken = localStorage.getItem('accesstoken');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (response) return;

    const getInviteData = async () => {
      let res: any;
      try {
        res = await mqmApi.get(`/user/invite/${userid}/`, {
          headers: {
            'Content-Type': 'application/json',
            accesstoken,
          }
        });

        setResponse(res.data.payload);
      } catch (err) {
        enqueueSnackbar('There was a problem getting invite data', {
          variant: 'error',
        });
        return false;
      }
    };
    getInviteData();
  }, [])

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(response.inviteLink);
    enqueueSnackbar('Link copied to clipboard :)', {
      variant: 'success',
    })
  }

  if (hidden) return null;

  return (
    <Box className="flex flex-col justify-start items-center py-8">
      <TextField disabled={true} value={response?.inviteLink} className="rounded-full w-56 cursor-pointer" onClick={copyLinkToClipboard} />
      <Button variant="outlined" className="text-syne my-4" onClick={copyLinkToClipboard}>Copy Invite Link to Clipboard</Button>
      <Typography variant="h4" className="text-syne mt-4">Remaining invites: {response?.remainingInvites ?? 'IDK'}</Typography>
    </Box>
  )
}

export default InvitesTab;
