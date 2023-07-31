import React, { useEffect, useState } from 'react';
import { ITabProps } from './CreationTab';
import { Box, Button } from '@mui/material';
import qrTigerApi from 'axios/qrTigerApi';
import { useSnackbar } from 'notistack';
import { ClipLoader } from 'react-spinners';
import { saveAs } from 'file-saver';

const QRTab: React.FC<ITabProps> = ({ hidden }) => {
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse] = useState('');
  const userid = localStorage.getItem('user_id__mqm');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (response && response !== '') return;

    const getQr = async () => {
      let res;
      try {
        res = await qrTigerApi.post(`/api/qr/static`, {
          data: {
            text: `http://myqrmuse.com/user/${userid}`
          } 
        });

        setResponse(res.data.url);
        setLoading(false);
      } catch (err) {
        enqueueSnackbar('There was a problem getting QR Code', {
          variant: 'error',
        });
        setLoading(false);
        return false;
      }
    };
    getQr();
  }, [])

  const downloadFile = () => {
    saveAs(response, 'MQMQrCode.png');
  };

  const renderContent = () => {
    if (isLoading) return <ClipLoader color="#ecf0f1" size={20} />;

    return (
      <>
        <img src={response} alt="Qr Code" onClick={downloadFile} className="w-56 mb-6 cursor-pointer" />
        <Button onClick={downloadFile} variant="contained" className="w-56 text-xl text-syne">Download</Button>
      </>
    )
  }

  if (hidden) return null;

  return (
    <Box className="flex flex-col justify-start items-center py-8">
      {renderContent()}
      {/* Loading */}
      {/* Background color */}
      {/* Text color */}
      {/* shape */}
      {/* (Save and) Download */}
    </Box>
  )
}

export default QRTab;
