import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./template/PrimaryAppBar";
import PrimaryDraw from "./template/PrimaryDraw";
import SecondaryDraw from "./template/SecondaryDraw";
import PopularChannels from "../components/primaryDraw/PopularChannels";
import ExploreCategories from "../components/secondaryDraw/ExploreCategories";
import Main from "./template/Main";
import ExploreServers from "../components/main/ExploreServers";

const Home = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <PrimaryAppBar />

            <PrimaryDraw>
                <PopularChannels open={false} />
            </PrimaryDraw>

            <SecondaryDraw>
                <ExploreCategories />
            </SecondaryDraw>

            <Main>
                <ExploreServers />
            </Main>
            
        </Box>
    );
};

export default Home;