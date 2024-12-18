import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load the environment variables
dotenv.config();

console.log(process.env.ALCHEMY_API_KEY);

const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(url);

// Get the latest block number
const blockNumber = await provider.getBlockNumber();
console.log(blockNumber);

// Get the block using the block number
const block = await provider.getBlock(blockNumber);
console.log(block);
