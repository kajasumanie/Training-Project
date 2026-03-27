import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import TopBar from "./Topbar";
import { Suspense, useState } from "react";
import { styled, Box } from "@mui/material";
import Footer from "../shared/Footer/Footer";
import Loader from "../shared/Loader/Loader";

const drawerWidth = 240;

const PageContainer = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: 64,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <SideNav open={open} onDrawerOpen={handleDrawerOpen} onDrawerClose={handleDrawerClose} />

      <PageContainer open={open} id="page-content-wrapper">
        <TopBar open={open} onDrawerOpen={handleDrawerOpen} />
        <Suspense fallback={<Loader/>}>
          <Outlet />
        </Suspense>
        <Footer />
      </PageContainer>
    </Box>
  );
};

export default DashboardLayout;
