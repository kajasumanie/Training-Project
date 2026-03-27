import { Button, Checkbox, FormControlLabel, Grid2, Link, Paper, TextField, Typography, Fade, Container, Box } from "@mui/material";
import Logo from '../../shared/Logo/Logo';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAuthStatus } from "../../store/slices/authSlice";
import { styled } from '@mui/material/styles';

interface LoginFormProps {
    setTabValue: React.Dispatch<React.SetStateAction<number>>;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px 0 rgba(233, 30, 99, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 12px 48px 0 rgba(233, 30, 99, 0.3)',
    },
}));



const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.8),
    borderRadius: '50px',
    textTransform: 'none',
    fontSize: '1.1rem',
    fontWeight: 700,
    background: 'linear-gradient(45deg, #E91E63 30%, #FF4081 90%)',
    boxShadow: '0 4px 20px rgba(233, 30, 99, 0.4)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 28px rgba(233, 30, 99, 0.5)',
        background: 'linear-gradient(45deg, #C2185B 30%, #F50057 90%)',
    },
}));

const LoginForm: React.FC<LoginFormProps> = ({ setTabValue }) => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    return (
        <Container component="main" maxWidth="xs">
            <Fade in timeout={1000}>
                <StyledPaper elevation={6}>
                    <Box sx={{ mb: 2 }}>
                        <Logo variant="large" />
                    </Box>
                    <Typography component="h1" variant="h4" sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        background: 'linear-gradient(45deg, #E91E63 30%, #FF4081 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Welcome Back 💕
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Sign in to continue shopping
                    </Typography>
                    <Formik
                        initialValues={{ email: '', password: '', remember: false }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            login(values).unwrap().then(() => {
                                dispatch(updateAuthStatus(true));
                                navigate('/')
                            }).catch(err => console.log(err));
                        }}
                    >
                        {({ touched, errors }) => (
                            <Form noValidate style={{ width: '100%' }}>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    error={touched.email && !!errors.email}
                                    helperText={(touched.email && !!errors.email) ? errors.email : ''}
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                            backdropFilter: 'blur(10px)',
                                            '& fieldset': {
                                                borderColor: 'rgba(233, 30, 99, 0.3)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#E91E63',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#E91E63',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    helperText={(touched.password && !!errors.password) ? errors.password : ''}
                                    error={touched.password && !!errors.password}
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                            backdropFilter: 'blur(10px)',
                                            '& fieldset': {
                                                borderColor: 'rgba(233, 30, 99, 0.3)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#E91E63',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#E91E63',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                                <Grid2 container alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
                                    <FormControlLabel
                                        control={<Checkbox name="remember" color="primary" />}
                                        label="Remember me"
                                        sx={{ '& .MuiCheckbox-root': { color: 'primary.main' } }}
                                    />
                                    <Link variant="body2" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                        Forgot password?
                                    </Link>
                                </Grid2>
                                <StyledButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign In
                                </StyledButton>
                                <Grid2 container justifyContent="center">
                                    <Typography variant="body2" color="text.secondary">
                                        Don't have an account?{' '}
                                        <Link 
                                            component="button"
                                            variant="body2"
                                            onClick={() => setTabValue(1)}
                                            sx={{ 
                                                color: 'primary.main',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                }
                                            }}
                                        >
                                            Sign Up
                                        </Link>
                                    </Typography>
                                </Grid2>
                            </Form>
                        )}
                    </Formik>
                </StyledPaper>
            </Fade>
        </Container>
    );
};

export default LoginForm;