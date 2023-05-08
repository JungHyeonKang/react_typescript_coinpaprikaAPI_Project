import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";
import {useRecoilState} from "recoil"
import { Link } from "react-router-dom";


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Coin = styled.li`
  background-color: white;
    color: ${props=>props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover{
        a{
            color:${props => props.theme.accentColor}
        }
    }
`

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Loader = styled.span`
    text-align: center;
    display: block;
`
const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`
interface ICoin{
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}


function Coins(){

  const {isLoading,data}=useQuery<ICoin[]>(["allCoins"],fetchCoins)

 
    return (
        <Container>
            <Header>COINS</Header>
           {isLoading ? <Loader>Loading</Loader>
           : <CoinsList>
              {data?.slice(0,100).map(coin=>
                <Coin key={coin.id}>
                  <Link to={{
                      pathname:`/${coin.id}`,
                  }}
                    state={{
                      name : coin.name
                    }}>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt=""></Img>{coin.name} &rarr;
                  </Link>
                </Coin>
              )}
            </CoinsList>}
        </Container>
    )
}

export default Coins;