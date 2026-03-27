import React, { useState } from 'react';
import { Button, Card, CardContent, Divider, Grid, Typography, Box, Chip, useTheme, alpha, Dialog, DialogTitle, DialogContent, IconButton, CardMedia, Rating } from "@mui/material";
import { Order } from "../../models/orders";
import { styled } from "@mui/material/styles";
import { ShoppingBag, LocalShipping, Payment, Close, CalendarToday, Person, Star } from "@mui/icons-material";
import RatingDialog from './RatingDialog';

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: '1rem',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.3s ease',
    '&:hover': { 
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    }
}));

const ProductBox = styled(Box)(({ theme }) => ({
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    padding: '0.75rem',
    borderRadius: '12px',
    height: '100%',
    minHeight: '200px',
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        borderColor: theme.palette.primary.main,
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    }
}));

const ProductImage = styled(CardMedia)(() => ({
    paddingTop: '75%', // 4:3 aspect ratio
    borderRadius: '8px',
    marginBottom: '0.75rem',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
}));

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
    backgroundColor: status === 'Completed' 
        ? alpha(theme.palette.success.main, 0.1)
        : alpha(theme.palette.warning.main, 0.1),
    color: status === 'Completed' 
        ? theme.palette.success.main
        : theme.palette.warning.main,
    fontWeight: 600,
    '& .MuiChip-label': {
        padding: '0 12px',
    }
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '16px',
        padding: theme.spacing(2),
    },
}));

const DialogProductBox = styled(Box)(({ theme }) => ({
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    padding: '1rem',
    borderRadius: '12px',
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        borderColor: theme.palette.primary.main,
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }
}));

const DialogProductImage = styled(CardMedia)(() => ({
    paddingTop: '60%', // 5:3 aspect ratio
    borderRadius: '8px',
    marginBottom: '1rem',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
}));

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{ id: string, title: string, rating: number } | null>(null);
    
    const total = order.orderItems
        .map(oI => parseFloat(oI.totalPrice))
        .reduce((acc, price) => acc + price, 0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRateProduct = (productId: string, productTitle: string, rating: number) => {
        setSelectedProduct({ id: productId, title: productTitle, rating });
        setRatingDialogOpen(true);
    };

    const handleRatingDialogClose = () => {
        setRatingDialogOpen(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <StyledCard>
                <CardContent>
                    {/* Order Header */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ShoppingBag sx={{ color: theme.palette.primary.main }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Order #{order.id}
                            </Typography>
                        </Box>
                        <StatusChip 
                            label={order.status} 
                            status={order.status}
                        />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Product List */}
                    <Typography variant="subtitle1" gutterBottom sx={{ 
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 2
                    }}>
                        Products
                    </Typography>
                    <Grid container spacing={2}>
                        {order.orderItems.slice(0, 3).map((orderItem, index) => (
                            index === 2 ? (
                                <Grid item xs={12} sm={6} md={6} key={index}>
                                    <ProductBox sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        minHeight: '200px'
                                    }}
                                    onClick={handleOpen}>
                                        <Typography variant="body2" sx={{ 
                                            fontWeight: 600,
                                            color: theme.palette.primary.main
                                        }}>
                                            +{order.orderItems.length - 2} More Products...
                                        </Typography>
                                    </ProductBox>
                                </Grid>
                            ) : (
                                <Grid item xs={12} sm={6} md={6} key={index}>
                                    <ProductBox>
                                        {orderItem.productImageUrl && (
                                            <ProductImage
                                                image={orderItem.productImageUrl}
                                                title={orderItem.productTitle}
                                            />
                                        )}
                                        <Typography variant="subtitle2" sx={{ 
                                            fontWeight: 600,
                                            mb: 0.5,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            color: '#333',
                                        }}>
                                            {orderItem.productTitle}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            Qty: {orderItem.quantity}
                                        </Typography>
                                        <Typography variant="body2" sx={{ 
                                            fontWeight: 600,
                                            color: theme.palette.primary.main
                                        }}>
                                            {(+orderItem.productPrice).toFixed(2)} LKR
                                        </Typography>
                                        
                                        {/* Rating Section for Delivered Orders */}
                                        {order.status === 'Delivered' && orderItem.product && (
                                            <Box sx={{ mt: 1, pt: 1, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                                                    <Rating
                                                        value={orderItem.product?.rating || 0}
                                                        precision={0.1}
                                                        readOnly
                                                        size="small"
                                                        sx={{ fontSize: 14 }}
                                                    />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {(orderItem.product?.rating || 0).toFixed(1)}
                                                    </Typography>
                                                </Box>
                                                <Button
                                                    size="small"
                                                    startIcon={<Star />}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRateProduct(
                                                            orderItem.product!.id.toString(),
                                                            orderItem.productTitle,
                                                            orderItem.product?.rating || 0
                                                        );
                                                    }}
                                                    sx={{
                                                        fontSize: '0.7rem',
                                                        py: 0.5,
                                                        px: 1,
                                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                        color: 'white',
                                                        '&:hover': {
                                                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                                            transform: 'scale(1.05)',
                                                        }
                                                    }}
                                                >
                                                    Rate Product
                                                </Button>
                                            </Box>
                                        )}
                                    </ProductBox>
                                </Grid>
                            )
                        ))}
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* Order Details */}
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <LocalShipping sx={{ color: theme.palette.primary.main, fontSize: '1.2rem' }} />
                            <Typography variant="body2" color="text.secondary">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Payment sx={{ color: theme.palette.primary.main, fontSize: '1.2rem' }} />
                            <Typography variant="body2" color="text.secondary">
                                {order.orderItems.length} items
                            </Typography>
                        </Box>
                    </Box>

                    {/* Total Price */}
                    <Typography variant="h6" gutterBottom sx={{ 
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 2
                    }}>
                        Total: {total.toFixed(2)} LKR
                    </Typography>

                    {/* View Details Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleOpen}
                        sx={{
                            borderRadius: '25px',
                            textTransform: 'none',
                            padding: '10px 0',
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                            },
                            fontWeight: 600,
                        }}
                    >
                        View Order Details
                    </Button>
                </CardContent>
            </StyledCard>

            {/* Order Details Dialog */}
            <StyledDialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                disableRestoreFocus
            >
                <DialogTitle sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    pb: 1
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShoppingBag sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Order #{order.id}
                        </Typography>
                    </Box>
                    <IconButton onClick={handleClose} size="small">
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 3 }}>
                        <StatusChip 
                            label={order.status} 
                            status={order.status}
                        />
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Order Info */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <CalendarToday sx={{ color: theme.palette.primary.main }} />
                                <Typography variant="body1">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Person sx={{ color: theme.palette.primary.main }} />
                                <Typography variant="body1">
                                    User ID: {order.user.id}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Payment sx={{ color: theme.palette.primary.main }} />
                                <Typography variant="body1">
                                    {order.orderItems.length} items
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Products List */}
                    <Typography variant="h6" gutterBottom sx={{ 
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 2
                    }}>
                        Products
                    </Typography>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {order.orderItems.map((orderItem) => (
                            <Grid item xs={12} md={6} key={orderItem.id}>
                                <DialogProductBox>
                                    {orderItem.productImageUrl && (
                                        <DialogProductImage
                                            image={orderItem.productImageUrl}
                                            title={orderItem.productTitle}
                                        />
                                    )}
                                    <Typography variant="subtitle1" sx={{ 
                                        fontWeight: 600,
                                        mb: 1,
                                        color: '#333',
                                    }}>
                                        {orderItem.productTitle}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        Quantity: {orderItem.quantity}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        Price: {(+orderItem.productPrice).toFixed(2)} LKR
                                    </Typography>
                                    <Typography variant="body1" sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.primary.main,
                                        mt: 1
                                    }}>
                                        Total: {orderItem.totalPrice} LKR
                                    </Typography>
                                    
                                    {/* Rating Section in Dialog for Delivered Orders */}
                                    {order.status === 'Delivered' && orderItem.product && (
                                        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                                <Rating
                                                    value={orderItem.product?.rating || 0}
                                                    precision={0.1}
                                                    readOnly
                                                    size="small"
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    {(orderItem.product?.rating || 0).toFixed(1)}
                                                </Typography>
                                            </Box>
                                            <Button
                                                size="small"
                                                startIcon={<Star />}
                                                variant="contained"
                                                fullWidth
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRateProduct(
                                                        orderItem.product!.id.toString(),
                                                        orderItem.productTitle,
                                                        orderItem.product?.rating || 0
                                                    );
                                                }}
                                                sx={{
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                    color: 'white',
                                                    '&:hover': {
                                                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                                        transform: 'scale(1.02)',
                                                    }
                                                }}
                                            >
                                                Rate This Product
                                            </Button>
                                        </Box>
                                    )}
                                </DialogProductBox>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* Order Total */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h6" sx={{ 
                            fontWeight: 600,
                            color: theme.palette.primary.main
                        }}>
                            Total Amount
                        </Typography>
                        <Typography variant="h5" sx={{ 
                            fontWeight: 700,
                            color: theme.palette.primary.main
                        }}>
                            {total.toFixed(2)} LKR
                        </Typography>
                    </Box>
                </DialogContent>
            </StyledDialog>
            
            {/* Rating Dialog */}
            {selectedProduct && (
                <RatingDialog
                    open={ratingDialogOpen}
                    onClose={handleRatingDialogClose}
                    productId={selectedProduct.id}
                    productTitle={selectedProduct.title}
                    currentRating={selectedProduct.rating}
                />
            )}
        </>
    );
};

export default OrderCard;