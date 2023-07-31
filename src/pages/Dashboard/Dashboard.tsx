import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material';
import SectionWrapper from 'pages/Landing/SectionWrapper';
import CreationTab from './CreationTab';
import InvitesTab from './InvitesTab';
import QRTab from './QRTab';
import useAuth from 'components/hooks/useAuth';

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(1);
  const { logout } = useAuth();

  return (
    <SectionWrapper className="text-center">
      <Box className="grid grid-cols-3 mb-4">
        <Typography></Typography>
        <Typography variant="h2" className="text-syne">
          My QR Muse
        </Typography>
        <Box className="flex justify-end">
          <Button variant="text" className="text-syne text-sm" onClick={logout}>Logout</Button>
        </Box>
      </Box>
      <Tabs value={tabValue} onChange={(event, newVal) => setTabValue(newVal)} centered>
        <Tab label="QR Code" id="qr-tab" className="text-syne" />
        <Tab label="Creation" id="creation-tab" className="text-syne" />
        <Tab label="Invites" id="invites-tab" className="text-syne" />
      </Tabs>
      <QRTab
        hidden={tabValue !== 0}
      />
      <CreationTab
        hidden={tabValue !== 1}
      />
      <InvitesTab
        hidden={tabValue !== 2}
      />
    </SectionWrapper>
  );
};

export default Dashboard;
