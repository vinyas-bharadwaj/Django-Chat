import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";

const AccountButton = () => {

    return (
        <Box sx={{display: {xs: "flex"}}}>
            <IconButton edge="end" color="inherit" >
                <AccountCircle sx={{color: "black"}} />
                
            </IconButton>
        </Box>
    );
}

export default AccountButton;