import {
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  useTheme,
} from "@mui/material";
import {
  CalculateOutlined,
  ChevronRight,
  Home,
  ShoppingBag,
  ChevronLeft,
} from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer/Drawer";
import { useNavigate } from "react-router-dom";
import Logo from "../shared/Logo/Logo";
import { Box } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SideNav = ({ open, onDrawerClose }: any) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    onDrawerClose(false);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box
          onClick={() => {
            navigate(`/`);
          }}
          sx={{ cursor: 'pointer', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Logo variant={open ? "default" : "small"} showIcon={open} />
        </Box>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key={'Home'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              navigate(`/`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Products'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              navigate(`/products`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <ShoppingBag />
            </ListItemIcon>
            <ListItemText primary={"Products"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Orders'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            onClick={() => {
              navigate(`/orders`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <CalculateOutlined />
            </ListItemIcon>
            <ListItemText primary={"Orders"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;
