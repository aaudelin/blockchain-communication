import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load the environment variables
dotenv.config();

const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(url);

// Get the latest block number
const blockNumber = await provider.getBlockNumber();
console.log("BlockNumber:", blockNumber, "\n");

// Get the block using the block number
const block = await provider.getBlock(blockNumber);
console.log("Block:", block, "\n");

// Get the balance of my address
const myAddress = "0x73096Ed178C96e7096Ad3329Fd092be3D16A725E";
const balance = await provider.getBalance(myAddress);
console.log("Balance (wei):", balance);
console.log("Balance (eth):", ethers.formatEther(balance));
console.log("Balance (using decimals):", ethers.formatUnits(balance, 18), "\n");
// Unit conversion : https://eth-converter.com/
