export const CONTRACT_ADDRESS = '0x04683e2b2b94939D4b5D40553eD19b6636e113fD'

export const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxhp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
    attackPower: characterData.attackPower.toNumber(),
  }
}

export const transformBossData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxhp.toNumber(),
    attack: characterData.attack.toNumber(),
    ratioAD: characterData.ratioAD.toNumber(),
    ratioAP: characterData.ratioAP.toNumber(),
  }
}
