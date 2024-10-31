import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../config";
import { Link, useParams } from "react-router-dom";

interface Server {
    id: number;
    name: string;
    description: string;
    category: string;
    icon: string;
    banner: string;
}

const ExploreServers = () => {
    const { categoryName } = useParams();
    const url = categoryName ? `/server/select/?category=${categoryName}`: "/server/select";
    const {dataCRUD, fetchData} = useCrud<Server>([], url);

    useEffect(() => {
        fetchData();
    }, [categoryName]);

    return <>
        <Container maxWidth="lg">
            <Box sx={{ pt: 4 }}>
                <Typography variant="h3" noWrap component={"h1"} sx={{display: {sm: "block", fontWeight: 700, letterSpacing: "-2px"}, textAlign: {xs: "center", sm: "left"}, textTransform: "capitalize"}}>
                    {categoryName ? categoryName: "Popular Servers"}
                </Typography>
            </Box>

            <Box>
                <Typography variant="h6" noWrap component={"h2"} color="textSecondary" sx={{display: {sm: "block", fontWeight: 500, letterSpacing: "-1px"}, textAlign: {xs: "center", sm: "left"}}}>
                    {categoryName ? `Servers talking about ${categoryName}`: "Checkout some of our popular servers"}
                </Typography>
            </Box>

            <Typography variant="h6" sx={{pt: 6, pb: 1, fontWeight: 700, letterSpacing: "-1px"}}>
                Recommended Servers
            </Typography>

            <Grid container spacing={{xs: 0, sm: 2}}>
                {dataCRUD.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={6} lg={3}>
                        <Card sx={{height: "100%", display: "flex", flexDirection: "column", backgroundImage: "none", boxShadow: "none", borderRadius: 0}}>
                            <Link to={`/server/${item.id}`} style={{textDecoration: "none", color: "inherit"}}>
                                <CardMedia component="img" image={item.banner ? `${MEDIA_URL}${item.banner}`: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} alt="random" sx={{display: {xs: "none", sm: "block"}, width: '100%', height: '150px', objectFit: 'cover'}} />
                                <CardContent sx={{ flexGrow: 1, p: 0, "&:last-child": {paddingBottom: 0}}}>
                                    <List >
                                        <ListItem >
                                            <ListItemIcon>
                                                <ListItemAvatar sx={{minWidth: "50px"}}>
                                                    <Avatar alt="Server Icon" src={`${MEDIA_URL}${item.icon}`} />
                                                </ListItemAvatar>
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={<Typography variant="body2" textAlign="start" sx={{fontWeight: 700, lineHeight: 1.2, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
                                                    {item.name}
                                                </Typography>}
                                                secondary={<Typography variant="body2">
                                                    {item.category}
                                                </Typography>}
                                            />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>
}

export default ExploreServers;