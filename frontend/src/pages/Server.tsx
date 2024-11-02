import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./template/PrimaryAppBar";
import PrimaryDraw from "./template/PrimaryDraw";
import SecondaryDraw from "./template/SecondaryDraw";
import Main from "./template/Main";
import ServerChannels from "../components/secondaryDraw/ServerChannels";
import UserServers from "../components/primaryDraw/UserServers";
import MessageInterface from "../components/main/MessageInterface";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import { server } from "../@types/server.d" ;
import { useEffect } from "react";

const Server = () => {

    const navigate = useNavigate();
    const {serverId, channelId} = useParams();

    const {dataCRUD, error, isLoading, fetchData} = useCrud<server>(
        [], 
        `/server/select/?by_serverid=${serverId}`
    );

    if (error !== null && error.message === "400") {
        navigate("/");
        return null;
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const isChannel = (): boolean => {
        if (!channelId) {
            return true;
        }

        return dataCRUD.some((server) => 
            server.channel_server.some(
                (channel) => channel.id === parseInt(channelId) 
            )
        );
    };

    useEffect(() => {
        if(!channelId) {
            navigate(`/server/${serverId}`);
        }
    }, [isChannel, channelId]);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <PrimaryAppBar />

            <PrimaryDraw>
                <UserServers open={false} data={dataCRUD} />
            </PrimaryDraw>

            <SecondaryDraw>
                <ServerChannels data={dataCRUD} />
            </SecondaryDraw>

            <Main>
                <MessageInterface data={dataCRUD}/>
            </Main>
            
        </Box>
    );
};

export default Server   ;