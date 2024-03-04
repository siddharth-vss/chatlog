import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import { useAppContext } from "../context/appContext";
import ScrollableChat from "./ScrollableChat";

const SingleChatHelper = ({ messages, istyping, loading }) => {
  const { BGI, style } = useAppContext();
  return (
    <>
      {BGI === null || BGI === undefined || BGI === "" ? (
        <Box
          style={{
            background: "#E8E8E8",
          }}
          d="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          bg="#E8E8E8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {loading ? (
            <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
          ) : (
            <div className="messages  ">
              <ScrollableChat messages={messages} />
            </div>
          )}

          {istyping ? (
            <div>
              <Box
                width={70}
                style={{
                  marginBottom: 15,
                  background: "#F0F0F0",
                  borderRadius: "10px",
                  top: "-20px",
                  position: "relative",
                  marginLeft: 0,
                }}
              >
                typing ...
              </Box>
            </div>
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <Box
          style={{
            ...style,
          }}
          d="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          // bg={ bgi ? bgi :"#E8E8E8"}
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {loading ? (
            <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
          ) : (
            <div className="messages ">
              <ScrollableChat messages={messages} />
            </div>
          )}

          {istyping ? (
            <div>
              <Box
                width={70}
                style={{
                  marginBottom: 15,
                  background: "#F0F0F0",
                  borderRadius: "10px",
                  top: "-20px",
                  position: "relative",
                  marginLeft: 0,
                }}
              >
                typing ...
              </Box>
            </div>
          ) : (
            <></>
          )}
        </Box>
      )}
    </>
  );
};

export default SingleChatHelper;
