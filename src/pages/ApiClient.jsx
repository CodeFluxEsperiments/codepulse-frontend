import React, { useState } from 'react';
import { Box, Paper, Tabs, Tab } from '@mui/material';
import ApiTester from '../components/common/ApiTester';
import ResponseBody from '../components/response/ResponseBody';
import TestRunner from '../components/tests/TestRunner';
import DocGenerator from '../components/docs/DocGenerator';

const ApiClient = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ mb: 2 }}>
        <ApiTester />
      </Paper>
      
      <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Response" />
          <Tab label="Tests" />
          <Tab label="Docs" />
        </Tabs>
        
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {activeTab === 0 && <ResponseBody />}
          {activeTab === 1 && <TestRunner />}
          {activeTab === 2 && <DocGenerator />}
        </Box>
      </Paper>
    </Box>
  );
};

export default ApiClient;