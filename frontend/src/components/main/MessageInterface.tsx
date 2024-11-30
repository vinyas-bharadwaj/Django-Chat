import { useParams } from "react-router-dom";
import { server } from "../../@types/server";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels";
import { useTheme } from "@mui/material/styles";
import Scroll from "./Scroll";
import useChatWebSocket from "../../services/ChatService";

interface SendMessageData {
  type: string;
  message: string;
  [key: string]: any;
}

interface ServerChannelProps {
  data: server[];
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const MessageInterface = (props: ServerChannelProps) => {
  const { data } = props;
  const theme = useTheme();
  const server_name = data?.[0]?.name ?? "Server";
  const { serverId, channelId } = useParams();
  const { newMessage, message, setMessage, sendJsonMessage } = useChatWebSocket(
    channelId || "",
    serverId || ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendJsonMessage({
      type: "message",
      message,
    } as SendMessageData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendJsonMessage({
        type: "message",
        message,
      } as SendMessageData);
    }
  };

  const formatTimeStamp = (timestamp: string): string => {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} - ${formattedTime}`;
  };

  return (
    <>
      <MessageInterfaceChannels data={data} />
      {channelId === undefined ? (
        <Box
          sx={{
            overflow: "hidden",
            p: { xs: 0 },
            height: `calc(80vh)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing={"-0.5px"}
              sx={{ px: 5, maxWidth: "600px" }}
            >
              Welcome to {server_name}
            </Typography>
            <Typography>
              {data?.[0]?.description ?? "This is our home"}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ overflow: "hidden", p: 0, height: `calc(100vh - 100px)` }}>
            <Scroll>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {newMessage.map((msg: Message, index: number) => {
                  return (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          sx={{ height: "40px", width: "40px" }}
                          alt="User Image"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: "12px",
                          variant: "body2",
                        }}
                        primary={
                          <>
                            <Typography
                              component="span"
                              variant="body1"
                              color="text.primary"
                              sx={{ display: "inline", fontWeight: "600" }}
                            >
                              {msg.sender}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                            >
                              {" " + formatTimeStamp(msg.timestamp)}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body1"
                              style={{
                                overflow: "visible",
                                whiteSpace: "normal",
                                textOverflow: "clip",
                              }}
                              sx={{
                                display: "inline",
                                lineHeight: 1.2,
                                fontWeight: 400,
                                letterSpacing: "-0.2px",
                              }}
                              color="text.primary"
                              component="span"
                            >
                              {msg.content}
                            </Typography>
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Scroll>
          </Box>
          <Box sx={{ position: "sticky", bottom: 0, width: "100%" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                bottom: 0,
                right: 0,
                padding: "1rem",
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TextField
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  fullWidth
                  multiline
                  minRows={1}
                  maxRows={4}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default MessageInterface;
