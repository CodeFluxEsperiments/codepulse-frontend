import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import { ContentCopy as CopyIcon, Download as DownloadIcon } from '@mui/icons-material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ResponseBody = () => {
  const [activeTab, setActiveTab] = useState(0);
  const response = useSelector((state) => state.response.data);
  const isLoading = useSelector((state) => state.response.loading);
  const error = useSelector((state) => state.response.error);
  const responseTime = useSelector((state) => state.response.time);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading response...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!response) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography color="textSecondary">Send a request to see the response</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Chip 
          label={`Status: ${response.status || 200} ${response.statusText || 'OK'}`}
          color={response.status < 300 ? 'success' : 'error'}
          size="small"
          sx={{ mr: 2 }}
        />
        <Chip
          label={`Time: ${responseTime}ms`}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        />
        <Chip
          label={`Size: ${JSON.stringify(response.body).length} bytes`}
          variant="outlined"
          size="small"
        />
        <Box sx={{ ml: 'auto' }}>
          <IconButton size="small" onClick={handleCopyResponse}>
            <CopyIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Body" />
          <Tab label="Headers" />
          <Tab label="Cookies" />
        </Tabs>
        
        <Divider />
        
<Box sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
  {activeTab === 0 && (
    <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <SyntaxHighlighter
        language="json"
        style={dracula}
        customStyle={{ margin: 0, borderRadius: 8, height: '100%' }}
        wrapLines={true}
      >
        {JSON.stringify(response.body, null, 2)}
      </SyntaxHighlighter>
    </Box>
  )}
  {activeTab === 1 && <ResponseHeaders headers={response.headers} />}
  {activeTab === 2 && <ResponseCookies cookies={response.cookies} />}
</Box>
</Paper>
</Box>
);
};

export default ResponseBody;