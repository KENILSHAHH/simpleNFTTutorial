/** @format */

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import IMageNFT from './SimpleNft.json';

const CONTRACT_ADDRESS = '0xD8a47Da70D7E828e01fDC4F959fAB5aA52e6fF4b';
const IMAGE_URI = 'https://cryptologos.cc/logos/flow-flow-logo.png';
const ABI = IMageNFT;

export default function NFTMint() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    const nftContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    setContract(nftContract);
    fetchNFTs(address, nftContract);
  };

  const mintNFT = async () => {
    if (!contract) return;
    try {
      const tx = await contract.mintNFT(account, {
        value: ethers.parseEther('0.01'),
      });
      await tx.wait();
      fetchNFTs(account, contract);
    } catch (error) {
      console.error('Minting failed', error);
    }
  };

  const fetchNFTs = async (address, nftContract) => {
    if (!nftContract) return;
    try {
      const balance = await nftContract.balanceOf(address);
      let mintedNFTs = [];
      for (let i = 0; i < balance; i++) {
        mintedNFTs.push(i);
      }
      setNfts(mintedNFTs);
    } catch (error) {
      console.error('Fetching NFTs failed', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <button
        onClick={connectWallet}
        className="mb-4 p-2 bg-blue-500 text-white rounded-lg">
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : 'Connect Wallet'}
      </button>
      <button
        onClick={mintNFT}
        disabled={!account}
        className="mb-4 p-2 bg-blue-500 text-white rounded-lg">
        Mint NFT
      </button>
      <div className="grid grid-cols-3 gap-4">
        {nfts.map((nft, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg flex flex-col items-center"
            style={{ maxWidth: '100px' }}>
            <img
              src={IMAGE_URI}
              alt={`NFT ${nft}`}
              className="w-4 h-4 mb-2"
            />
            <span>NFT #{nft}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
