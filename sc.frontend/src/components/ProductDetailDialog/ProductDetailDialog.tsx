import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Rating,
    Box,
    Typography,
    Grid,
    IconButton,
    Divider,
} from '@mui/material';
import { Close, ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../store/slices/cartSlice';
import { Product } from '../../models/products';
import { useState } from 'react';

interface ProductDetailDialogProps {
    open: boolean;
    onClose: () => void;
    product: Product;
}

const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({
    open,
    onClose,
    product
}) => {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToCart = () => {
        dispatch(addProductToCart(product));
        onClose();
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                }
            }}
        >
            <DialogTitle sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                pb: 1,
                fontWeight: 600
            }}>
                Product Details
                <Box>
                    <IconButton onClick={toggleFavorite} size="small" sx={{ mr: 1 }}>
                        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    {/* Product Image */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={product.imageUrl}
                            alt={product.title}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '12px',
                                boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.25)',
                            }}
                        />
                    </Grid>

                    {/* Product Details */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Typography 
                                variant="h5" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    backgroundClip: 'text',
                                    textFillColor: 'transparent',
                                }}
                            >
                                {product.title}
                            </Typography>

                            <Typography 
                                variant="body1" 
                                color="text.secondary" 
                                paragraph
                                sx={{ mb: 2 }}
                            >
                                {product.subtitle || "No description available."}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Rating
                                    value={product.rating}
                                    precision={0.1}
                                    readOnly
                                    sx={{ 
                                        fontSize: 20,
                                        mr: 1,
                                        color: '#FFD700'
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {product.rating.toFixed(1)} Rating
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ShoppingCart sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {product.sold} units sold
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Typography 
                                variant="h4" 
                                color="primary" 
                                sx={{ 
                                    fontWeight: 700,
                                    mb: 2,
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    backgroundClip: 'text',
                                    textFillColor: 'transparent',
                                }}
                            >
                                LKR {Number(product.price).toFixed(2)}
                            </Typography>

                            <Box sx={{ mt: 'auto', pt: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={handleAddToCart}
                                    startIcon={<ShoppingCart />}
                                    sx={{
                                        borderRadius: '25px',
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        py: 1.5,
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                                        }
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailDialog; 