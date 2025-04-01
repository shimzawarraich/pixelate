import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Welcome = ({ onGetStarted }) => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="100vh"
            sx={{
                backgroundColor: "#FFE4E1", 
                textAlign: "center",
                padding: 4,
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Typography 
                    variant="h2" 
                    sx={{
                        fontFamily: "'Poppins', cursive", 
                        fontWeight: 700, 
                        color: "#FF69B4",
                        marginBottom: 2
                    }}
                >
                    Pixelate
                </Typography>
                <Typography 
                    variant="h5" 
                    sx={{
                        fontFamily: "'Poppins', cursive", 
                        fontWeight: 500, 
                        color: "#FF1493",
                        marginBottom: 4
                    }}
                >
                    A fashion retail company
                </Typography>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button 
                        variant="contained" 
                        onClick={onGetStarted} 
                        sx={{
                            backgroundColor: "#FF69B4", 
                            color: "white", 
                            fontFamily: "'Poppins', cursive", 
                            fontWeight: 600,
                            padding: "10px 20px",
                            borderRadius: 3,
                            "&:hover": {
                                backgroundColor: "#FF1493"
                            }
                        }}
                    >
                        Get Started 
                    </Button>
                </motion.div>
            </motion.div>
        </Box>
    );
};

export default Welcome;
