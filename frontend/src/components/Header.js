import React from 'react';
import{AppBar, Toolbar, Typography, Box, Button } from '@mui/material'


const Header = () => {
  return (
    <AppBar sx={{background: 'pink'}}>
        <Toolbar>
            <Typography variant='h4'>Pixelate</Typography>
            <Box>
                <Button color='warning'>
                    Login
                </Button>
                <Button color='warning'>
                    SignUp
                </Button>
            </Box>
        </Toolbar>
    </AppBar>
  )
};

export default Header;