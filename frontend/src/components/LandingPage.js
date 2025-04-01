import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = ({ darkMode }) => {
  return (
    <Box sx={{
      minHeight: '100vh',
      background: darkMode 
        ? '/logo512.png' 
        : '/logo512.png',
      color: darkMode ? '#FFB6C1' : '#7e895e',
      padding: 4,
      overflow: 'hidden'
    }}>

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 0.9, 0.8]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-30%',
          width: '80%',
          height: '150%',
          background: darkMode 
            ? 'radial-gradient(circle, rgba(255,182,193,0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,182,193,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      <Box sx={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1200,
        margin: '0 auto',
        padding: 4
      }}>
        <Grid container spacing={6} alignItems="center" sx={{ minHeight: '80vh' }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h2" 
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  mb: 3,
                  background: darkMode 
                    ? 'linear-gradient(45deg, #FFB6C1, #FF8FAB)'
                    : 'linear-gradient(45deg, #7e895e, #5a3d3d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Pixelate
              </Typography>
              <Typography 
                variant="h5" 
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  mb: 4,
                  color: darkMode ? '#FFB6C1' : '#7e895e',
                  opacity: 0.9
                }}
              >
                A fashion retail website, created to help you share and explore unique fashion styles.
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.70 }}
              >
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    background: darkMode 
                      ? 'linear-gradient(45deg, #FF8FAB, #FF6B81)'
                      : 'linear-gradient(45deg, #FF8FAB, #FFB6C1)',
                    color: 'white',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: darkMode 
                      ? '0 4px 20px rgba(255, 143, 171, 0.5)'
                      : '0 4px 20px rgba(255, 182, 193, 0.6)',
                    '&:hover': {
                      boxShadow: darkMode 
                        ? '0 6px 25px rgba(255, 143, 171, 0.7)'
                        : '0 6px 25px rgba(255, 182, 193, 0.8)'
                    }
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Box
                component="img"
                src="/background.png"
                alt="Fashion Illustration"
                sx={{
                  width: '100%',
                  borderRadius: '16px',
                  boxShadow: darkMode 
                    ? '0 20px 40px rgba(0, 0, 0, 0.3)'
                    : '0 20px 40px rgba(255, 182, 193, 0.4)',
                  border: darkMode 
                    ? '1px solid rgba(255, 182, 193, 0.1)'
                    : '1px solid rgba(255, 182, 193, 0.3)'
                }}
              />
            </motion.div>
          </Grid>
        </Grid>

        <Box sx={{ mt: 15, mb: 10 }}>
          <Typography 
            variant="h3" 
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              mb: 6,
              textAlign: 'center',
              background: darkMode 
                ? 'linear-gradient(45deg, #FFB6C1, #FF8FAB)'
                : 'linear-gradient(45deg, #7e895e, #5a3d3d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Why Choose Pixelate?
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "Create Looks",
                description: "Share and like your favorite clothes",
              },
              {
                title: "Share Styles",
                description: "Connect with fashion enthusiasts",
              },
              {
                title: "Virtual Try-On",
                description: "See how clothes look and create outfits",
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <Box sx={{
                    p: 4,
                    borderRadius: '16px',
                    background: darkMode 
                      ? 'rgba(40, 40, 40, 0.7)'
                      : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: darkMode 
                      ? '1px solid rgba(255, 182, 193, 0.1)'
                      : '1px solid rgba(255, 182, 193, 0.2)',
                    boxShadow: darkMode 
                      ? '0 10px 30px rgba(0, 0, 0, 0.2)'
                      : '0 10px 30px rgba(255, 182, 193, 0.2)',
                    height: '100%',
                    textAlign: 'center'
                  }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontSize: '3rem',
                        mb: 2
                      }}
                    >
                      {feature.icon}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontFamily: "'Poppins'",
                        fontWeight: 600,
                        mb: 2,
                        color: darkMode ? '#FF8FAB' : '#7e895e'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;