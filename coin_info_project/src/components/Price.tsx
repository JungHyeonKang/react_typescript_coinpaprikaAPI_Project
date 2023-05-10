import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";


interface PriceProps{
    coinId : string,  
}

interface IPriceData{ 
        
    priceData : { 
          ath_date: string;
          ath_price: number;
          market_cap: number;
          market_cap_change_24h: number;
          percent_change_1h: number;
          percent_change_1y: number;
          percent_change_6h: number;
          percent_change_7d: number;
          percent_change_12h: number;
          percent_change_15m: number;
          percent_change_24h: number;
          percent_change_30d: number;
          percent_change_30m: number;
          percent_from_price_ath: number;
          price: number;
          volume_24h: number;
          volume_24h_change_24h: number;
        }
        
};


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`;

const Box = styled.div`
  border-radius: 20px;
  height: 80px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  text-align: center;
`;



function Price(){
    const {priceData} = useOutletContext() as IPriceData ;
   console.log(priceData);
    
   

    return (
        <Container>
          <Box>ath_price : {priceData.ath_price}</Box>
          <Box>market_cap :  {priceData.market_cap}</Box>
          <Box>percent_change_15m : {priceData.percent_change_15m}</Box>
          <Box>percent_change_30m : {priceData.percent_change_30m}</Box>
          <Box>percent_change_1h : {priceData.percent_change_1h}</Box>
          <Box>percent_change_6h : {priceData.percent_change_6h}</Box>
          <Box>percent_change_24h : {priceData.percent_change_24h}</Box>
          <Box>percent_change_7d : {priceData.percent_change_7d}</Box>
          <Box>percent_change_30d : {priceData.percent_change_30d}</Box>
          <Box>percent_change_1y : {priceData.percent_change_1y}</Box>
        </Container>
      );
}
export default Price;