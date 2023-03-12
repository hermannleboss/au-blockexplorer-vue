// Optional Config object, but defaults to demo api-key and eth-mainnet.
import {Alchemy, Network} from "alchemy-sdk";

const settings = {
    apiKey: import.meta.env.VITE_API_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
};

export const alchemy = new Alchemy(settings);