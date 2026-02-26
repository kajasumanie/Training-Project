import React from 'react';
import { Container, Grid, Typography, Button, Box, Paper, Grid2, Fade, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowForward, LocalShipping, Security, Support } from '@mui/icons-material';
import { useGetTopRatedProductsQuery } from '../../api/productsApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: theme.spacing(8, 0),
    marginBottom: theme.spacing(8),
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1,
    }
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    borderRadius: '25px',
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
}));

const Home: React.FC = () => {

    const { data: topRatedProducts, isLoading: isLoadingTopRated } = useGetTopRatedProductsQuery({ limit: 3 });
    const navigate = useNavigate();

    const navigateToCart = () => {
        navigate('/products');
    };

    return (
        <Box>
            <HeroSection>
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Fade in timeout={1000}>
                                <Box>
                                    <Typography 
                                        variant="h2" 
                                        gutterBottom 
                                        sx={{ 
                                            fontWeight: 800,
                                            background: 'linear-gradient(45deg, #E91E63 30%, #FF4081 90%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        💖 Welcome to Sumanie's Shop
                                    </Typography>
                                    <Typography 
                                        variant="h5" 
                                        color="text.secondary" 
                                        paragraph
                                        sx={{ mb: 4 }}
                                    >
                                        Your Lovely Shopping Destination ✨ Shop with love and get amazing products delivered to your doorstep!
                                    </Typography>
                                    <StyledButton 
                                        variant="contained" 
                                        color="primary" 
                                        size="large"
                                        onClick={navigateToCart}
                                        endIcon={<ArrowForward />}
                                    >
                                        Start Shopping
                                    </StyledButton>
                                </Box>
                            </Fade>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Fade in timeout={1000}>
                                <Box
                                    component="img"
                                    src="https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="Shopping"
                                    sx={{
                                        width: '100%',
                                        borderRadius: '16px',
                                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                        border: '1px solid rgba(255, 255, 255, 0.18)',
                                    }}
                                />
                            </Fade>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            <Container sx={{ mb: 8 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <FeatureCard elevation={3}>
                            <LocalShipping sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" gutterBottom>Fast Delivery</Typography>
                            <Typography color="text.secondary">
                                Get your products delivered quickly and safely
                            </Typography>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FeatureCard elevation={3}>
                            <Security sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" gutterBottom>Secure Payment</Typography>
                            <Typography color="text.secondary">
                                Your transactions are safe and secure
                            </Typography>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FeatureCard elevation={3}>
                            <Support sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" gutterBottom>24/7 Support</Typography>
                            <Typography color="text.secondary">
                                We're here to help you anytime
                            </Typography>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FeatureCard elevation={3}>
                            <ShoppingCart sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" gutterBottom>Easy Returns</Typography>
                            <Typography color="text.secondary">
                                Hassle-free returns and refunds
                            </Typography>
                        </FeatureCard>
                    </Grid>
                </Grid>
            </Container>

            <Container sx={{ mb: 8 }}>
                <Typography 
                    variant="h3" 
                    align="center" 
                    gutterBottom
                    sx={{ 
                        fontWeight: 700,
                        mb: 4,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                    }}
                >
                    Top Rated Products
                </Typography>
                <Grid2 
                    container 
                    spacing={2} 
                    justifyContent="center"
                    alignItems="center"
                >
                    {isLoadingTopRated ? (
                        <Box display="flex" justifyContent="center" width="100%" py={4}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        topRatedProducts?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </Grid2>
            </Container>

            <Box 
                sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    borderRadius: '16px',
                    mb: 8
                }}
            >
                <Container>
                    <Typography 
                        variant="h4" 
                        gutterBottom
                        sx={{ 
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                        }}
                    >
                        Ready to Shop?
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        Discover our full collection of amazing products
                    </Typography>
                    <StyledButton 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        onClick={navigateToCart}
                        endIcon={<ArrowForward />}
                    >
                        Browse All Products
                    </StyledButton>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;