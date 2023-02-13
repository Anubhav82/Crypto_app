import { Box, HStack, VStack, Heading, Text, Avatar } from "@chakra-ui/react";
import React from "react";
import img2 from "../Assets/img2.jpg";

const Footer = () => {
  return (
    <Box minH={"32"} bgColor="black" color={"white"} position={"sticky"}>
      <HStack justifyContent={"space-between"} p={"4"}>
        <VStack
          alignItems={"flex-start"}
          borderRight={"2px"}
          p={"4"}
          w={"full"}
        >
          <Heading>About Us</Heading>
          <Text>
            We are the best crypto trading app in India, we provide our guidance
            at a very cheap price.
          </Text>
        </VStack>
        <VStack p={"4"} w={"full"}>
          <Avatar boxSize={"20"} src={img2} />
          <Text>Created by </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Footer;
