import { AppBar, Toolbar, Box, ListItemAvatar, Typography, IconButton, Drawer, useTheme, Avatar, useMediaQuery } from "@mui/material";
import { MEDIA_URL } from "../../config";
import { server } from "../../@types/server";
import { useParams } from "react-router-dom";
import ServerChannels from "../secondaryDraw/ServerChannels";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { ThemeContext } from "@emotion/react";

interface ServerChannelProps {
    data: server[];
}

const MessageInterfaceChannels = (props: ServerChannelProps) => {
    const { data } = props;
    const theme = useTheme();
    const [sideMenu, setSideMenu] = useState(false);
    const { serverId, channelId } = useParams();
    const channel_name = data
        ?.find((server) => server.id == Number(serverId))
        ?.channel_server?.find((channel) => channel.id == Number(channelId))
        ?.name || "Home";

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (!isSmallScreen && sideMenu) {
            setSideMenu(false);
        }
    }, [isSmallScreen]);

    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event.type === "keydown") {
                return
            }
        setSideMenu(open);
    }

    const list = () => (
        <Box sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <ServerChannels data={data} />
        </Box>
    );

    return <>
        <AppBar sx={{backgroundColor: theme.palette.background.default, borderBottom: `1px solid ${theme.palette.divider}` }} color="default" position="sticky" elevation={0}>
            <Toolbar variant="dense" sx={{minHeight: theme.primaryAppBar.height, height: theme.primaryAppBar.height, display: "flex", alignItems: "center"}}>
                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <ListItemAvatar sx={{ minWidth: "40px" }}>
                        <Avatar alt="Server Icon" src={`${MEDIA_URL}${data?.[0]?.icon}`} sx={{width: 30, height: 30}} />
                    </ListItemAvatar>
                </Box>

                <Typography noWrap component="div">
                    {channel_name}
                </Typography>

                <Box sx={{flexGrow: 1}}></Box>
                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </Box>
                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </Toolbar>

        </AppBar>
    </>;
}

export default MessageInterfaceChannels;