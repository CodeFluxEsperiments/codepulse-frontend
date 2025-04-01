// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Box, TextField, Button, Typography } from '@mui/material';
// import { updateTestScript } from '../../../store/slices/requestSlice';

// // Example test templates
// const TEST_TEMPLATES = {
//   statusCode: `// Check status code
// pm.test("Status code is 200", function() {
//   pm.response.to.have.status(200);
// });`,
//   responseTime: `// Check response time
// pm.test("Response time is less than 200ms", function() {
//   pm.expect(pm.response.responseTime).to.be.below(200);
// });`,
//   jsonBody: `// Check JSON response property
// pm.test("Response has expected property", function() {
//   var jsonData = pm.response.json();
//   pm.expect(jsonData).to.have.property('id');
// });`,
//   headerCheck: `// Check response header
// pm.test("Content-Type header is present", function() {
//   pm.response.to.have.header("Content-Type");
// });`
// };

// const TestScript = () => {
//   const dispatch = useDispatch();
//   const testScript = useSelector((state) => state.request.testScript);

//   const handleTestScriptChange = (event) => {
//     dispatch(updateTestScript(event.target.value));
//   };

//   const insertTemplate = (template) => {
//     const newScript = testScript 
//       ? `${testScript}\n\n${TEST_TEMPLATES[template]}`
//       : TEST_TEMPLATES[template];
    
//     dispatch(updateTestScript(newScript));
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="caption" color="textSecondary" gutterBottom display="block">
//           Add test template:
//         </Typography>
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//           <Button 
//             size="small" 
//             variant="outlined" 
//             onClick={() => insertTemplate('statusCode')}
//           >
//             Status Code
//           </Button>
//           <Button 
//             size="small" 
//             variant="outlined" 
//             onClick={() => insertTemplate('responseTime')}
//           >
//             Response Time
//           </Button>
//           <Button 
//             size="small" 
//             variant="outlined" 
//             onClick={() => insertTemplate('jsonBody')}
//           >
//             JSON Body
//           </Button>
//           <Button 
//             size="small" 
//             variant="outlined" 
//             onClick={() => insertTemplate('headerCheck')}
//           >
//             Header Check
//           </Button>
//         </Box>
//       </Box>

//       <TextField
//         fullWidth
//         multiline
//         rows={16}
//         value={testScript}
//         onChange={handleTestScriptChange}
//         variant="outlined"
//         placeholder="Write your test script here..."
//         InputProps={{
//           sx: { fontFamily: 'monospace', flexGrow: 1 }
//         }}
//         sx={{ flexGrow: 1 }}
//       />

//       <Box sx={{ mt: 2 }}>
//         <Typography