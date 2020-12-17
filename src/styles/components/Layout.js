import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../global/GlobalStyles';
import theme from '../global/mainTheme';

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  align-items: center;
  justify-content: center;

  min-height: 100vh;
`;

const TitleContainer = styled.div`
  position: relative;
  padding: 60px;
  height: 100%;
  width: 100%;

  h1 {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 768px) {
      position: static;
      transform: none;
    }
  }
`;

const MainContainer = styled('main')`
  padding: 60px;
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <GridDiv>
        <TitleContainer>
          <h1>Search & Replace</h1>
        </TitleContainer>
        <MainContainer>{children}</MainContainer>
      </GridDiv>
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Layout;
