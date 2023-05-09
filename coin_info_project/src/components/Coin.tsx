import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Tabs = styled.div`
  display: grid;    
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Container = styled.div`
    padding: 0px 20px;
    margin: 0;
`
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Loader = styled.span`
    text-align: center;
    display: block;
`

const Title = styled.div`
font-size: 48px;
    color: ${props=>props.theme.accentColor};
`
const Button = styled.button<{ isDark: boolean }>`
  background-color: ${props=>props.isDark ? "white" : "black"}; /* Green */
  border: none;
  color: ${props => props.theme.bgColor};
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const BackButton = styled.button`
  float: left;
  background-color: #fff; /* White */
  border: none;
  color: #333; /* Dark gray */
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f2f2f2; /* Light gray */
  }
`;

interface ILocation {
    state:{
        name:string;
    };
}
interface InfoData{
    id: string ;
    name:    string ;
    symbol:    string ;
    rank:    number ;
    is_new:    boolean ;
    is_active:    boolean ;
    type:    string ;
    logo:    string ;
    description:    string ;
    message:    string ;
    open_source:    boolean ;
    started_at:    string ;
    development_status:    string ;
    hardware_wallet:    boolean ;
    proof_type:    string ;
    org_structure:    string ;
    hash_algorithm:    string ;
    first_data_at:    string ;
    last_data_at:    string ;
}

interface tickersData{ 
    
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        ath_date: string
        ath_price: number
        market_cap: number
        market_cap_change_24h: number
        percent_change_1h: number
        percent_change_1y: number
        percent_change_6h: number
        percent_change_7d: number
        percent_change_12h: number
        percent_change_15m: number
        percent_change_24h: number
        percent_change_30d: number
        percent_change_30m: number
        percent_from_price_ath: number
        price: number
        volume_24h: number
        volume_24h_change_24h: number
        USD: {
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
        };
    };
}

function Coin(){
    const {coinId}= useParams() as {coinId : string}

    const {state } = useLocation() as ILocation

    const {isLoading : infoLoading, data : infoData}=useQuery<InfoData>(["coinInfo",coinId],()=>fetchCoinInfo(coinId))

    const {isLoading : tickerLoading , data : tickerData}=useQuery<tickersData>(["tickerInfo",coinId],()=>fetchCoinTickers(coinId),{
        refetchInterval : 5000
    })

    const priceMatch = useMatch("/:coinId/price")
    const chartMatch = useMatch("/:coinId/chart")
    
    const loading = infoLoading || tickerLoading;
    const setDarkAtom=useSetRecoilState(isDarkAtom)

    const isDark=useRecoilValue(isDarkAtom)

    const toggleDarkAtom = () => setDarkAtom((prev)=>!prev);

    const navigate = useNavigate()
    const goToBack = () => navigate(-1)
    return (
        <Container>
            <BackButton><Link to={"/"}>Home</Link></BackButton>
            <BackButton onClick={goToBack}>Back</BackButton>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "LOADING" : infoData?.name}
                    <Button isDark={isDark} onClick={()=>toggleDarkAtom()}>{isDark ? "Light mode" : "Dark mode"}</Button>
                </Title>
            </Header>
            {loading ? <Loader>LOADING</Loader>
            : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                        <span>Price:</span>
                        <span>${tickerData?.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                        <span>Total Suply:</span>
                        <span>{tickerData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{tickerData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab isActive={chartMatch !== null }>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>

                    <Outlet context={{
                        coinId:coinId
                    }}></Outlet>
                </>
            )}
        </Container>
    )
}

export default Coin;