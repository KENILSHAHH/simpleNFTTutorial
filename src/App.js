/** @format */

'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NFTJson from './artifacts/contracts/simpleNFT.sol/SimpleNFT.json';
import { Loader2, Wallet, Sparkles, ExternalLink } from 'lucide-react';

const CONTRACT_ADDRESS = '0xD8a47Da70D7E828e01fDC4F959fAB5aA52e6fF4b';
const IMAGE_URI = 'https://cryptologos.cc/logos/flow-flow-logo.png';

export default function NFTMint() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    setIsConnecting(true);
    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      const nftContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        NFTJson,
        signer
      );
      setContract(nftContract);
      fetchNFTs(address, nftContract);
    } catch (error) {
      console.error('Connection failed', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const mintNFT = async () => {
    if (!contract) return;
    setIsMinting(true);
    setMintSuccess(false);
    try {
      const tx = await contract.mintNFT(account, {
        value: ethers.parseEther('0.01'),
      });
      await tx.wait();
      fetchNFTs(account, contract);
      setMintSuccess(true);
      setTimeout(() => setMintSuccess(false), 3000);
    } catch (error) {
      console.error('Minting failed', error);
    } finally {
      setIsMinting(false);
    }
  };

  const fetchNFTs = async (address, nftContract) => {
    if (!nftContract) return;
    try {
      const balance = await nftContract.balanceOf(address);
      const mintedNFTs = [];
      for (let i = 0; i < balance; i++) {
        mintedNFTs.push(i);
      }
      setNfts(mintedNFTs);
    } catch (error) {
      console.error('Fetching NFTs failed', error);
    }
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-md">
        <div className="bg-black p-8 rounded-3xl border border-white shadow-xl mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <img
                src={IMAGE_URI || '/placeholder.svg'}
                alt="NFT Logo"
                className="relative w-20 h-20 rounded-full border-2 border-white p-1 bg-black"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            NFT Minting DApp
          </h1>

          <div className="space-y-4">
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 rounded-xl text-black font-medium transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed border border-white">
              {isConnecting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : account ? (
                <>
                  <Wallet className="w-5 h-5" />
                  <span>{truncateAddress(account)}</span>
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5" />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>

            <button
              onClick={mintNFT}
              disabled={!account || isMinting}
              className={`w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 shadow-lg border ${
                mintSuccess
                  ? 'bg-green-600 hover:bg-green-500 border-white text-white'
                  : 'bg-white hover:bg-gray-100 border-white text-black'
              } disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:border-gray-300`}>
              {isMinting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Minting...</span>
                </>
              ) : mintSuccess ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Minted Successfully!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Mint NFT for 0.01 ETH</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/50 text-center text-xs text-white">
            <p>
              Contract: {CONTRACT_ADDRESS.slice(0, 6)}...
              {CONTRACT_ADDRESS.slice(-4)}
            </p>
          </div>
        </div>

        {nfts.length > 0 && (
          <div className="bg-black p-8 rounded-3xl border border-white shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Your NFT Collection
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {nfts.map((nft, index) => (
                <div
                  key={index}
                  className="group relative p-4 bg-black rounded-xl border border-white hover:border-white transition-all duration-200 flex flex-col items-center shadow-lg">
                  <div className="relative mb-3 bg-black p-2 rounded-lg border border-white">
                    <img
                      src={IMAGE_URI || '/placeholder.svg'}
                      alt={`NFT ${nft}`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-white text-xs font-bold text-black rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
                      #{nft}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-white">
        <p>Built with React and Ethers.js</p>
      </div>
    </div>
  );
}
