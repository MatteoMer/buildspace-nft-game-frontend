import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, transformBossData } from '../../constants'
import myEpicGame from '../../utils/MyEpicGame.json'
import './Arena.css'
import {
  ArenaContainer,
  BossContainer,
  BossContent,
  HealthBar,
  BossImageContent,
  PlayersContainer,
  PlayerImageContent,
  Player,
} from './StyledComponents'

const Arena = ({ characterNFT, setCharacterNFT }) => {
  const [gameContract, setGameContract] = useState(null)
  const [actualBoss, setActualBoss] = useState(null)

  useEffect(() => {
    if (!window.ethereum) {
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

  useEffect(() => {
    if (!gameContract) {
      return
    }
    const fetchBoss = async () => {
      const bossTxn = await gameContract.getBoss()
      console.log('Boss:', bossTxn)
      if (bossTxn) setActualBoss(transformBossData(bossTxn))
    }

    const onBossMinted = async (bossId, bossName) => {
      fetchBoss()
    }

    const onAttack = async (newBossHp, newPlayerHp) => {
      const bossHp = newBossHp.toNumber()
      const playerHp = newPlayerHp.toNumber()

      setActualBoss((prevState) => {
        return { ...prevState, hp: bossHp }
      })

      setCharacterNFT((prevState) => {
        return { ...prevState, hp: playerHp }
      })
    }
    fetchBoss()
    gameContract.on('NewBoss', onBossMinted)
    gameContract.on('AttackComplete', onAttack)

    return () => {
      if (gameContract) {
        gameContract.off('NewBoss', onBossMinted)
        gameContract.off('AttackComplete', onAttack)
      }
    }
  }, [gameContract]) // eslint-disable-line react-hooks/exhaustive-deps

  const runAttackAction = async () => {
    if (!gameContract) return
    const attackTxn = await gameContract.attackBoss()
    await attackTxn.wait()
  }

  return (
    <ArenaContainer>
      {/* Boss */}
      {actualBoss && (
        <BossContainer>
          <BossContent>
            <h2>🔥 {actualBoss.name} 🔥</h2>
            <BossImageContent>
              <img src={actualBoss.imageURI} alt={`Boss ${actualBoss.name}`} />
              <HealthBar>
                <progress value={actualBoss.hp} max={actualBoss.maxhp} />
                <p>{`${actualBoss.hp} / ${actualBoss.maxHp} HP`}</p>
              </HealthBar>
            </BossImageContent>
          </BossContent>
          <div className='attack-container'>
            <button className='cta-button' onClick={runAttackAction}>
              {`💥 Attack ${actualBoss.name}`}
            </button>
          </div>
        </BossContainer>
      )}

      {/* Character NFT */}
      {characterNFT && (
        <PlayersContainer>
          <div>
            <h2>Your Character</h2>
            <Player>
              <PlayerImageContent>
                <h2>{characterNFT.name}</h2>
                <img
                  src={characterNFT.imageURI}
                  alt={`Character ${characterNFT.name}`}
                />
                <HealthBar>
                  <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                  <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
                </HealthBar>
              </PlayerImageContent>
              <div>
                <h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
                <h4>{`⚔️ Attack Power: ${characterNFT.attackPower}`}</h4>
              </div>
            </Player>
          </div>
        </PlayersContainer>
      )}
    </ArenaContainer>
  )
}

export default Arena
