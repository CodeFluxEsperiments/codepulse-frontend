import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton
} from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';

const ResponseHeaders = ({ headers }) => {
  if (!headers || Object.keys(headers).length === 0) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography color="textSecondary">No headers found</Typography>
      </Box>
    );
  }

  const handleCopyHeader = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '100%', boxShadow: 'none' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
            <TableCell padding="checkbox"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(headers).map(([key, value]) => (
            <TableRow key={key} hover>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                {key}
              </TableCell>
              <TableCell sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{value}</TableCell>
              <TableCell padding="checkbox">
                <IconButton size="small" onClick={() => handleCopyHeader(value)}>
                  <CopyIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResponseHeaders;