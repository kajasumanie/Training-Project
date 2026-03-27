import { Button, Checkbox, FormControlLabel, Grid2, Link, Paper, TextField, Typography, Fade, Container, Box } from "@mui/material";
import Logo from '../../shared/Logo/Logo';
import * as Yup from 'yup';
import { Field, Form, Formik } from "formik";
import { useRegisterMutation } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
}));



const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
    borderRadius: '25px',
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
}));

const RegisterForm: React.FC<any> = () => {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        mobile: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile number is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    return (
        <Container component="main" maxWidth="xs">
            <Fade in timeout={1000}>
                <StyledPaper elevation={6}>
                    <Box sx={{ mb: 2 }}>
                        <Logo variant="large" />
                    </Box>
                    <Typography component="h1" variant="h4" sx={{ 
                        fontWeight: 600, 
                        mb: 3,
                        background: 'linear-gradient(45deg, #E91E63 30%, #FF4081 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Create Account 💖
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Join Sumanie's Shop and start shopping today
                    </Typography>
                    <Formik
                        initialValues={{ 
                            email: '', 
                            mobile: '', 
                            password: '', 
                            confirmPassword: '', 
                            remember: false 
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            register(values).unwrap().then(res => {
                                sessionStorage.setItem('access_token', JSON.stringify(res.accessToken));
                                navigate('/');
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
                                            borderRadius: '12px',
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
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
                                    id="mobile"
                                    label="Mobile Number"
                                    name="mobile"
                                    placeholder="Enter 10 digit mobile number"
                                    error={touched.mobile && !!errors.mobile}
                                    helperText={(touched.mobile && !!errors.mobile) ? errors.mobile : ''}
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
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
                                    autoComplete="new-password"
                                    helperText={(touched.password && !!errors.password) ? errors.password : ''}
                                    error={touched.password && !!errors.password}
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
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
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    helperText={(touched.confirmPassword && !!errors.confirmPassword) ? errors.confirmPassword : ''}
                                    error={touched.confirmPassword && !!errors.confirmPassword}
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                        },
                                    }}
                                />
                                <Grid2 container alignItems="center" sx={{ mt: 1 }}>
                                    <FormControlLabel
                                        control={<Checkbox name="remember" color="primary" />}
                                        label="I agree to the Terms and Conditions"
                                        sx={{ '& .MuiCheckbox-root': { color: 'primary.main' } }}
                                    />
                                </Grid2>
                                <StyledButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Create Account
                                </StyledButton>
                                <Grid2 container justifyContent="center">
                                    <Typography variant="body2" color="text.secondary">
                                        Already have an account?{' '}
                                        <Link 
                                            component="button"
                                            variant="body2"
                                            onClick={() => navigate('/login')}
                                            sx={{ 
                                                color: 'primary.main',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                }
                                            }}
                                        >
                                            Sign In
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

export default RegisterForm;