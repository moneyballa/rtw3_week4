
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import {NFTCard} from "./components/nftCard"

const Home = () => {

  const [wallet, setWalletAddress] = useState("")
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const [nextToken, setNextToken] = useState("")

  const fetchNFTs = async() => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "L0wcCXI1orVU2LbP-GmIn3SnP0cXAVoa"
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${api_key}/getNFTs/`;

    if(!collection.length) {
      var requestOptions = {
        method: 'GET',
      };
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())

    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())

    }

    if (nfts){
      console.log("nfts: ",nfts)
      setNFTs(nfts.ownedNfts)
    }
  }
  
  const fetchNFTsForCollection = async () => {
    if (collection.length){
      var requestOptions = {
        method: 'GET',
      };
      console.log("before query: ",nextToken)
      const api_key = "L0wcCXI1orVU2LbP-GmIn3SnP0cXAVoa"
      const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&startToken=${nextToken}&withMetadata=${"true"}`;
      const nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
      if(nfts){
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
        console.log("returning: ", nfts.nextToken)
        setNextToken(nfts.nextToken)
      }
    }
  }


  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3 bg-slate-600">
      <div className='flex flex-col w-full justify-center items-center gap-y-2'>
        <input disabled={fetchForCollection}className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-green-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>(setWalletAddress(e.target.value))} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>(setCollectionAddress(e.target.value))} type={"text"} placeholder="Add the collection address"></input>
        <label className='text-white'><input onChange={(e) => {setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-1"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-green-600 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          ()=> {
            if(fetchForCollection){
              nextToken=""
              console.log("Before fetch: ", nextToken)
              fetchNFTsForCollection()
            } else {
              fetchNFTs()
            }
          }
        }>Lets fkn go</button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
              
            )
            
          })
        }
      </div>
      <button className={"disabled:bg-slate-500 text-white bg-green-600 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          (e)=> {
            if(fetchForCollection){
              console.log("nextToken2: ",nextToken)
              fetchNFTsForCollection()
            } else {
              fetchNFTs()
            }
          }
        }>Next page</button>
    </div>
  )

}

export default Home
