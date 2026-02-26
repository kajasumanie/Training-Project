import React, { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Divider,
    Stepper,
    Step,
    StepLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Alert,
    Snackbar,
    InputAdornment,
    IconButton,
    useTheme,
    alpha
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { emptyCart } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, ShoppingCart, LocalShipping, Payment } from '@mui/icons-material';
import { useAddOrderMutation } from '../../api/ordersApi';
import { OrderItemPayload } from '../../models/orders';

const steps = ['Shipping Details', 'Payment Method', 'Review Order'];

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

const StyledButton = styled(Button)(() => ({
    borderRadius: '25px',
    textTransform: 'none',
    padding: '10px 24px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
}));

interface CardDetails {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

const Checkout: React.FC = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.shoppingCart.items);
    const [activeStep, setActiveStep] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showCvv, setShowCvv] = useState(false);
    const [addOrder] = useAddOrderMutation();

    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState<CardDetails>({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleShippingDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingDetails({
            ...shippingDetails,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format card number with spaces
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        // Format expiry date
        else if (name === 'expiryDate') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d{0,2})/, '$1/$2')
                .substr(0, 5);
        }
        // Format CVV
        else if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').substr(0, 3);
        }

        setCardDetails({
            ...cardDetails,
            [name]: formattedValue
        });
    };

    const validateCardDetails = () => {
        if (paymentMethod === 'card') {
            if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
                return 'Please enter a valid 16-digit card number';
            }
            if (!cardDetails.cardName) {
                return 'Please enter the name on card';
            }
            if (!cardDetails.expiryDate || !/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
                return 'Please enter a valid expiry date (MM/YY)';
            }
            if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
                return 'Please enter a valid 3-digit CVV';
            }
        }
        return '';
    };

    const handleNext = () => {
        if (activeStep === 0) {
            // Validate shipping details
            if (!shippingDetails.fullName || !shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode || !shippingDetails.phone) {
                setError('Please fill in all shipping details');
                return;
            }
        } else if (activeStep === 1) {
            // Validate payment details
            const cardError = validateCardDetails();
            if (cardError) {
                setError(cardError);
                return;
            }
        }
        setError('');
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handlePlaceOrder = async () => {
        try {
            const orderItems: OrderItemPayload[] = cartItems.map(item => ({
                id: item.product.id,
                quantity: item.quantity
            }));

            // Create the order using the API
            await addOrder({ orderItems }).unwrap();
            
            dispatch(emptyCart());
            setShowSuccess(true);
            
            setTimeout(() => {
                navigate('/orders');
            }, 2000);
        } catch (err) {
            setError('Failed to place order. Please try again.');
        }
    };

    const total = cartItems.reduce(
        (sum, item) => sum + (item.product.price || 0) * item.quantity,
        0
    );

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocalShipping sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                                    Shipping Information
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                required
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={shippingDetails.fullName}
                                onChange={handleShippingDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                required
                                fullWidth
                                label="Address"
                                name="address"
                                value={shippingDetails.address}
                                onChange={handleShippingDetailsChange}
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                required
                                fullWidth
                                label="City"
                                name="city"
                                value={shippingDetails.city}
                                onChange={handleShippingDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                required
                                fullWidth
                                label="Postal Code"
                                name="postalCode"
                                value={shippingDetails.postalCode}
                                onChange={handleShippingDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                required
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                value={shippingDetails.phone}
                                onChange={handleShippingDetailsChange}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Payment sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                                Payment Method
                            </Typography>
                        </Box>
                        <FormControl component="fieldset" sx={{ mb: 3 }}>
                            <RadioGroup
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                            >
                                <FormControlLabel
                                    value="card"
                                    control={<Radio />}
                                    label="Card Payment (Credit/Debit)"
                                    sx={{
                                        '& .MuiFormControlLabel-label': {
                                            fontSize: '1rem',
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    value="cod"
                                    control={<Radio />}
                                    label="Cash on Delivery"
                                    sx={{
                                        '& .MuiFormControlLabel-label': {
                                            fontSize: '1rem',
                                        },
                                    }}
                                />
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'card' && (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        label="Card Number"
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleCardDetailsChange}
                                        placeholder="1234 5678 9012 3456"
                                        inputProps={{ maxLength: 19 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        label="Name on Card"
                                        name="cardName"
                                        value={cardDetails.cardName}
                                        onChange={handleCardDetailsChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        label="Expiry Date"
                                        name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleCardDetailsChange}
                                        placeholder="MM/YY"
                                        inputProps={{ maxLength: 5 }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        label="CVV"
                                        name="cvv"
                                        type={showCvv ? 'text' : 'password'}
                                        value={cardDetails.cvv}
                                        onChange={handleCardDetailsChange}
                                        inputProps={{ maxLength: 3 }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowCvv(!showCvv)}
                                                        edge="end"
                                                    >
                                                        {showCvv ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                            Order Summary
                        </Typography>
                        {cartItems.map((item) => (
                            <Box key={item.product.id} sx={{ 
                                mb: 2, 
                                p: 2, 
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                borderRadius: 1
                            }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                    {item.product.title} x {item.quantity}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    LKR {Number(item.product.price || 0).toFixed(2)} each
                                </Typography>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                            Shipping Details
                        </Typography>
                        <Box sx={{ 
                            p: 2, 
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: 1
                        }}>
                            <Typography variant="body1">
                                {shippingDetails.fullName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {shippingDetails.address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {shippingDetails.city}, {shippingDetails.postalCode}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone: {shippingDetails.phone}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                            Payment Method
                        </Typography>
                        <Box sx={{ 
                            p: 2, 
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: 1
                        }}>
                            <Typography variant="body1">
                                {paymentMethod === 'card' ? 'Card Payment' : 'Cash on Delivery'}
                            </Typography>
                            {paymentMethod === 'card' && (
                                <Typography variant="body2" color="text.secondary">
                                    Card ending in {cardDetails.cardNumber.slice(-4)}
                                </Typography>
                            )}
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                            Total: LKR {total.toFixed(2)}
                        </Typography>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                mb: 4
            }}>
                Checkout
            </Typography>
            
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <StyledPaper>
                        {renderStepContent(activeStep)}
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StyledPaper>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ShoppingCart sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                                Order Summary
                            </Typography>
                        </Box>
                        {cartItems.map((item) => (
                            <Box key={item.product.id} sx={{ 
                                mb: 2,
                                p: 1,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                borderRadius: 1
                            }}>
                                <Typography variant="subtitle2">
                                    {item.product.title} x {item.quantity}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    LKR {Number(item.product.price || 0).toFixed(2)} each
                                </Typography>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                            Total: LKR {total.toFixed(2)}
                        </Typography>
                    </StyledPaper>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <StyledButton
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="outlined"
                >
                    Back
                </StyledButton>
                <StyledButton
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
                    sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                        },
                    }}
                >
                    {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </StyledButton>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            <Snackbar
                open={showSuccess}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Order placed successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Checkout; 