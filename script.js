import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load the environment variables
dotenv.config();

const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Get the latest block number
const blockNumber = await provider.getBlockNumber();
console.log("BlockNumber:", blockNumber, "\n");

// Get the block using the block number
const block = await provider.getBlock(blockNumber);
console.log("Block:", block, "\n");

// Get the balance of my address
// Unit conversion : https://eth-converter.com/
const myAddress = process.env.PUBLIC_KEY;
const balance = await provider.getBalance(myAddress);
console.log("Balance (wei):", balance);
console.log("Format Balance (eth):", ethers.formatEther(balance));
console.log("Format Balance (using decimals):", ethers.formatUnits(balance, 18));
console.log("Parse Balance (using ether):", ethers.parseUnits(ethers.formatEther(balance), "ether"));
console.log("Parse Balance (using decimals):", ethers.parseUnits(ethers.formatEther(balance), 18), "\n");

// Use transactions from wallet
console.log("Account Address read from wallet:", await signer.address, "\n");

// Sending ether to another address
const toAddress = process.env.PUBLIC_KEY_2;
const amountOfEther = ethers.parseUnits('0.001', 'ether');

const tx = await signer.sendTransaction({ to: toAddress, value: amountOfEther });
await tx.wait();
console.log("Transaction sent to:", toAddress, "with amount of ether:", amountOfEther, "\n");
