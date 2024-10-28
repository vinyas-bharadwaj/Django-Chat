import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import useAxiosWithInterceptor from "../../helpers/jwtinterceptor";

const SecondaryDraw = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            minWidth: `${theme.primaryDraw.width}px`, 
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            mt: `${theme.primaryAppBar.height}px`, 
            borderRight: `1px solid ${theme.palette.divider}`,
            display: {xs: "none", sm: "block"},
            overflow: "auto",
        }}>
            {[...Array(100)].map((_, i) => (
                    <Typography key={i} paragraph>
                        {i + 1}
                    </Typography>
                ))}

        </Box>
    )
}


export default SecondaryDraw;