import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
  Collections as CollectionsIcon,
  FolderOpen,
  Add as AddIcon
} from '@mui/icons-material';

const drawerWidth = 280;

const Sidebar = ({ open, onClose, variant }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCollectionsClick = () => {
    setCollectionsOpen(!collectionsOpen);
  };

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <CodeIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6" color="primary">CodePulse</Typography>
        </Box>
        {variant === 'temporary' && (
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider />
      
      <List component="nav">
        <ListItem button component={NavLink} to="/" exact>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        
        <ListItem button component={NavLink} to="/api-client">
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="API Client" />
        </ListItem>
        
        <ListItem button onClick={handleCollectionsClick}>
          <ListItemIcon>
            <CollectionsIcon />
          </ListItemIcon>
          <ListItemText primary="Collections" />
          {collectionsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={collectionsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemIcon>
                <FolderOpen fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="E-commerce API" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }}>
              <ListItemIcon>
                <FolderOpen fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Authentication API" />
            </ListItem>
            <ListItem button sx={{ pl: 4, color: 'primary.main' }}>
              <ListItemIcon>
                <AddIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="New Collection" />
            </ListItem>
          </List>
        </Collapse>
        
        <ListItem button component={NavLink} to="/history">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        
        <ListItem button component={NavLink} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      
      <Divider sx={{ mt: 'auto' }} />
      
      <Box sx={{ p: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Collections" />
          <Tab label="Environment" />
        </Tabs>
        
        {selectedTab === 0 && (
          <Box sx={{ p: 1, mt: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Manage your request collections and folders
            </Typography>
          </Box>
        )}
        
        {selectedTab === 1 && (
          <Box sx={{ p: 1, mt: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Configure environment variables
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;