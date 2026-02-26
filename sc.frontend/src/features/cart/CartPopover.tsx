import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
    Popover,
    Paper,
    Stack,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
    ShoppingCart as ShoppingCartIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    removeProductFromCart,
    increaseQuantity,
    decreaseQuantity
} from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

interface CartPopoverProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

const CartPopover: React.FC<CartPopoverProps> = ({ anchorEl, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.shoppingCart.items);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleRemoveItem = (productId: number) => {
        dispatch(removeProductFromCart(productId));
    };

    const handleIncrementQuantity = (productId: number) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecrementQuantity = (productId: number) => {
        dispatch(decreaseQuantity(productId));
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            setSnackbarMessage('Your cart is empty');
            setShowSnackbar(true);
            return;
        }

        onClose();
        navigate('/checkout');
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    const total = cartItems.reduce(
        (sum, item) => sum + (item.product.price || 0) * item.quantity,
        0
    );

    return (
        <>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 480,
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Shopping Cart
                        </Typography>
                        <IconButton 
                            size="small" 
                            onClick={onClose}
                            sx={{ 
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'text.primary'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {cartItems.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <ShoppingCartIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                            <Typography color="text.secondary">
                                Your cart is empty
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Stack spacing={2} sx={{ maxHeight: 320, overflowY: 'auto' }}>
                                {cartItems.map((item) => (
                                    <Paper
                                        key={item.product.id}
                                        elevation={0}
                                        sx={{
                                            p: 1,
                                            borderRadius: '12px',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Box
                                                component="img"
                                                src={item.product.imageUrl}
                                                alt={item.product.title}
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: '8px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {item.product.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="primary"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    LKR {Number(item.product.price || 0).toFixed(2)}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDecrementQuantity(item.product.id)}
                                                        sx={{ p: 0.5 }}
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ mx: 1, minWidth: 24, textAlign: 'center' }}
                                                    >
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleIncrementQuantity(item.product.id)}
                                                        sx={{ p: 0.5 }}
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleRemoveItem(item.product.id)}
                                                        sx={{ ml: 'auto', color: 'error.main' }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Paper>
                                ))}
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Total
                                </Typography>
                                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }}>
                                    LKR {total.toFixed(2)}
                                </Typography>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleCheckout}
                                sx={{
                                    borderRadius: '25px',
                                    textTransform: 'none',
                                    py: 1,
                                }}
                            >
                                Checkout
                            </Button>
                        </>
                    )}
                </Box>
            </Popover>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CartPopover;