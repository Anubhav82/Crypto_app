import {
  Text,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";

const CoinDetails = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const data = await axios.get(`${server}/coins/${params.id}`);
        console.log(data.data);
        setCoin(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchCoin();
  }, [params.id]);

  if (error) {
    return <ErrorComponent message={"Error while fetching coin data"} />;
  }

  return (
    <Container maxW={"container.xl"} shadow={"dark-lg"}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup
            size={"lg"}
            p={"4"}
            value={currency}
            onChange={setCurrency}
          >
            <HStack>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack p="16" alignItems={"flex-start"}>
            <Text fontSize={"lg"} alignSelf={"center"}>
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <HStack w={"full"} justifyContent={"space-between"}>
              <Image src={coin.image.large} />
              <Text
                fontSize={"4xl"}
              >{`Coingecko Scroe : ${coin.coingecko_score}`}</Text>
            </HStack>

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.900"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"}>
              <Item
                title={"Total Volume"}
                value={coin.market_data.total_volume[currency]}
              />

              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={coin.market_data.market_cap[currency]}
              />
              <Item
                title={"All Time Low"}
                value={coin.market_data.atl[currency]}
              />

              <Item
                title={"All Time High"}
                value={coin.market_data.ath[currency]}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} mt={"4"} shadow={"lg"}>
      <Text fontFamily={"sans-serif"} fontSize={"xl"}>
        {title}
      </Text>
      <Text fontSize={"xl"}>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
