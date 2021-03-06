import styled from 'styled-components'

export const SelectCharacterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`

export const CharacterGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
  grid-row-gap: 15px;
`

export const CharacterItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-self: center;
  align-self: center;
  img {
    height: 300px;
    width: 350px;
    border-radius: 10px;
    object-fit: cover;
  }
`

export const NameContainer = styled.div`
  position: absolute;
  background-color: #838383;
  border-radius: 5px;
  margin: 10px;
  p {
    margin: 0;
    padding: 5px 10px 5px 10px;
    font-weight: bold;
  }
`

export const CharacterMintButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: rgb(32, 129, 226);
  color: white;
  font-weight: bold;
  font-size: 16px;
`
