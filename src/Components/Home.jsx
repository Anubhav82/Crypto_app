import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";
import img1 from "../Assets/img1.jpg";

const Home = () => {
  return (
    <Box>
      <Heading
        position={"absolute"}
        color={"orange"}
        mt={"10%"}
        p={"4"}
        ml={"8"}
        fontSize={"6xl"}
      >
        Crypto App
      </Heading>

      <Heading
        position={"absolute"}
        color={"white"}
        w={"70vh"}
        mt={"20%"}
        ml={"55"}
        fontSize={"4xl"}
      >
        KNOW EVERYTHING ABOUT
      </Heading>
      <Heading
        position={"absolute"}
        color={"orange"}
        mt={"22%"}
        p={"4"}
        ml={"8"}
        fontSize={"6xl"}
      >
        CRYPTOCURRENCY
      </Heading>
      <Image src={img1} h="100vh" w={"full"} objectFit={"cover"} />
    </Box>
  );
};

export default Home;
