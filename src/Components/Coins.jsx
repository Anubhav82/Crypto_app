import React, { useState, useEffect } from "react";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import axios from "axios";
import { server } from "../index";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = new Array(125).fill(1);

  const changePage = (clickedButn) => {
    if (clickedButn !== page) {
      setPage(clickedButn);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        console.log(data.data);
        setCoins(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) {
    return <ErrorComponent message={"Error while fetching coins"} />;
  }

  return (
    <div>
      <Container maxW={"container.xl"}>
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

            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {coins.map((i) => {
                return (
                  <CoinCard
                    id={i.id}
                    key={i.id}
                    name={i.name}
                    img={i.image}
                    price={i.current_price}
                    symbol={i.symbol}
                    currencySymbol={currencySymbol}
                  />
                );
              })}
            </HStack>
            <HStack padding={"8"} overflowX={"scroll"}>
              {btns.map((item, index) => {
                return (
                  <Button
                    key={index}
                    bgColor={"blackAlpha.900"}
                    color="white"
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </HStack>
          </>
        )}
      </Container>
    </div>
  );
};

export default Coins;
