import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load the environment variables
dotenv.config();

const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(url);
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);
const fromAddress = process.env.PUBLIC_KEY;
const toAddress = process.env.PUBLIC_KEY_TO;
const weiToSend = 3n;

const sendType0 = async () => {
    const nonce = await signer.getNonce();
    const type = 0;
    const feeData = await provider.getFeeData();
    
    const gasEtimate = await provider.estimateGas({
        to: toAddress,
        value: weiToSend,
        type: type,
        gasPrice: feeData.gasPrice,
    });

    const tx = await signer.sendTransaction({
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
        type: type,
        gasPrice: feeData.gasPrice,
        gasLimit: gasEtimate,
    });
    console.log(`Tx type 0 sent: ${tx.hash}`, {
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
        type: type,
        gasPrice: feeData.gasPrice,
        gasLimit: gasEtimate,
    });
}

const sendType2 = async () => {
    const nonce = await signer.getNonce();
    const type = 2;
    const feeData = await provider.getFeeData();
    console.log("Fee Data:", feeData);

    const gasEstimate = await provider.estimateGas({
        to: toAddress,
        value: weiToSend,
        type: type,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    });

    const tx = await signer.sendTransaction({
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
        type: type,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        gasLimit: gasEstimate,
    });

    console.log(`Tx type 2 sent: ${tx.hash}`, {
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
        type: type,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        gasLimit: gasEstimate,
    });
}

// await sendType0(); // 0xd6c8c0c00215abbe4d754046e78e9f08b85fcfbf9e016c911f5b6fa4772c7d69
// await sendType2(); // 0x6bfcfc55f10cad188c9d3dc910aa084d2f501908f5b2430bd3b980ceb63d6f7d