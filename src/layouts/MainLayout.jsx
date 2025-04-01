import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Box, useMediaQuery, useTheme } from "@mui/material"
// Uncomment these when you have the components ready
import Header from '../components/common/Header/Header';
import Sidebar from '../components/common/Sidebar/Sidebar';

const MainLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [openSidebar, setOpenSidebar] = useState(!isMobile)

  const handleSidebarToggle = () => {
    setOpenSidebar(!openSidebar)
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Uncomment when you have the Sidebar component ready */}
      <Sidebar open={openSidebar} onClose={handleSidebarToggle} variant={isMobile ? 'temporary' : 'permanent'} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Uncomment when you have the Header component ready */}
        <Header onSidebarToggle={handleSidebarToggle} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
    // <>Main</>
  )
}

export default MainLayout;

