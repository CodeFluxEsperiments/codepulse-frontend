import React, { useState, useEffect } from 'react';
import {
  AppBar, Box, Button, Card, CardContent, CardHeader, Checkbox, 
  Container, Divider, Drawer, FormControl, Grid, IconButton, 
  InputAdornment, InputLabel, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, MenuItem, Paper, Select, Stack, 
  Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, TextField, ThemeProvider, Toolbar, Typography, createTheme
} from '@mui/material';
import {
  Send as SendIcon,
  Save as SaveIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  MenuBook as MenuBookIcon,
  Settings as SettingsIcon,
  Layers as LayersIcon,
  AccessTime as AccessTimeIcon,
  Share as ShareIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  MoreVert as MoreVertIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

const CodePulse = () => {
  // State management
  const [activeTab, setActiveTab] = useState('request');
  const [requestTab, setRequestTab] = useState('params');
  const [responseTab, setResponseTab] = useState('body');
  const [themeMode, setThemeMode] = useState('light');
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([{ key: '', value: '', enabled: true }]);
  const [headers, setHeaders] = useState([{ key: '', value: '', enabled: true }]);
  const [requestBody, setRequestBody] = useState('');
  const [bodyType, setBodyType] = useState('json');
  const [response, setResponse] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [collections, setCollections] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const [activeEnv, setActiveEnv] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [openSidebar, setOpenSidebar] = useState('collections');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [showDocs, setShowDocs] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [testScript, setTestScript] = useState(`// Example test script
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});`);

  // Create theme based on theme mode
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  // Method color mapping
  const getMethodColor = (method) => {
    switch(method) {
      case 'GET': return '#4caf50';
      case 'POST': return '#2196f3';
      case 'PUT': return '#ff9800';
      case 'DELETE': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  // Mock function to simulate API request
  const sendRequest = async () => {
    setIsLoading(true);
    // Construct request URL with params
    let finalUrl = url;
    const queryParams = params
      .filter(p => p.enabled && p.key)
      .map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
      .join('&');
    
    if (queryParams) {
      finalUrl += `?${queryParams}`;
    }

    // Start timer
    const startTime = new Date();
    
    // Mock response after delay
    setTimeout(() => {
      setIsLoading(false);
      const endTime = new Date();
      setResponseTime(endTime - startTime);
      
      // Generate mock response
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'server': 'CodePulse Mock Server'
        },
        body: JSON.stringify({
          success: true,
          message: "Response from CodePulse",
          method: method,
          url: finalUrl
        }, null, 2)
      };
      
      setResponse(mockResponse);
      
      // Add to history
      setHistory(prev => [{
        method,
        url: finalUrl,
        timestamp: new Date().toISOString(),
        status: 200
      }, ...prev]);
      
      // Generate AI test suggestions
      setAiSuggestions([
        "Test for 404 response when resource doesn't exist",
        "Verify response time is under 500ms",
        "Check that the content-type header is application/json"
      ]);
      
      setTestResults([
        { name: "Status code is 200", result: "pass" },
        { name: "Response time check", result: "pass" },
        { name: "Schema validation", result: "pass" }
      ]);
    }, 800);
  };

  // Toggle theme
  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  // Handle tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleRequestTabChange = (event, newValue) => {
    setRequestTab(newValue);
  };

  const handleResponseTabChange = (event, newValue) => {
    setResponseTab(newValue);
  };

  // Add parameter row
  const addParamRow = () => {
    setParams([...params, { key: '', value: '', enabled: true }]);
  };

  // Remove parameter row
  const removeParamRow = (index) => {
    const newParams = [...params];
    newParams.splice(index, 1);
    setParams(newParams);
  };

  // Update parameter
  const updateParam = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  // Generate code snippet based on current request
  const generateCodeSnippet = () => {
    return `// JavaScript - Fetch
fetch("${url || 'https://api.example.com'}${
  params.filter(p => p.enabled && p.key).length > 0 
    ? `?${params.filter(p => p.enabled && p.key).map(p => `${p.key}=${p.value}`).join('&')}` 
    : ''
}", {
  method: "${method}",
  headers: {
    "Content-Type": "application/json"
  }${method !== 'GET' ? ',\n  body: JSON.stringify({\n    // your data here\n  })' : ''}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));`;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LayersIcon />
              <Typography variant="h6" component="div">
                CodePulse
              </Typography>
            </Stack>
          </Toolbar>
          
          <Tabs
            value={openSidebar}
            onChange={(e, newValue) => setOpenSidebar(newValue)}
            variant="fullWidth"
          >
            <Tab label="Collections" value="collections" />
            <Tab label="History" value="history" />
          </Tabs>
          
          <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
            {openSidebar === 'collections' && (
              <List>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" size="small">
                      <AddIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemText primary="My Collections" primaryTypographyProps={{ fontWeight: 'medium' }} />
                </ListItem>
                
                <ListItemButton>
                  <ListItemIcon>
                    <ChevronRightIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="E-commerce API" />
                </ListItemButton>
                
                <ListItemButton>
                  <ListItemIcon>
                    <ChevronRightIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Authentication API" />
                </ListItemButton>
              </List>
            )}
            
            {openSidebar === 'history' && (
              <List>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" size="small">
                      <AccessTimeIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemText primary="Request History" primaryTypographyProps={{ fontWeight: 'medium' }} />
                </ListItem>
                
                {history.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemButton>
                      <Stack spacing={0.5} width="100%">
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              backgroundColor: getMethodColor(item.method) + '20',
                              color: getMethodColor(item.method),
                              px: 0.5,
                              borderRadius: 0.5,
                              mr: 1,
                              fontSize: '0.75rem',
                              fontFamily: 'monospace',
                            }}
                          >
                            {item.method}
                          </Box>
                          <Typography variant="body2" noWrap>{item.url}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="caption" color="text.secondary">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </Typography>
                          <Typography
                            variant="caption"
                            color={item.status < 300 ? 'success.main' : 'error.main'}
                          >
                            {item.status}
                          </Typography>
                        </Box>
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          
          <Box p={1} borderTop={1} borderColor="divider">
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value=""
                renderValue={() => "No Environment"}
              >
                <MenuItem value="">No Environment</MenuItem>
                <MenuItem value="dev">Development</MenuItem>
                <MenuItem value="prod">Production</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Drawer>
        
        {/* Main content */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Toolbar */}
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 100, mr: 1 }}>
                <Select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  sx={{
                    backgroundColor: getMethodColor(method) + '20',
                    color: getMethodColor(method),
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: getMethodColor(method) + '50',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: getMethodColor(method),
                    },
                  }}
                >
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                  <MenuItem value="PUT">PUT</MenuItem>
                  <MenuItem value="DELETE">DELETE</MenuItem>
                  <MenuItem value="PATCH">PATCH</MenuItem>
                  <MenuItem value="OPTIONS">OPTIONS</MenuItem>
                  <MenuItem value="HEAD">HEAD</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                placeholder="Enter request URL"
                variant="outlined"
                size="small"
                fullWidth
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              
              <Button
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                onClick={sendRequest}
                disabled={isLoading}
                sx={{ ml: 1 }}
              >
                {isLoading ? 'Loading...' : 'Send'}
              </Button>
              
              <IconButton sx={{ ml: 1 }}>
                <SaveIcon />
              </IconButton>
              
              <IconButton onClick={toggleTheme} sx={{ ml: 1 }}>
                {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          
          {/* Request/Response tabs */}
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Request" value="request" />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Response
                  {response && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        px: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        backgroundColor: response.status < 300 ? 'success.main' : 'error.main',
                        color: 'white',
                      }}
                    >
                      {response.status}
                    </Box>
                  )}
                </Box>
              }
              value="response"
            />
            <Tab label="Tests" value="tests" />
            <Tab label="Docs" value="docs" />
          </Tabs>
          
          {/* Request panel */}
          {activeTab === 'request' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
              <Tabs value={requestTab} onChange={handleRequestTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tab label="Params" value="params" />
                <Tab label="Headers" value="headers" />
                <Tab label="Body" value="body" />
                <Tab label="Auth" value="auth" />
              </Tabs>
              
              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                {requestTab === 'params' && (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell>KEY</TableCell>
                          <TableCell>VALUE</TableCell>
                          <TableCell padding="checkbox"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {params.map((param, index) => (
                          <TableRow key={index}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                size="small"
                                checked={param.enabled}
                                onChange={(e) => updateParam(index, 'enabled', e.target.checked)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="Parameter name"
                                value={param.key}
                                onChange={(e) => updateParam(index, 'key', e.target.value)}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="Value"
                                value={param.value}
                                onChange={(e) => updateParam(index, 'value', e.target.value)}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell padding="checkbox">
                              <IconButton size="small" onClick={() => removeParamRow(index)}>
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4}>
                            <Button
                              startIcon={<AddIcon />}
                              onClick={addParamRow}
                              color="primary"
                              size="small"
                            >
                              Add Parameter
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                
                {/* Other request tabs can be implemented here */}
              </Box>
            </Box>
          )}
          
          {/* Response panel */}
          {activeTab === 'response' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
              {response ? (
                <>
                  <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="span"
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: response.status < 300 ? 'success.main' : 'error.main',
                        color: 'white',
                      }}
                    >
                      Status: {response.status} {response.statusText}
                    </Box>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      Time: {responseTime}ms
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      Size: {response.body.length} bytes
                    </Typography>
                    
                    <Box sx={{ ml: 'auto' }}>
                      <IconButton size="small">
                        <CopyIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Tabs value={responseTab} onChange={handleResponseTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Body" value="body" />
                    <Tab label="Headers" value="headers" />
                    <Tab label="Cookies" value="cookies" />
                  </Tabs>
                  
                  <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                    {responseTab === 'body' && (
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          backgroundColor: 'action.hover',
                          overflow: 'auto',
                          height: '100%',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {response.body}
                      </Paper>
                    )}
                  </Box>
                </>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%',
                  color: 'text.secondary',
                }}>
                  <SendIcon sx={{ fontSize: 48, mb: 1 }} />
                  <Typography>Send a request to see the response</Typography>
                </Box>
              )}
            </Box>
          )}
          
          {/* Tests panel */}
          {activeTab === 'tests' && (
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Test Results
                  </Typography>
                  <Stack spacing={1}>
                    {testResults.map((test, index) => (
                      <Paper key={index} variant="outlined" sx={{ p: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: test.result === 'pass' ? 'success.main' : 'error.main',
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2">{test.name}</Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
                
                <Box>
                  <Typography variant="h6" gutterBottom>
                    AI Test Suggestions
                  </Typography>
                  <Stack spacing={1}>
                    {aiSuggestions.map((suggestion, index) => (
                      <Paper key={index} variant="outlined" sx={{ 
                        p: 1, 
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <Typography variant="body2" color="primary.contrastText">
                          {suggestion}
                        </Typography>
                        <Button 
                          size="small" 
                          variant="contained"
                          color="primary"
                        >
                          Add
                        </Button>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
                
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Test Script
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={testScript}
                    onChange={(e) => setTestScript(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      style: { fontFamily: 'monospace', fontSize: '0.875rem' }
                    }}
                  />
                </Box>
              </Stack>
            </Box>
          )}
          
          {/* Docs panel */}
          {activeTab === 'docs' && (
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">API Documentation</Typography>
                <Button variant="contained" color="primary" size="small">
                  Generate Docs
                </Button>
              </Box>
              
              <Paper sx={{ 
                p: 2, 
                mb: 3, 
                backgroundColor: 'primary.light', 
                color: 'primary.contrastText' 
              }} variant="outlined">
                <Typography>
                  <strong>AI-Powered Documentation:</strong> CodePulse can automatically generate
                  documentation based on your requests and responses. Send a request to get started.
                </Typography>
              </Paper>
              
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {method} {url || '/example/endpoint'}
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      DESCRIPTION
                    </Typography>
                    <Typography variant="body2">
                      This endpoint returns example data from the API server.
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      PARAMETERS
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Required</TableCell>
                            <TableCell>Description</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>Yes</TableCell>
                            <TableCell>Unique identifier for the resource</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>filter</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>No</TableCell>
                            <TableCell>Filter results by this value</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      RESPONSE
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        backgroundColor: 'action.hover',
                      }}
                    >
{`{
  "success": true,
  "message": "Response from CodePulse",
  "method": "GET",
  "url": "/example/endpoint"
}`}
                    </Paper>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
        
        {/* Code generation panel (drawer) */}
        <Drawer
          anchor="right"
          open={showDocs}
          onClose={() => setShowDocs(false)}
          variant="persistent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Code Generator</Typography>
              <IconButton size="small" onClick={() => setShowDocs(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Language</InputLabel>
              <Select defaultValue="javascript" label="Language">
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="curl">Curl</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="csharp">C#</MenuItem>
                <MenuItem value="php">PHP</MenuItem>
                <MenuItem value="ruby">Ruby</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Framework</InputLabel>
              <Select defaultValue="fetch" label="Framework">
                <MenuItem value="fetch">Fetch</MenuItem>
                <MenuItem value="axios">Axios</MenuItem>
                <MenuItem value="jquery">jQuery</MenuItem>
                <MenuItem value="xhr">XHR</MenuItem>
              </Select>
            </FormControl>
            
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                backgroundColor: 'action.hover',
                maxHeight: 300,
                overflow: 'auto',
                mb: 1,
              }}
            >
              {generateCodeSnippet()}
            </Paper>
            
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<CopyIcon />}
            >
              Copy Code
            </Button>
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default CodePulse;