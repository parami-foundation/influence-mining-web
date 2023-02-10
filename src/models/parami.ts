// export const PARAMI_AIRDROP = 'https://airdrop.parami.io';
export const PARAMI_AIRDROP = 'https://staging.parami.io/airdrop';

// export const PARAMI_WALLET = 'https://app.parami.io';
export const PARAMI_WALLET = 'http://local.parami.io:1024';

// export const PARAMI_SUBQUERY = 'https://graph.parami.io';
export const PARAMI_SUBQUERY = 'https://staging.parami.io/graph/';

export const IM_SUBQUERY = 'https://staging.parami.io/airdrop/influencemining/api/graphql';

export const EIP5489ForInfluenceMiningContractAddress = '0x38e151C51fa45779a4DF8Ce0b7F9E051fF389D99'; // goerli

export const AD3ContractAddress = '0x69E6f759583b839b806b7BD20882376829CA37D8'; // goerli

export const SignatureERC20WithdrawContractAddress = '0x1857EDf319E40cD231af46e1b72DA5f9725051aF'; // goerli

export enum AD3TxType {
  DEPOSITE_WITHDRAWABLE = 'deposit_withdrawable',
  DEPOSITE_LOCKED = 'deposit_locked'
}

export enum POST_MESSAGE {
  NFT_IMPORTED = 'ParamiWallet::ImportSuccess',
  AD_BID = 'ParamiWallet::BidSuccess',
  NFT_MINT = 'ParamiWallet::NftMintSuccess',
  ADD_LIQUIDITY = 'ParamiWallet::AddLiquidity',
  IM_POOL_CREATED = 'ParamiWallet::IMPoolCreated'
}

export const BillboardLevel2Name: {[level: string]: string} = {
  '0': 'Novel',
  '1': 'Rare',
  '2': 'Premium',
  '3': 'Epic',
  '4': 'Legendary'
}

export const BillboardLevel2MiningPower: {[level: string]: number} = {
  '0': 20,
  '1': 50,
  '2': 100,
  '3': 200,
  '4': 400
}
