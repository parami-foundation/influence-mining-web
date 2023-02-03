import { PARAMI_AIRDROP } from "../models/parami";

const _fetch = async (input: RequestInfo | URL, address: string, init?: RequestInit) => {
  const options = init ?? {};
  return fetch(input, {
    ...options,
    headers: {
      ...options.headers,
      wallet: address,
      sessionSig: localStorage.getItem('sessionSig') as string,
      sessionExpirationTime: localStorage.getItem('sessionExpirationTime') as string
    }
  })
}

export type Balance = {
  total: string;
  withdrawable: string;
  locked: string;
}

export type Influence = {
  influence: number;
  twitFollowerCount: number;
  twitCountWithHnftTag: number;
  ad3Balance: number;
  accountReferalCount: number;
  pluginReferalCount: number;
  updatedTime: number;
  beginMiningTime: number;
  hNFTContractAddr: string;
  hNFTTokenId: string;
  twitterProfileImageUri: string;
}

export type Ad3Tx = {
  id: string;
  timestamp: number;
  type: string;
  diff: number;
}

export type InfluenceTransaction = {
  timestamp: number;
  type: string;
  diff: number;
}

export interface PoolSummary {
  totalInfluence: string;
  currentDailyOutput: string;
}

export interface WithdrawAd3Signature {
  to: string;
  chain_id: string;
  amount: string;
  nounce: string;
  sig: string;
}

export const bindAccount = async (address: string, chainId: number, oauthToken: string, oauthVerifier: string, referer?: string) => {
  const data = JSON.stringify({
    wallet: address,
    chainId,
    oauth_token: oauthToken,
    oauth_verifier: oauthVerifier,
    refererWallet: referer
  });

  const resp = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/accounts`, address, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });

  if (resp.ok) {
    return {
      success: true
    }
  }

  const { message } = await resp.json() as { message: string };
  return {
    success: false,
    message
  }
}

export const startMining = async (address: string, chainId: number, hnftContract: string, hnftTokenId: string) => {
  try {
    const data = JSON.stringify({
      wallet: address,
      chain_id: chainId,
      hNFTContractAddr: hnftContract,
      hNFTTokenId: hnftTokenId
    });

    const resp = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/accounts/current/beginmining`, address, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    return await resp.json();
  } catch (_) {
    return true;
  }
}

export const getAd3Balance = async (address: string, chainId: number) => {
  const res = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/ad3?wallet=${address}&chain_id=${chainId}`, address);
  const balance = await res.json();
  return balance as Balance;
}

export const getAd3Transactions = async (address: string, chainId: number) => {
  const res = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/ad3/transactions?wallet=${address}&chain_id=${chainId}`, address);
  const txs = await res.json();
  return txs as Ad3Tx[];
}

export const getInfluence = async (address: string, chainId: number) => {
  const resp = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/influence?wallet=${address}&chain_id=${chainId}`, address);
  const influence = await resp.json() as Influence;

  if (resp.ok) {
    return {
      ...influence
    };
  }

  return null;
}

export const updateInfluence = async (address: string, chainId: number) => {
  const data = JSON.stringify({ wallet: address, chain_id: chainId });
  const resp = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/influence`, address, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });
  return await resp.json();
}

export const getInfluenceTransactions = async (address: string, chainId: number) => {
  const resp = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/influence/transactions?wallet=${address}&chain_id=${chainId}`, address);
  const txs = await resp.json();
  return txs as InfluenceTransaction[];
}

export const getPoolSummary = async (address: string) => {
  const resp = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/pool/summary`, address);
  const summary = await resp.json();
  return summary as PoolSummary;
}

export const generateWithdrawSignature = async (address: string, chainId: number, amount: string) => {
  const resp = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/ad3/withdrawals?chain_id=${chainId}&amount=${amount}`, address, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const sig = await resp.json();
  return sig as WithdrawAd3Signature;
}

export const getWithdrawSignatureOfTxId = async (txId: string, chainId: number, address: string) => {
  const resp = await _fetch(`${PARAMI_AIRDROP}/influencemining/api/ad3/withdrawals/${txId}?chain_id=${chainId}`, address);
  const sig = await resp.json();
  return sig as WithdrawAd3Signature;
}

export const getIMAccountOfBillboard = async (contractAddress: string, tokenId: string) => {
  return new Promise((res) => {
    res({
      influence: 125,
      nftImage: 'https://i.seadn.io/gcs/files/3b34b743096f0e5c201c3a7b38e1f795.png?auto=format&w=1000'
    })
  })
}