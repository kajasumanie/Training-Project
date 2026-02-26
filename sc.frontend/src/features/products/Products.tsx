import React, { useState } from 'react';
import { Box, Container, Grid2, Typography, Pagination, Skeleton, useTheme, alpha, TextField, InputAdornment } from '@mui/material';
import { useGetProductsQuery } from '../../api/productsApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { styled } from '@mui/material/styles';
import { Category, Search } from '@mui/icons-material';

const StyledContainer = styled(Container)(() => ({
    padding: '2rem 0',
    backgroundColor: 'transparent',
    minHeight: 'calc(100vh - 64px)',
}));

const LoadingSkeleton = () => (
    <Grid2 container spacing={4}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }} key={item}>
                <Skeleton 
                    variant="rounded" 
                    height={400} 
                    sx={{ 
                        borderRadius: '16px',
                        transform: 'none',
                    }} 
                />
            </Grid2>
        ))}
    </Grid2>
);

const ITEMS_PER_PAGE = 10;

const Products: React.FC = () => {
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const { data, isLoading, error } = useGetProductsQuery({ 
        page, 
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch
    });

    // Debounce search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1); // Reset to first page on search
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (error) {
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
                        Error Loading Products
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
                justifyContent: 'space-between',
                mb: 4,
                gap: 2,
                flexWrap: 'wrap'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Category sx={{ 
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
                        💖 Our Products
                    </Typography>
                </Box>
                <TextField
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ 
                        minWidth: '300px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {isLoading ? (
                <LoadingSkeleton />
            ) : data?.data.length === 0 ? (
                <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    px: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    borderRadius: '16px',
                }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Products Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Please check back later for new products
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid2 container spacing={4}>
                        {data?.data.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Grid2>
                    
                    {data && data.totalPages > 1 && (
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                mt: 6,
                                mb: 2 
                            }}
                        >
                            <Pagination 
                                count={data.totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        borderRadius: '8px',
                                        margin: '0 4px',
                                    },
                                    '& .Mui-selected': {
                                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                        color: 'white',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    )}
                </>
            )}
        </StyledContainer>
    );
};

export default Products;