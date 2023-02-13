import React from "react";
import { HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <HStack bgColor={"blackAlpha.900"} p="4" shadow={"base"} spacing={"10"}>
        <Button variant={"unstyled"} color="white">
          <Link to="/">Home</Link>
        </Button>
        <Button variant={"unstyled"} color="white">
          <Link to="/exchanges">Exchanges</Link>
        </Button>
        <Button variant={"unstyled"} color="white">
          <Link to="/coins">Coins</Link>
        </Button>
      </HStack>
    </div>
  );
};

export default Header;
