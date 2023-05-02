import styled from "styled-components";


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

function Coins(){
    return (
        <Container>
            <Header>COINS</Header>
            <CoinsList>
                
            </CoinsList>
        </Container>
    )
}

export default Coins;