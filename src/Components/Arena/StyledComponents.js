import styled from 'styled-components'

export const ArenaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  color: white;
`

export const BossContainer = styled(ArenaContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 50px;
`

export const BossContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 10px;
  background-image: linear-gradient(
    to right,
    #ff8177 0%,
    #ff867a 0%,
    #ff8c7f 21%,
    #f99185 52%,
    #cf556c 78%,
    #b12a5b 100%
  );
  background-size: 600% 600%;
  animation: gradient-animation 8s ease infinite;
  margin-bottom: 25px;
  h2 {
    margin: 0;
    padding: 5px 0 10px 0;
  }
`

export const BossImageContent = styled.div`
  position: relative;
  img {
    width: 350px;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
  }
`

export const HealthBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  progress[value] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 100%;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #e5652e;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    overflow: hidden;
  }

  progress[value]::-webkit-progress-value {
    background-color: #70cb1b;
  }

  p {
    position: absolute;
    width: 100%;
    font-weight: bold;
    color: black;
    bottom: -10px;
  }
`
export const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`

export const Player = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80%;
  padding: 10px;
  border-radius: 10px;
  background-color: gray;
`
export const PlayerImageContent = styled.div`
  position: relative;
  img {
    width: 250px;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
  }
`

export const ActivePlayers = styled.div`
  display: flex;
  flex-direction: column;
`

export const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow: scroll;
`

export const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
