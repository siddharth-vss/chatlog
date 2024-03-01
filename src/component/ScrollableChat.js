import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
// import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { useAppContext} from "../context/appContext";
import { Box } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const {  id } = useAppContext();
    return (
    <Box id="chatfeed">
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, id) ||
              isLastMessage(messages, i, id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, id),
                marginTop: isSameUser(messages, m, i, id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
              dangerouslySetInnerHTML={{__html: m.content}}
            >
              {/* {m.content} */}
            </span>
          </div>
        ))}
    </Box>
  );
};

export default ScrollableChat;
