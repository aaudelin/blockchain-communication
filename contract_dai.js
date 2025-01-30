import { ethers } from "ethers";
import dotenv from "dotenv";
import { readFileSync } from 'fs';
const abi = JSON.parse(readFileSync(new URL('./abi_dai.json', import.meta.url)));

// Load the environment variables
dotenv.config();

const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);
const contractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const contract = new ethers.Contract(contractAddress, abi, signer);

// List Transfer events
const events = await contract.queryFilter('Transfer', 21738617, 21738623);
console.log("Events: ", events);
