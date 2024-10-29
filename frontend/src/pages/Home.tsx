import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./template/PrimaryAppBar";
import PrimaryDraw from "./template/PrimaryDraw";
import SecondaryDraw from "./template/SecondaryDraw";
import PopularChannels from "../components/primaryDraw/PopularChannels";
import Main from "./template/Main";

const Home = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <PrimaryAppBar />

            <PrimaryDraw>
                <PopularChannels />
            </PrimaryDraw>

            <SecondaryDraw>
            </SecondaryDraw>

            <Main>
            </Main>
            
        </Box>
    );
};

export default Home;