

// src/components/request/Headers/Headers.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  IconButton,
  Button,
  Box,
  Typography
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { updateHeaders } from '../../../store/slices/requestSlice';

const Headers = () => {
  const dispatch = useDispatch();
  const headers = useSelector((state) => state.request.headers);

  const handleKeyChange = (index, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = { ...updatedHeaders[index], key: value };
    dispatch(updateHeaders(updatedHeaders));
  };

  const handleValueChange = (index, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = { ...updatedHeaders[index], value: value };
    dispatch(updateHeaders(updatedHeaders));
  };

  const handleEnabledChange = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = { ...updatedHeaders[index], enabled: !updatedHeaders[index].enabled };
    dispatch(updateHeaders(updatedHeaders));
  };

  const handleDelete = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    dispatch(updateHeaders(updatedHeaders));
  };

  const handleAddHeader = () => {
    dispatch(updateHeaders([...headers, { key: '', value: '', enabled: true }]));
  };

  return (
    <Box>
      <TableContainer>
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
            {headers.map((header, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={header.enabled}
                    onChange={() => handleEnabledChange(index)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    value={header.key}
                    onChange={(e) => handleKeyChange(index, e.target.value)}
                    placeholder="Header name"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    value={header.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    placeholder="Value"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell padding="checkbox">
                  <IconButton size="small" onClick={() => handleDelete(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        startIcon={<AddIcon />}
        onClick={handleAddHeader}
        sx={{ mt: 2 }}
        color="primary"
      >
        Add Header
      </Button>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(updateHeaders([
            ...headers,
            { key: 'Content-Type', value: 'application/json', enabled: true }
          ]))}
          sx={{ mr: 1, mb: 1 }}
        >
          Add Content-Type: JSON
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(updateHeaders([
            ...headers,
            { key: 'Authorization', value: 'Bearer ', enabled: true }
          ]))}
          sx={{ mr: 1, mb: 1 }}
        >
          Add Authorization
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(updateHeaders([
            ...headers,
            { key: 'Accept', value: 'application/json', enabled: true }
          ]))}
          sx={{ mb: 1 }}
        >
          Add Accept: JSON
        </Button>
      </Box>
    </Box>
  );
};

export default Headers;