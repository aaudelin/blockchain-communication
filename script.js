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

// Sending ether to another address - Uncomment to send
const toAddress = process.env.PUBLIC_KEY_TO;
const amountOfEtherToSend = ethers.parseUnits('0.001', 'ether');

// On recoit en promesse la validation que le noeud l'a recu et qu'elle 
// est en attente d'inclusion dans un block
// const tx = await signer.sendTransaction({ to: toAddress, value: amountOfEtherToSend });
// console.log("Transaction sent to:", tx);

// On recoit en promesse la validation que la transaction a été inclu dans un block
// const receipt = await tx.wait();
// console.log("Receipt:", receipt);
// console.log("Transaction sent to:", toAddress, "with amount of ether:", amountOfEtherToSend, "\n");

// Get Nonce
const nonce = await signer.getNonce();
console.log("Nonce:", nonce, "\n");
// Send transaction with nonce
// const txNonce = await signer.sendTransaction({ to: toAddress, value: amountOfEtherToSend, nonce: 127 });
// await txNonce.wait();
// console.log("Transaction sent to:", toAddress, "with amount of ether:", amountOfEtherToSend, "and nonce:", 127, "\n");

// Handle transaction gas price according to the type of transaction
// const txType0 = await signer.sendTransaction({ to: toAddress, value: amountOfEtherToSend, type: 0, gasPrice: 146770015057n });
// const txType2 = await signer.sendTransaction({
// 	to: toAddress,
// 	value: amountOfEtherToSend,
// 	type: 2,
// 	maxPriorityFeePerGas: 1000000000n,
// 	maxFeePerGas: 293129392002n
// });

// To determine the current gas price
const feeData = await provider.getFeeData();
console.log("Fee Data:", feeData);
// For Type 0
// Pour accélérer tu peux faire *1.1 à 1.5
// Pour économiser tu peux faire *0.9 à 0.7
const newFeeDataType0 = feeData.gasPrice * 11n / 10n;

// For Type 2
// Pour accélérer tu peux faire *1.5 à 3
const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas * 2n;
const newFeeDataType2 = {
	maxPriorityFeePerGas: maxPriorityFeePerGas,
	maxFeePerGas: feeData.maxFeePerGas - feeData.maxPriorityFeePerGas + maxPriorityFeePerGas
}
console.log("New Fee Data (Type 0):", newFeeDataType0);
console.log("New Fee Data (Type 2):", newFeeDataType2, "\n");

// Gas Limit
// const txGasLimit = await signer.sendTransaction({
// 	to: toAddress,
// 	value: amountOfEtherToSend,
// 	gasLimit: 1000n
// });
// await txGasLimit.wait();
// console.log("Transaction sent to:", toAddress, "with amount of ether:", amountOfEtherToSend, "and gas limit:", 21000n, "\n");

// Estimate gas price
const estimate = await signer.estimateGas({
    to: toAddress,
    value: amountOfEtherToSend,
    maxFeePerGas: newFeeDataType2.maxFeePerGas,
    maxPriorityFeePerGas: newFeeDataType2.maxPriorityFeePerGas
  });
console.log("Estimate gas price:", estimate, "\n");

// Read executed transaction
const transactionHash = "0x2316429c089c8264135d6bc0b04d143f6b00cdb21b6d47825f0f27f45f0ecf8d";
const tx = await provider.getTransaction(transactionHash);
const receipt = await provider.getTransactionReceipt(transactionHash);
console.log("Transaction read:", tx);
console.log("Receipt read:", receipt, "\n");
