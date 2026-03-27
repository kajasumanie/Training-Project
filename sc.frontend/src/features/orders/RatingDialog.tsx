import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Rating,
    Box,
    Typography
} from '@mui/material';
import { useRateProductMutation } from '../../api/productsApi';

interface RatingDialogProps {
    open: boolean;
    onClose: () => void;
    productId: string;
    productTitle: string;
    currentRating?: number;
}

const RatingDialog: React.FC<RatingDialogProps> = ({
    open,
    onClose,
    productId,
    productTitle,
    currentRating = 0
}) => {
    const [rating, setRating] = useState<number>(currentRating);
    const [rateProduct, { isLoading }] = useRateProductMutation();

    const handleSubmit = async () => {
        try {
            await rateProduct({
                productId,
                rating
            }).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to submit rating:', error);
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            disableRestoreFocus
        >
            <DialogTitle>
                Rate {productTitle}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <Box>
                        <Typography component="legend">Your Rating</Typography>
                        <Rating
                            value={rating}
                            onChange={(_, newValue) => {
                                setRating(newValue || 0);
                            }}
                            precision={0.5}
                            size="large"
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={rating === 0 || isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit Rating'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RatingDialog; 