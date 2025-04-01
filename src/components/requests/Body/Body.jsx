// src/components/request/Body/Body.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Typography,
  Paper
} from '@mui/material';
import { updateRequestBody, updateContentType } from '../../../store/slices/requestSlice';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CONTENT_TYPES = {
  JSON: 'application/json',
  XML: 'application/xml',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
  TEXT: 'text/plain'
};

const Body = () => {
  const dispatch = useDispatch();
  const { body, contentType } = useSelector((state) => state.request);
  const [bodyType, setBodyType] = useState('json');
  const [jsonError, setJsonError] = useState(null);

  const handleBodyTypeChange = (event, newBodyType) => {
    if (newBodyType !== null) {
      setBodyType(newBodyType);
      switch (newBodyType) {
        case 'json':
          dispatch(updateContentType(CONTENT_TYPES.JSON));
          break;
        case 'xml':
          dispatch(updateContentType(CONTENT_TYPES.XML));
          break;
        case 'form':
          dispatch(updateContentType(CONTENT_TYPES.FORM));
          break;
        case 'multipart':
          dispatch(updateContentType(CONTENT_TYPES.MULTIPART));
          break;
        case 'text':
          dispatch(updateContentType(CONTENT_TYPES.TEXT));
          break;
        default:
          break;
      }
    }
  };

  const handleBodyChange = (event) => {
    const newBody = event.target.value;
    dispatch(updateRequestBody(newBody));
    
    // Validate JSON if body type is json
    if (bodyType === 'json' && newBody.trim()) {
      try {
        JSON.parse(newBody);
        setJsonError(null);
      } catch (e) {
        setJsonError(e.message);
      }
    } else {
      setJsonError(null);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={bodyType}
          exclusive
          onChange={handleBodyTypeChange}
          size="small"
        >
          <ToggleButton value="json">JSON</ToggleButton>
          <ToggleButton value="xml">XML</ToggleButton>
          <ToggleButton value="form">Form</ToggleButton>
          <ToggleButton value="multipart">Multipart</ToggleButton>
          <ToggleButton value="text">Text</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Request Body"
          multiline
          rows={12}
          value={body}
          onChange={handleBodyChange}
          variant="outlined"
          placeholder={
            bodyType === 'json' 
              ? '{\n  "key": "value"\n}'
              : bodyType === 'xml'
                ? '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <element>value</element>\n</root>'
                : ''
          }
          error={!!jsonError}
          helperText={jsonError}
          InputProps={{
            sx: { fontFamily: 'monospace' }
          }}
        />
      </FormControl>
      
      {bodyType === 'json' && body && !jsonError && (
        <Paper elevation={1} sx={{ p: 2, mb: 2, maxHeight: 200, overflow: 'auto' }}>
          <Typography variant="subtitle2" gutterBottom>Formatted Preview:</Typography>
          <SyntaxHighlighter language="json" style={docco}>
            {JSON.stringify(JSON.parse(body), null, 2)}
          </SyntaxHighlighter>
        </Paper>
      )}

      <Box>
        <Typography variant="caption" color="textSecondary">
          Content-Type: {contentType}
        </Typography>
      </Box>
    </Box>
  );
};

export default Body;