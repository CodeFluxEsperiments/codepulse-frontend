
// src/components/tests/TestRunner/TestRunner.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Chip,
  IconButton
} from '@mui/material';
import {
  PlayArrow as RunIcon,
  Check as PassIcon,
  Close as FailIcon,
  Info as InfoIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import TestScript from '../TestScript';
import { runTests, clearTestResults } from '../../../store/slices/requestSlice';

const TestRunner = () => {
  const dispatch = useDispatch();
  const [running, setRunning] = useState(false);
  const { testScript, testResults } = useSelector((state) => state.request);
  const response = useSelector((state) => state.response.data);

  const handleRunTests = async () => {
    if (!testScript || !response) return;
    
    setRunning(true);
    try {
      await dispatch(runTests()).unwrap();
    } finally {
      setRunning(false);
    }
  };

  const handleClearResults = () => {
    dispatch(clearTestResults());
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Test Runner</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={running ? <CircularProgress size={20} color="inherit" /> : <RunIcon />}
            onClick={handleRunTests}
            disabled={running || !testScript || !response}
            sx={{ mr: 1 }}
          >
            {running ? 'Running...' : 'Run Tests'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClearResults}
            disabled={!testResults || testResults.length === 0}
          >
            Clear Results
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', height: 'calc(100% - 48px)', gap: 2 }}>
        <Paper sx={{ flexBasis: '50%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" gutterBottom>
            Test Script
          </Typography>
          <TestScript />
        </Paper>

        <Paper sx={{ flexBasis: '50%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">
              Test Results
            </Typography>
            {testResults && testResults.length > 0 && (
              <Box>
                <Chip 
                  label={`${testResults.filter(r => r.passed).length} passed`} 
                  color="success" 
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={`${testResults.filter(r => !r.passed).length} failed`} 
                  color="error" 
                  size="small" 
                />
              </Box>
            )}
          </Box>
          
          {!testResults || testResults.length === 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
              <Typography color="textSecondary">No test results yet</Typography>
            </Box>
          ) : (
            <List sx={{ overflow: 'auto', flexGrow: 1 }}>
              {testResults.map((result, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      {result.passed ? (
                        <PassIcon color="success" />
                      ) : (
                        <FailIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={result.name} 
                      secondary={!result.passed && result.message} 
                    />
                  </ListItem>
                  {index < testResults.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default TestRunner;