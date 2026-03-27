import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectCurrentTheme } from "./appSlice";
import ErrorBoundary from "./shared/ErrorBoundary/ErrorBoundary";
import AppRoutes from "./routes/routes";
import { useAppSelector } from "./store/hooks";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setLoginRedirect } from "./store/slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Main Application Component
 * Handles theming, routing, and authentication redirects
 * @author Kaja
 */

function App() {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const requiresLogin = useSelector((state: RootState)=> state.userAuth.requiresLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Beautiful pink theme with modern styling
  const appTheme = createTheme({
    palette: {
      mode: currentTheme,
      primary: {
        main: currentTheme === 'dark' ? '#FF4081' : '#E91E63',
        contrastText: '#fff',
      },
      secondary: {
        main: currentTheme === 'dark' ? '#FFB74D' : '#FF9800',
        contrastText: '#fff',
      },
      background: {
        default: currentTheme === 'dark' ? '#1a0a1a' : '#FFF0F5',
        paper: currentTheme === 'dark' ? '#2d1a2d' : '#ffffff',
      },
      text: {
        primary: currentTheme === 'dark' ? '#fff' : '#333',
        secondary: currentTheme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      h1: { fontWeight: 700, fontSize: '2.5rem' },
      h2: { fontWeight: 700, fontSize: '2rem' },
      h3: { fontWeight: 600, fontSize: '1.75rem' },
      h4: { fontWeight: 600, fontSize: '1.5rem' },
      h5: { fontWeight: 500, fontSize: '1.25rem' },
      h6: { fontWeight: 500, fontSize: '1rem' },
      body1: { fontSize: '1rem', lineHeight: 1.7 },
      body2: { fontSize: '0.875rem', lineHeight: 1.6 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            padding: '10px 24px',
            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(233, 30, 99, 0.3)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: currentTheme === 'dark' 
              ? '0 8px 24px rgba(0,0,0,0.4)' 
              : '0 4px 16px rgba(233, 30, 99, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: currentTheme === 'dark'
                ? '0 12px 32px rgba(0,0,0,0.5)'
                : '0 8px 24px rgba(233, 30, 99, 0.2)',
              transform: 'translateY(-4px)',
            },
          },
        },
      },
    },
  });

  // Handle authentication redirect
  useEffect(() => {
    if (requiresLogin) {
      navigate('/login');
      dispatch(setLoginRedirect(false));
    }
  }, [requiresLogin, navigate, dispatch]);
  
  return (
    <ThemeProvider theme={appTheme}>
      <ErrorBoundary>
          <div className="App">
            <CssBaseline />
            <AppRoutes />
          </div>
          <ToastContainer />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;