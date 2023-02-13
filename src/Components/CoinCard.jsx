import React from "react";
import { Link } from "react-router-dom";
import { VStack, Image, Heading, Text } from "@chakra-ui/react";

const CoinCard = ({ id, name, img, price, symbol, currencySymbol }) => {
  return (
    <Link to={`/coin/${id}`}>
      <VStack
        w={"52"}
        m="4"
        p="8"
        shadow={"lg"}
        borderRadius={"lg"}
        transition={"all 0.2s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} />
        <Heading size={"md"} noOfLines={1}>
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;
