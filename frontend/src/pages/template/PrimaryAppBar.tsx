import { useTheme } from "@mui/material/styles";
import { AppBar, Box, Drawer, IconButton, Link, Toolbar, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import { useEffect, useState } from "react";
import ExploreCategories from "../../components/secondaryDraw/ExploreCategories";
import AccountButton from "../../components/PrimaryAppBar/AccountButton";

const PrimaryAppBar = () => {
    const [sideMenu, setSideMenu] = useState(false);
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const list = () => (
        <Box sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }} role="presentation" onClick={toggleDrawer(false)} >
            <ExploreCategories />
        </Box>
    );

    useEffect(() => {
        if (!isSmallScreen && sideMenu) {
            setSideMenu(false);
        }
    }, [isSmallScreen]);

    const toggleDrawer = (open?: boolean) => 
        (_event: React.MouseEvent) => {
            if (open) {
                setSideMenu(open);
            } else {
                setSideMenu(!sideMenu);
            }
    };

    return (
        <AppBar elevation={0} 
            sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 2,
            backgroundColor: theme.palette.background.default, 
            borderBottom: `1px solid ${theme.palette.divider}` }}>

            <Toolbar variant="dense" sx={{height: theme.primaryAppBar.height, minHeight: theme.primaryAppBar.height }}> 

                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <IconButton color="default" aria-label="open drawer" edge="start" sx={{mr:1}} onClick={toggleDrawer()}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>

                <Link href="/" underline="none">
                    <Typography variant="h6" component="div" sx={{ display: {fontWeight: 700, letterSpacing: "-0.5px", color: "black"} }}>
                        DJCHAT
                    </Typography>
                </Link>

                <Box sx={{ flexGrow: 1 }}></Box>
                <AccountButton />

            </Toolbar>
        </AppBar>
    );
};

export default PrimaryAppBar;