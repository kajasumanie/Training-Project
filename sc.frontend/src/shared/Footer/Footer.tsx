import React from 'react';
import { Box, Container, Grid2, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer: React.FC = () => {
    return (
        <Box sx={{
            backgroundColor: 'white',
            padding: '2rem 0',
            boxShadow: 20,
            marginTop: 5,
            marginBottom: 'none'
        }}
        >
            <Container>
                <Grid2 container spacing={4}>
                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            SumanieShop
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Your one-stop shop for all your daily needs. SumanieShop offers a wide range of products, from groceries to electronics, delivered straight to your door.
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/" color="inherit" display="block" variant="body2">
                            Home
                        </Link>
                        <Link href="/products" color="inherit" display="block" variant="body2">
                            Products
                        </Link>
                        <Link href="/orders" color="inherit" display="block" variant="body2">
                            Orders
                        </Link>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <IconButton color="primary" aria-label="facebook">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="instagram">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="twitter">
                            <TwitterIcon />
                        </IconButton>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Email: kkajasu@gmail.com
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Phone: 0770595813
                        </Typography>
                    </Grid2>
                </Grid2>
                <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} SumanieShop, All Rights Reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;