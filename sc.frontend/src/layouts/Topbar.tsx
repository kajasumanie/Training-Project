import { Badge, Button, IconButton, styled, Toolbar, Typography, Box } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLogOutMutation } from "../api/authApi";
import { updateAuthStatus } from "../store/slices/authSlice";
import CartPopover from "../features/cart/CartPopover";
import { useState } from "react";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Topbar = ({ open, onDrawerOpen }: any) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderItemsCount = useSelector((state: RootState) => state.shoppingCart.items.length);
  const [logOut] = useLogOutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerOpen = () => {
    onDrawerOpen(true);
  };

  const handleLogout = () => {
    navigate('/login');
    dispatch(updateAuthStatus(false));
    logOut();
    sessionStorage.clear();
  };

  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" open={open} >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 0,
            fontWeight: 700,
            color: 'white',
            fontSize: '1.5rem',
            background: 'linear-gradient(45deg, #FFB6C1, #FFC0CB, #FFE4E1)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px',
          }}
        >
          💖 Sumanie's Shop
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} >
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={orderItemsCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Button color="primary" variant="outlined" style={{ color: 'white' }} onClick={handleLogout} >Logout</Button>
        </div>
      </Toolbar>
      <CartPopover 
        anchorEl={anchorEl} 
        onClose={handleCartClose}
      />
    </AppBar>
  );
};

export default Topbar;
