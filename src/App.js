import React, { useEffect, useState } from 'react'
import twitterLogo from './assets/twitter-logo.svg'
import SelectCharacter from './Components/SelectCharacter'
import Arena from './Components/Arena'
import './App.css'
import myEpicGame from './utils/MyEpicGame.json'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, transformCharacterData } from './constants'
import LoadingIndicator from './Components/LoadingIndicator'

import {
  AppContainer,
  ConnectWalletButton,
  ConnectWalletContainer,
  Container,
  Header,
  HeaderContainer,
  SubText,
  FooterContainer,
  TwitterLogo,
  FooterText,
} from './StyledComponents'

// Constants
const TWITTER_HANDLE = 'Matteo_Mer'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [characterNFT, setCharacterNFT] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      setIsLoading(false)
      return false
    }
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })

    if (!accounts.length) {
      console.log('Make sure you have an authorized account.')
      return true
    }

    setCurrentAccount(accounts[0])
    setIsLoading(false)
  }

  const connectWalletAction = async () => {
    if (!window.ethereum) return

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    if (!accounts.length) return
    setCurrentAccount(accounts[0])
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator />
    }

    if (!currentAccount) {
      return (
        <ConnectWalletContainer>
          <img
            src='https://i.giphy.com/media/XeADytK2sCiix4ojn1/giphy.webp'
            alt='The Witcher gif'
          />
          <ConnectWalletButton onClick={connectWalletAction}>
            Connect Wallet To Get Started 🧙‍♂️
          </ConnectWalletButton>
        </ConnectWalletContainer>
      )
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />
    } else if (currentAccount && characterNFT) {
      return (
        <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
      )
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (checkIfWalletIsConnected() === false) {
      console.log(
        'Please make sure you have Metamask installed and an authorized account setup'
      )
    }
  }, [])

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currentAccount)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        provider.getSigner()
      )
      const txn = await gameContract.checkIfUserHasNFT()

      if (txn !== null && txn.name) {
        console.log('yey')
        setCharacterNFT(transformCharacterData(txn))
      } else {
        console.log('No character found.')
      }
    }

    setIsLoading(false)

    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount)
      fetchNFTMetadata()
    }
  }, [currentAccount])

  return (
    <AppContainer>
      <Container>
        <HeaderContainer>
          <Header>⚔️ The Witcher game ⚔️</Header>
          <SubText>Team up to defeat all the bosses!</SubText>
          <ConnectWalletContainer>{renderContent()}</ConnectWalletContainer>
        </HeaderContainer>
        <FooterContainer>
          <TwitterLogo alt='Twitter Logo' src={twitterLogo} />
          <FooterText
            href={TWITTER_LINK}
            target='_blank'
            rel='noreferrer'
          >{`built by @${TWITTER_HANDLE}`}</FooterText>
        </FooterContainer>
      </Container>
    </AppContainer>
  )
}

export default App
