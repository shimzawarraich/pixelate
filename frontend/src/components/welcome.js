// Welcome.js
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ onGetStarted }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
            padding={4}
            sx={{
                background: 'linear-gradient(135deg, #FF8FAB 0%, #FFC2D1 100%)',
                color: 'white',
            }}
        >
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                Pixelate
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                A Fashion Retail Website 
            </Typography>
            <Box display="flex" gap={2}>
                <Button
                    variant="contained"
                    onClick={onGetStarted}
                    sx={{
                        backgroundColor: 'white',
                        color: '#FF8FAB',
                        padding: '12px 24px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                >
                    Get Started
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: 'white',
                        color: 'white',
                        padding: '12px 24px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: '#f5f5f5',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                    }}
                >
                    Learn More
                </Button>
            </Box>
        </Box>
    );
};

export default Welcome;