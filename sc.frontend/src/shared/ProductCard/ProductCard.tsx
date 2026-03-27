import { Button, Card, CardContent, CardMedia, Grid2, Typography, Rating, Box, IconButton, Fade } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/slices/cartSlice";
import { Product } from "../../models/products";
import { ShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import ProductDetailDialog from '../../features/products/ProductDetailDialog';

interface ProductCardProps {
    product: Product;
}

const StyledCard = styled(Card)(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    boxShadow: '0 4px 16px 0 rgba(233, 30, 99, 0.15)',
    border: '1px solid rgba(255, 192, 203, 0.3)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 28px 0 rgba(233, 30, 99, 0.25)',
        borderColor: 'rgba(233, 30, 99, 0.4)',
    }
}));

const StyledCardMedia = styled(CardMedia)(() => ({
    position: 'relative',
    height: 140,
    paddingTop: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(233,30,99,0) 0%, rgba(233,30,99,0.15) 100%)',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
    },
    '&:hover::after': {
        opacity: 1,
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: 'auto',
    borderRadius: '20px',
    textTransform: 'none',
    padding: theme.spacing(1),
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
}));

const FavoriteButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    }
}));

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

    const handleCardClick = () => {
        setIsDetailDialogOpen(true);
    };

    const handleAddToCart = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(addProductToCart(product));
    };

    const handleFavoriteClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const getRating = () => {
        return product.rating || 0;
    };

    const getPrice = () => {
        return product.price || 0;
    };

    const getSoldCount = () => {
        return product.sold || 0;
    };

    return (
        <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }} key={product.id}>
            <Fade in timeout={1000}>
                <StyledCard>
                    <Box 
                        sx={{ 
                            position: 'relative',
                            cursor: 'pointer'
                        }}
                        onClick={handleCardClick}
                    >
                        <StyledCardMedia
                            image={product.imageUrl}
                            title={product.title}
                        />
                        <FavoriteButton 
                            onClick={handleFavoriteClick}
                            size="small"
                            aria-label="add to favorites"
                        >
                            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                        </FavoriteButton>
                    </Box>
                    <CardContent 
                        sx={{ 
                            flexGrow: 1, 
                            p: 1.5,
                            cursor: 'pointer'
                        }}
                        onClick={handleCardClick}
                    >
                        <Typography 
                            gutterBottom 
                            variant="h6" 
                            component="div" 
                            sx={{ 
                                fontWeight: 600,
                                mb: 0.5,
                                fontSize: '0.9rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {product.title}
                        </Typography>

                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                                mb: 0.5,
                                fontSize: '0.8rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {product.subtitle || "A brief description or category."}
                        </Typography>

                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                mb: 0.5
                            }}
                        >
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: 0.5,
                                }}
                            >
                                <Rating
                                    value={getRating()}
                                    precision={0.1}
                                    readOnly
                                    sx={{ 
                                        fontSize: 14, 
                                        mr: 0.25,
                                        color: '#FFD700',
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                    {getRating().toFixed(1)}
                                </Typography>
                            </Box>
                            <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ 
                                    fontSize: '0.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}
                            >
                                <ShoppingCart sx={{ fontSize: 14 }} />
                                {getSoldCount()} sold
                            </Typography>
                        </Box>

                        <Typography 
                            variant="h6" 
                            color="primary" 
                            sx={{ 
                                fontWeight: 700,
                                mb: 0.5,
                                fontSize: '1rem',
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                backgroundClip: 'text',
                                textFillColor: 'transparent',
                            }}
                        >
                            LKR {getPrice().toFixed(2)}
                        </Typography>

                        <StyledButton
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            startIcon={<ShoppingCart />}
                            sx={{ 
                                padding: '4px 12px',
                                fontSize: '0.8rem',
                                mt: 'auto'
                            }}
                        >
                            Add to Cart
                        </StyledButton>
                    </CardContent>
                </StyledCard>
            </Fade>
            <ProductDetailDialog
                open={isDetailDialogOpen}
                onClose={() => setIsDetailDialogOpen(false)}
                product={product}
            />
        </Grid2>
    );
};

export default ProductCard;