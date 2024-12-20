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
        nonce: nonce,
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

    const gasEstimate = await provider.estimateGas({
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
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

const sendSmallNonce = async () => {
    const nonce = 1;
    const type = 2;
    const feeData = await provider.getFeeData();

    const gasEstimate = await provider.estimateGas({
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
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
    console.log(`Tx with small nonce sent: ${tx.hash}`, {
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
        type: type,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        gasLimit: gasEstimate,
    });
}

const sendBigNonce = async () => {
    const nonce = 246;
    const type = 2;
    const feeData = await provider.getFeeData();

    const gasEstimate = await provider.estimateGas({
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
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

    console.log(`Tx with big nonce sent: ${tx.hash}`, {
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
        type: type,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        gasLimit: gasEstimate,
    });
}

const sendSmallGasPrice = async () => {
    const nonce = await signer.getNonce();
    const type = 2;
    const feeData = await provider.getFeeData();

    const maxPriority = feeData.maxPriorityFeePerGas * 6n / 10n;

    const newFeeData = {
        maxFeePerGas: feeData.maxFeePerGas - feeData.maxPriorityFeePerGas + maxPriority,
        maxPriorityFeePerGas: maxPriority
    };

    const gasEstimate = await provider.estimateGas({
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
        type: type,
        maxFeePerGas: newFeeData.maxFeePerGas,
        maxPriorityFeePerGas: newFeeData.maxPriorityFeePerGas
    });

    const tx = await signer.sendTransaction({
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
        type: type,
        maxFeePerGas: newFeeData.maxFeePerGas,
        maxPriorityFeePerGas: newFeeData.maxPriorityFeePerGas,
        gasLimit: gasEstimate,
    });
    console.log(`Tx with small gas price sent: ${tx.hash}`, {
        to: toAddress,
        value: weiToSend,
        nonce: nonce,
        type: type,
        maxFeePerGas: newFeeData.maxFeePerGas,
        maxPriorityFeePerGas: newFeeData.maxPriorityFeePerGas,
        gasLimit: gasEstimate,
    });
}


// await sendType0(); // https://sepolia.etherscan.io/tx/0xd6c8c0c00215abbe4d754046e78e9f08b85fcfbf9e016c911f5b6fa4772c7d69
// await sendType2(); // https://sepolia.etherscan.io/tx/0x6bfcfc55f10cad188c9d3dc910aa084d2f501908f5b2430bd3b980ceb63d6f7d
// await sendSmallNonce(); // code=NONCE_EXPIRED
// await sendBigNonce(); // NOT FOUND 0x24c2e7ae0a308a3186d4203dfd7fe305c7f8a2e7a7c4af9ef001f81854ab58a2
await sendSmallGasPrice();