import styled from 'styled-components'

export const AppContainer = styled.div`
  height: 100vh;
  background-color: #0d1116;
  overflow: scroll;
  text-align: center;
`

export const Container = styled.div`
  height: 100%;
  background-color: #0d1116;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const HeaderContainer = styled.div`
  padding-top: 30px;
`

export const Header = styled.p`
  margin: 0;
  font-size: 50px;
  font-weight: bold;
  color: white;
`

export const SubText = styled.p`
  font-size: 25px;
  color: white;
`

export const ContentContainer = styled.div`
  background-color: #a200d6;
`

export const CtaButton = styled.button`
  height: 45px;
  border: 0;
  width: auto;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: white;
`

export const ConnectWalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 550px;
  img {
    padding-bottom: 20px;
  }
`

export const ConnectWalletButton = styled(CtaButton)`
  background-image: linear-gradient(
    to right,
    #ff8177 0%,
    #ff867a 0%,
    #ff8c7f 21%,
    #f99185 52%,
    #cf556c 78%,
    #b12a5b 100%
  );
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
`

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`

export const TwitterLogo = styled.img`
  width: 35px;
  height: 35px;
`

export const FooterText = styled.a`
  color: white;
  font-size: 16px;
  font-weight: bold;
`