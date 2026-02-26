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
    FormLabel,
    Alert,
    Snackbar,
    InputAdornment,
    IconButton
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { emptyCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const steps = ['Shipping Details', 'Payment Method', 'Review Order'];

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

interface CardDetails {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

const Checkout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.shoppingCart.items);
    const [activeStep, setActiveStep] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showCvv, setShowCvv] = useState(false);

    // Form states
    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('credit');
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

        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }

        else if (name === 'expiryDate') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d{0,2})/, '$1/$2')
                .substr(0, 5);
        }

        else if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').substr(0, 3);
        }

        setCardDetails({
            ...cardDetails,
            [name]: formattedValue
        });
    };

    const validateCardDetails = () => {
        if (paymentMethod === 'credit' || paymentMethod === 'debit') {
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

            if (!shippingDetails.fullName || !shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode || !shippingDetails.phone) {
                setError('Please fill in all shipping details');
                return;
            }
        } else if (activeStep === 1) {

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
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            dispatch(emptyCart());
            setShowSuccess(true);

            setTimeout(() => {
                navigate('/');
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
                            <TextField
                                required
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={shippingDetails.fullName}
                                onChange={handleShippingDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Address"
                                name="address"
                                value={shippingDetails.address}
                                onChange={handleShippingDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="City"
                                name="city"
                                value={shippingDetails.city}
                                onChange={handleShippingDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Postal Code"
                                name="postalCode"
                                value={shippingDetails.postalCode}
                                onChange={handleShippingDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                        <FormControl component="fieldset" sx={{ mb: 3 }}>
                            <FormLabel component="legend">Select Payment Method</FormLabel>
                            <RadioGroup
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                            >
                                <FormControlLabel
                                    value="credit"
                                    control={<Radio />}
                                    label="Credit Card"
                                />
                                <FormControlLabel
                                    value="debit"
                                    control={<Radio />}
                                    label="Debit Card"
                                />
                                <FormControlLabel
                                    value="cod"
                                    control={<Radio />}
                                    label="Cash on Delivery"
                                />
                            </RadioGroup>
                        </FormControl>

                        {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
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
                                    <TextField
                                        required
                                        fullWidth
                                        label="Name on Card"
                                        name="cardName"
                                        value={cardDetails.cardName}
                                        onChange={handleCardDetailsChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
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
                                    <TextField
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
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        {cartItems.map((item) => (
                            <Box key={item.product.id} sx={{ mb: 2 }}>
                                <Typography variant="subtitle1">
                                    {item.product.title} x {item.quantity}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    LKR {Number(item.product.price || 0).toFixed(2)} each
                                </Typography>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Shipping Details
                        </Typography>
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
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Payment Method
                        </Typography>
                        <Typography variant="body1">
                            {paymentMethod === 'credit' ? 'Credit Card' : 
                             paymentMethod === 'debit' ? 'Debit Card' : 'Cash on Delivery'}
                        </Typography>
                        {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                            <Typography variant="body2" color="text.secondary">
                                Card ending in {cardDetails.cardNumber.slice(-4)}
                            </Typography>
                        )}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
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
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        {cartItems.map((item) => (
                            <Box key={item.product.id} sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">
                                    {item.product.title} x {item.quantity}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    LKR {Number(item.product.price || 0).toFixed(2)} each
                                </Typography>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Total: LKR {total.toFixed(2)}
                        </Typography>
                    </StyledPaper>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
                    sx={{
                        borderRadius: '25px',
                        textTransform: 'none',
                        px: 4,
                    }}
                >
                    {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </Button>
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