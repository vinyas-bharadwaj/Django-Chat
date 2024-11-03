import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, useTheme } from "@mui/material";
import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { MEDIA_URL } from "../../config";
import { Link, useParams } from "react-router-dom";
import { server } from "../../@types/server";

interface ServerChannelsProps {
    data: server[];
}


const ServerChannels: React.FC<ServerChannelsProps> = ({ data }) => {
    const theme = useTheme();
    const server_name = data?.[0]?.name ?? "Server";
    const { serverId } = useParams();

    return <>
        <Box sx={{height: theme.primaryAppBar.height + 1, display: "flex", alignItems: "center", px: 2, borderBottom: `1px solid ${theme.palette.divider}`, position: "sticky", top: 0, backgroundColor: theme.palette.background.default}}>
            <Typography variant="body1" style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
                {server_name}
            </Typography>
        </Box>
        <List sx={{py: 0, }}>
            {data.flatMap((obj) => (
                obj.channel_server.map((item) => (
                    <ListItem disablePadding key={item.id} sx={{display: "block", maxHeight: "40px"}} dense={true} >
                        <Link to={`/server/${serverId}/${item.id}`} style={{ textDecoration: "none", color: "inherit"}}>
                            <ListItemButton sx={{minHeight: 48}}>
                                <ListItemText primary={<Typography variant="body1" textAlign="start" paddingLeft={1}>{item.name.toLowerCase()}</Typography>}>

                                </ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))
            ))}
        </List>
    </>
}

export default ServerChannels;
