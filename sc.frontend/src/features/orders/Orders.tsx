import React from 'react';
import { Box, Container, Grid, Typography, Skeleton, useTheme, alpha } from '@mui/material';
import { useGetOrdersQuery } from '../../api/ordersApi';
import OrderCard from '../../components/OrderCard/OrderCard';
import { styled } from '@mui/material/styles';
import { ShoppingBag } from '@mui/icons-material';

const StyledContainer = styled(Container)(() => ({
    padding: '2rem 0',
    backgroundColor: 'transparent',
    minHeight: 'calc(100vh - 64px)',
}));

const LoadingSkeleton = () => (
    <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton 
                    variant="rounded" 
                    height={400} 
                    sx={{ 
                        borderRadius: '16px',
                        transform: 'none',
                    }} 
                />
            </Grid>
        ))}
    </Grid>
);

const Orders: React.FC = () => {
    const theme = useTheme();
    const { data: orders, isLoading, isError } = useGetOrdersQuery();

    if (isError) {
        return (
            <StyledContainer>
                <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    px: 2,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    borderRadius: '16px',
                }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        Error Loading Orders
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Please try again later
                    </Typography>
                </Box>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                gap: 2
            }}>
                <ShoppingBag sx={{ 
                    fontSize: '2.5rem',
                    color: theme.palette.primary.main,
                }} />
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #E91E63 30%, #FF4081 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    💖 Your Orders
                </Typography>
            </Box>

            {isLoading ? (
                <LoadingSkeleton />
            ) : orders?.length === 0 ? (
                <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    px: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    borderRadius: '16px',
                }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Orders Yet
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Start shopping to see your orders here
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {orders?.map((order) => (
                        <Grid item xs={12} sm={6} md={4} key={order.id}>
                            <OrderCard order={order} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </StyledContainer>
    );
};

export default Orders;