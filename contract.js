import { ethers } from "ethers";
import dotenv from "dotenv";
import { readFileSync } from 'fs';
const abi = JSON.parse(readFileSync(new URL('./abi.json', import.meta.url)));

// Load the environment variables
dotenv.config();

const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);
const fromAddress = process.env.PUBLIC_KEY;
const toAddress = process.env.PUBLIC_KEY_TO;
const contractAddress = process.env.CONTRACT_ADDRESS;
const amount = 100n;
const contract = new ethers.Contract(contractAddress, abi, signer);

const name = await contract.name();
const totalSupply = await contract.totalSupply();
const balance = await contract.balanceOf(toAddress);
const decimals = await contract.decimals();

const formattedBalance = ethers.formatUnits(balance, decimals);

const estimate = await contract.transfer.estimateGas(toAddress, amount);
const feeData = await provider.getFeeData();


console.log("Estimate: ", estimate);
console.log("Fee Data: ", feeData);

// Send transaction with gas limit and fee data
const tx = await contract.transfer(toAddress, amount, {
    gasLimit: 21577n,
    maxFeePerGas: feeData.maxFeePerGas - feeData.maxPriorityFeePerGas + 1n,
    maxPriorityFeePerGas: 1n,
});
console.log("Hash: ", tx.hash);
const receipt = await tx.wait();


// List Transfer events
const events = await contract.queryFilter('Transfer', 7377841, 7378028);

