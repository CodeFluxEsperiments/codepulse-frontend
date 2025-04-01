import React, { useState } from 'react';
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
import { updateParams } from '../../../store/slices/requestSlice';

const Params = () => {
  const dispatch = useDispatch();
  const params = useSelector((state) => state.request.params);
  
  const handleKeyChange = (index, value) => {
    const updatedParams = [...params];
    updatedParams[index] = { ...updatedParams[index], key: value };
    dispatch(updateParams(updatedParams));
  };
  
  const handleValueChange = (index, value) => {
    const updatedParams = [...params];
    updatedParams[index] = { ...updatedParams[index], value: value };
    dispatch(updateParams(updatedParams));
  };
  
  const handleEnabledChange = (index) => {
    const updatedParams = [...params];
    updatedParams[index] = { ...updatedParams[index], enabled: !updatedParams[index].enabled };
    dispatch(updateParams(updatedParams));
  };
  
  const handleDelete = (index) => {
    const updatedParams = [...params];
    updatedParams.splice(index, 1);
    dispatch(updateParams(updatedParams));
  };
  
  const handleAddParam = () => {
    dispatch(updateParams([...params, { key: '', value: '', enabled: true }]));
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
            {params.map((param, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={param.enabled}
                    onChange={() => handleEnabledChange(index)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    value={param.key}
                    onChange={(e) => handleKeyChange(index, e.target.value)}
                    placeholder="Parameter name"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    value={param.value}
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
        onClick={handleAddParam}
        sx={{ mt: 2 }}
        color="primary"
      >
        Add Parameter
      </Button>
      
      {params.length > 0 && params.some(p => p.key && p.value) && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle2">Query string:</Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            ?{params.filter(p => p.enabled && p.key).map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Params;