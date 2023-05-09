import fetchJsonp from "fetch-jsonp";
import { OFFICIAL_TAG, PARAMI_AIRDROP } from "../models/parami";
import { fetchWithCredentials, fetchWithSig } from "../utils/api.util";

const DEFAULT_TWEET = `Become a mining node by leveraging your social influence to earn revenue. ${OFFICIAL_TAG}`;

export interface SponsoredTag {
  tag: string;
  link: string;
  description: string;
}

const DEFAULT_SPONSORED_TAGS: SponsoredTag[] = [
  {
    tag: 'MirrorWorld',
    link: 'https://mirrorworld.fun/',
    description: 'Smart Platform by Mirror World is the first all-in-one application development platform that helps developers develop, grow and monetize their blockchain applications.'
  }, {
    tag: 'KNN3',
    link: 'https://www.knn3.xyz/',
    description: 'KNN3 Network is a one-stop Web3 User-centric DataFi solution for d/Apps and smart contracts. KNN3 allows d/Apps & smart contracts to interact with cross-platform user-centric data in multiple algo-friendly ways.'
  }, {
    tag: 'CultDAO',
    link: 'https://cultdao.io/',
    description: 'The purpose of CULT is to empower and fund those building and contributing towards our decentralized future. Our society is built to make it as difficult as possible to break away from societal, economic and other norms.'
  }
];

export interface OembedTweet {
  tweetId: string;
  authorName: string;
  authorUrl: string;
  html: string;
  tweetUrl: string;
  tweetContent: string;
}

export const fetchOembedTweet = async (tweetId: string) => {
  const resp = await fetchJsonp(`https://publish.twitter.com/oembed?url=https://twitter.com/twitter/status/${tweetId}&hide_media=true&hide_thread=true&omit_script=true`).catch((error) => {
    console.log('fetch tweet error', error);
    return null;
  });
  if (!resp) {
    return null;
  }
  const tweetJson = await resp.json();

  const parser = new DOMParser();
  const doc = parser.parseFromString(tweetJson.html, 'text/html');
  const tweetContent = doc.querySelector('blockquote p')?.textContent;
  return {
    authorName: tweetJson.author_name,
    authorUrl: tweetJson.author_url,
    html: tweetJson.html,
    tweetUrl: tweetJson.url,
    tweetContent,
    tweetId
  } as OembedTweet;
}

export const generateReplyTweetContent = async (replyTweetId: string) => {
  try {
    const resp = await fetchWithCredentials(`${PARAMI_AIRDROP}/influencemining/api/tweets/${replyTweetId}/reply`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!resp) {
      return DEFAULT_TWEET;
    }
    const tweet = await resp.json();
    return tweet;
  } catch (e) {
    return DEFAULT_TWEET;
  }
}

export const generateTweetContent = async (tag?: string) => {
  try {
    const resp = await fetchWithCredentials(`${PARAMI_AIRDROP}/influencemining/api/tweets${tag ? `?hashtag=${encodeURIComponent(tag)}` : ''}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!resp) {
      return DEFAULT_TWEET;
    }
    const tweet = await resp.json();
    return tweet;
  } catch (e) {
    return DEFAULT_TWEET;
  }
}

export const getSponsoredTags = async () => {
  return DEFAULT_SPONSORED_TAGS;
  // try {
  //   const resp = await fetchWithCredentials(`${PARAMI_AIRDROP}/influencemining/api/sponsoredtags`);
  //   if (!resp) {
  //     return DEFAULT_SPONSORED_TAGS;
  //   }
  //   const tags = await resp.json();
  //   return tags;
  // } catch (e) {
  //   return DEFAULT_SPONSORED_TAGS;
  // }
}