import React from 'react';
import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";

interface Props {
  name: string;
  children?: React.ReactNode;
}

const Header:React.FC<Props> = ({ name, children}) => {
  return (
    <AppBar component="nav" position='static'>
      <Container>
        <Toolbar>
          <AppsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {name}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {children}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;