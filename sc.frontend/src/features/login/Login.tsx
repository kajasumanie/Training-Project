import { Box, Grid2, Tab, Tabs, Fade, keyframes } from "@mui/material";
import LoginForm from "./LoginForm";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import { styled } from '@mui/material/styles';

const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const StyledGrid = styled(Grid2)(() => ({
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(-45deg, #FFE5EC, #FFF0F5, #FFE5EC, #FFB6C1)',
    backgroundSize: '400% 400%',
    animation: `${gradientAnimation} 15s ease infinite`,
}));

const RightPanel = styled(Box)(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    position: 'relative',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50px',
    padding: theme.spacing(0.5),
    '& .MuiTabs-indicator': {
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        borderRadius: '50px',
        zIndex: 0,
    },
    '& .MuiTab-root': {
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        minHeight: 50,
        zIndex: 1,
        color: '#666',
        '&.Mui-selected': {
            color: '#fff',
        },
    },
}));

const Login: React.FC<any> = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyledGrid container>
            <Grid2 size={12}>
                <RightPanel>
                    <Fade in timeout={1200}>
                        <Box sx={{ width: '100%', maxWidth: 650 }}>
                            <StyledTabs 
                                value={value} 
                                onChange={handleChange} 
                                variant="fullWidth"
                            >
                                <Tab label="Sign In" />
                                <Tab label="Create Account" />
                            </StyledTabs>
                            {value === 0 && <LoginForm setTabValue={setValue} />}
                            {value === 1 && <RegisterForm />}
                        </Box>
                    </Fade>
                </RightPanel>
            </Grid2>
        </StyledGrid>
    );
};

export default Login;