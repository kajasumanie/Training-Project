import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface LogoProps {
  variant?: 'default' | 'small' | 'large';
  showIcon?: boolean;
}

const Logo = ({ variant = 'default', showIcon = true }: LogoProps) => {
  const sizes = {
    small: { fontSize: '1.2rem', iconSize: '1rem' },
    default: { fontSize: '1.5rem', iconSize: '1.3rem' },
    large: { fontSize: '2rem', iconSize: '1.8rem' },
  };

  const { fontSize, iconSize } = sizes[variant];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {showIcon && (
        <FavoriteIcon
          sx={{
            fontSize: iconSize,
            color: '#E91E63',
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
            },
          }}
        />
      )}
      <Typography
        sx={{
          fontSize,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #E91E63 0%, #FF4081 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '0.5px',
        }}
      >
        Sumanie's Shop
      </Typography>
    </Box>
  );
};

export default Logo;
