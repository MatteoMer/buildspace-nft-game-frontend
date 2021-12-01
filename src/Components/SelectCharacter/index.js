import React, { useEffect, useState } from 'react'
import './SelectCharacter.css'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants'
import myEpicGame from '../../utils/MyEpicGame.json'

import {
  CharacterGrid,
  CharacterItem,
  CharacterMintButton,
  NameContainer,
  SelectCharacterContainer,
} from './StyledComponents'

/*
 * Don't worry about setCharacterNFT just yet, we will talk about it soon!
 */
const SelectCharacter = ({ setCharacterNFT }) => {
  const [characters, setCharacters] = useState([])
  const [gameContract, setGameContract] = useState(null)

  useEffect(() => {
    if (!window.ethereum) {
      console.log('Ethereum object was not found')
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      myEpicGame.abi,
      provider.getSigner()
    )

    setGameContract(gameContract)
  }, [])

  useEffect(
    () => {
      if (!gameContract) {
        return
      }

      const getCharacter = async () => {
        const charactersTxn = await gameContract.getAllDefaultCharacters()
        console.log(`characterTxn : ${charactersTxn}`)

        const characters = charactersTxn.map((characterData) =>
          transformCharacterData(characterData)
        )

        setCharacters(characters)
      }
      const onCharacterMint = async (sender, tokenId, characterIndex) => {
        console.log(
          `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
        )

        if (gameContract) {
          const characterNFT = await gameContract.checkIfUserHasNFT()
          console.log('CharacterNFT: ', characterNFT)
          setCharacterNFT(transformCharacterData(characterNFT))
        }
      }

      gameContract.on('CharacterNFTMinted', onCharacterMint)

      getCharacter()

      return () => {
        if (gameContract) {
          gameContract.off('CharacterNFTMinted', onCharacterMint)
        }
      }
    },
    [gameContract] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const mintCharacterNFTAction = (characterId) => async () => {
    try {
      if (gameContract) {
        console.log('Minting character in progress...')
        const mintTxn = await gameContract.mintNFT(characterId)
        await mintTxn.wait()
        console.log('mintTxn:', mintTxn)
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error)
    }
  }

  const renderCharacters = () => {
    return characters.map((character, index) => (
      <CharacterItem key={character.name}>
        <NameContainer>
          <p>{character.name}</p>
        </NameContainer>
        <img src={character.imageURI} alt={character.name} />
        <CharacterMintButton
          type='button'
          className='character-mint-button'
          onClick={mintCharacterNFTAction(index)}
        >{`Mint ${character.name}`}</CharacterMintButton>
      </CharacterItem>
    ))
  }

  return (
    <SelectCharacterContainer>
      <h2>Mint Your Hero. Choose wisely.</h2>
      {characters.length > 0 && (
        <CharacterGrid>{renderCharacters()}</CharacterGrid>
      )}
    </SelectCharacterContainer>
  )
}

export default SelectCharacter
