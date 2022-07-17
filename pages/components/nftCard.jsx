export const NFTCard = ({ nft }) => {


    return (
        <div className="w-1/4 flex flex-col ">
        <div className="rounded-md">
            <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-300 rounded-b-md h-110 ">
            <div className="test">
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                <p className="text-gray-600">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                <p onClick={() => {navigator.clipboard.writeText(nft.contract.address)}} className="text-gray-600 cursor-pointer">{`${nft.contract.address.substr(0,4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
            </div>

            <div className="flex-grow mt-2">
                <p className="text-gray-600">{nft.description}</p>
            </div>
            <div className="flex justify-center mb-1">
            <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} className="py-2 px-4 bg-blue-700 flex-grow mt-2 text-center rounded-md text-white cursor-pointer">View on etherscan</a>
        </div>
        </div>


    </div>
    )
}