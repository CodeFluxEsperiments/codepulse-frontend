import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Grid,
  Button,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { updateAuth } from '../../../store/slices/requestSlice';

const Auth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.request.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const handleAuthTypeChange = (event) => {
    dispatch(updateAuth({
      ...auth,
      type: event.target.value
    }));
  };

  const handleAuthFieldChange = (field, value) => {
    dispatch(updateAuth({
      ...auth,
      [field]: value
    }));
  };

  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="auth-type-label">Authorization Type</InputLabel>
        <Select
          labelId="auth-type-label"
          value={auth.type}
          label="Authorization Type"
          onChange={handleAuthTypeChange}
        >
          <MenuItem value="none">No Auth</MenuItem>
          <MenuItem value="basic">Basic Auth</MenuItem>
          <MenuItem value="bearer">Bearer Token</MenuItem>
          <MenuItem value="oauth2">OAuth 2.0</MenuItem>
          <MenuItem value="apikey">API Key</MenuItem>
        </Select>
      </FormControl>

      <Divider sx={{ my: 2 }} />

      {auth.type === 'basic' && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Username"
              value={auth.username || ''}
              onChange={(e) => handleAuthFieldChange('username', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={auth.password || ''}
              onChange={(e) => handleAuthFieldChange('password', e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
          </Grid>
          {auth.username && auth.password && (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Generated Header:</Typography>
              <Box sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1, fontFamily: 'monospace' }}>
                {`Authorization: Basic ${btoa(`${auth.username}:${auth.password}`)}`}
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {auth.type === 'bearer' && (
        <Box>
          <TextField
            fullWidth
            label="Token"
            value={auth.token || ''}
            onChange={(e) => handleAuthFieldChange('token', e.target.value)}
            type={showToken ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <IconButton 
                  onClick={() => setShowToken(!showToken)}
                  edge="end"
                  size="small"
                >
                  {showToken ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
            }}
          />
          {auth.token && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Generated Header:</Typography>
              <Box sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1, fontFamily: 'monospace' }}>
                {`Authorization: Bearer ${auth.token}`}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {auth.type === 'oauth2' && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            OAuth 2.0 Configuration
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Token URL"
                value={auth.tokenUrl || ''}
                onChange={(e) => handleAuthFieldChange('tokenUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Client ID"
                value={auth.clientId || ''}
                onChange={(e) => handleAuthFieldChange('clientId', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Client Secret"
                type={showPassword ? 'text' : 'password'}
                value={auth.clientSecret || ''}
                onChange={(e) => handleAuthFieldChange('clientSecret', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton 
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary"
                disabled={!auth.tokenUrl || !auth.clientId || !auth.clientSecret}
              >
                Get New Access Token
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {auth.type === 'apikey' && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Key"
              value={auth.apiKeyName || ''}
              onChange={(e) => handleAuthFieldChange('apiKeyName', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Value"
              value={auth.apiKeyValue || ''}
              onChange={(e) => handleAuthFieldChange('apiKeyValue', e.target.value)}
              type={showToken ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <IconButton 
                    onClick={() => setShowToken(!showToken)}
                    edge="end"
                    size="small"
                  >
                    {showToken ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="apikey-location-label">Add to</InputLabel>
              <Select
                labelId="apikey-location-label"
                value={auth.apiKeyLocation || 'header'}
                label="Add to"
                onChange={(e) => handleAuthFieldChange('apiKeyLocation', e.target.value)}
              >
                <MenuItem value="header">Header</MenuItem>
                <MenuItem value="query">Query Parameter</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {auth.apiKeyName && auth.apiKeyValue && (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Will be added as:</Typography>
              <Box sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1, fontFamily: 'monospace' }}>
                {auth.apiKeyLocation === 'header' 
                  ? `${auth.apiKeyName}: ${auth.apiKeyValue}` 
                  : `?${auth.apiKeyName}=${auth.apiKeyValue}`}
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Auth;

