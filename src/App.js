import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  background-color: #333; /* Dark grey header background */
  color: #fff; /* White text color */
  padding: 20px;
  text-align: center;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 20px;
`;

const Box = styled.div`
  width: 30%;
  margin: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
  }
  img {
    width: 100px; 
    height: auto; 
    margin-right: 20px; 
`;

function App() {
  return (
    <div className="app">
      <Header>
        <img
          src="https://i.ibb.co/D9X3PHh/sisolution-company.png"
          alt="ISolution Logo"
        />
        <h1>Welcome to ISolution Thailand</h1>
      </Header>

      <Main>
        <Container>
          <Box>
            <img
              src="https://i.ibb.co/D9X3PHh/sisolution-company.png"
              alt="ISolution Logo"
            />
            <h2>ISolution Header 1</h2>
            <p>ISolution content 1</p>
          </Box>
          <Box>
            <img
              src="https://i.ibb.co/D9X3PHh/sisolution-company.png"
              alt="ISolution Logo"
            />
            <h2>ISolution Header 2</h2>
            <p>ISolution content 2</p>
          </Box>
          <Box>
            <img
              src="https://i.ibb.co/D9X3PHh/sisolution-company.png"
              alt="ISolution Logo"
            />
            <h2>ISolution Header 3</h2>
            <p>ISolution content 3</p>
          </Box>
        </Container>
      </Main>

    </div>
  );
}

export default App;