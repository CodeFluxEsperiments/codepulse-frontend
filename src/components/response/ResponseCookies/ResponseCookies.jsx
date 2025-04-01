// src/components/response/ResponseCookies/ResponseCookies.jsx
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
  Chip
} from '@mui/material';

const ResponseCookies = ({ cookies }) => {
  if (!cookies || cookies.length === 0) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography color="textSecondary">No cookies found</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '100%', boxShadow: 'none' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Attributes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cookies.map((cookie, index) => (
            <TableRow key={index} hover>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                {cookie.name}
              </TableCell>
              <TableCell sx={{ fontFamily: 'monospace', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {cookie.value}
              </TableCell>
              <TableCell>{cookie.domain || '-'}</TableCell>
              <TableCell>{cookie.path || '/'}</TableCell>
              <TableCell>
                {cookie.expires ? new Date(cookie.expires).toLocaleString() : 'Session'}
              </TableCell>
              <TableCell>
                {cookie.httpOnly && <Chip label="HttpOnly" size="small" sx={{ mr: 0.5, mb: 0.5 }} />}
                {cookie.secure && <Chip label="Secure" size="small" sx={{ mr: 0.5, mb: 0.5 }} />}
                {cookie.sameSite && <Chip label={`SameSite: ${cookie.sameSite}`} size="small" sx={{ mb: 0.5 }} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResponseCookies;