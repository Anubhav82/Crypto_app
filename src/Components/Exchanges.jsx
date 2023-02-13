import React, { useState, useEffect } from "react";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { server } from "../index";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const data = await axios.get(`${server}/exchanges`);
        console.log(data.data);
        setExchanges(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  if (error) {
    return <ErrorComponent message={"Error while fetching exchanges"} />;
  }

  return (
    <div>
      <Container maxW={"container.xl"}>
        {isLoading ? (
          <Loader />
        ) : (
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => {
              return (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              );
            })}
          </HStack>
        )}
      </Container>
    </div>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
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
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
