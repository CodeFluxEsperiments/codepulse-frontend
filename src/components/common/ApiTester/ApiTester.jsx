import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Typography
} from '@mui/material';
import { Send as SendIcon, Save as SaveIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Params from '../../request/Params';
import Headers from '../../request/Headers';
import Body from '../../request/Body';
import Auth from '../../request/Auth';
import { sendRequest } from '../../../store/slices/requestSlice';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

const methodColors = {
  GET: '#4caf50',
  POST: '#2196f3',
  PUT: '#ff9800',
  DELETE: '#f44336',
  PATCH: '#9c27b0',
  HEAD: '#795548',
  OPTIONS: '#607d8b'
};

const ApiTester = () => {
  const dispatch = useDispatch();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [requestTab, setRequestTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleRequestTabChange = (event, newValue) => {
    setRequestTab(newValue);
  };

  const handleSendRequest = () => {
    setIsLoading(true);
    dispatch(sendRequest({ method, url }))
      .unwrap()
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <FormControl sx={{ width: 120, mr: 1 }}>
          <Select
            value={method}
            onChange={handleMethodChange}
            displayEmpty
            sx={{
              backgroundColor: `${methodColors[method]}20`,
              '& .MuiSelect-select': {
                color: methodColors[method],
                fontWeight: 'bold'
              }
            }}
          >
            {HTTP_METHODS.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          placeholder="Enter request URL"
          fullWidth
          value={url}
          onChange={handleUrlChange}
          variant="outlined"
          sx={{ mr: 1 }}
        />
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          onClick={handleSendRequest}
          disabled={isLoading || !url}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
        
        <IconButton color="primary" sx={{ ml: 1 }}>
          <SaveIcon />
        </IconButton>
      </Box>
      
      <Tabs value={requestTab} onChange={handleRequestTabChange}>
        <Tab label="Params" />
        <Tab label="Headers" />
        <Tab label="Body" />
        <Tab label="Auth" />
      </Tabs>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        {requestTab === 0 && <Params />}
        {requestTab === 1 && <Headers />}
        {requestTab === 2 && <Body />}
        {requestTab === 3 && <Auth />}
      </Box>
    </Box>
  );
};

export default ApiTester;