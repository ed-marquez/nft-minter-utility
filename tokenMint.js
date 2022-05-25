import { TokenInfoQuery, TokenMintTransaction } from "@hashgraph/sdk";
import { NFTStorage, File } from "nft.storage";
import fs from "fs";

async function tokenCreateFcn(client, apiKey, tokenId) {
	console.log(`\n=======================================`);
	console.log(`- Minting new NFTs...`);

	// Configure NFT Storage client
	const nftClient = new NFTStorage({ token: apiKey });

	// READ FILES IN IMG FOLDER
	const folder = "./img";
	const files = fs.readdirSync(folder);

	// GET TOKEN INFORMATION TO KNOW CURRENT NFT SUPPLY
	const tokenInfo = await new TokenInfoQuery().setTokenId(tokenId).execute(client);
	const tokenSupply = tokenInfo.totalSupply.low;

	// MINT NEW BATCH OF NFTs WITH NFT STORAGE
	let mintRx = [];
	for (var i = 0; i < files.length; i++) {
		const fileName = "./img/" + files[i];
		const nftJSON = {
			name: "DDNFT Ticket #" + (tokenSupply + (i + 1)),
			creator: "Swirlds Labs",
			description: "This is an example NFT metadata. Need to add something generic here", // NEED TO FINALIZE THIS
			image: new File([await fs.promises.readFile(fileName)], fileName, { type: "image/jpg" }),
			type: "image/jpg",
			format: "none",
			properties: {
				collection: "Hedera dApp Days", // NEED TO FINALIZE THIS
				website: "www.hedera.com/dapp-days",
				// can add more arbitrary info here - NEED TO FINALIZE THIS
			},
		};
		const metadata = await nftClient.store(nftJSON);
		mintRx[i] = await tokenMinterFcn(metadata.url);
		console.log(`Created NFT ${tokenId} with serial: ${mintRx[i].serials[0].low}`);
	}

	async function tokenMinterFcn(metadataURI) {
		let tokenMintTx = new TokenMintTransaction()
			.setTokenId(tokenId)
			.setMetadata([Buffer.from(metadataURI)])
			.freezeWith(client);
		let tokenMintSubmit = await tokenMintTx.execute(client);
		let tokenMintRx = await tokenMintSubmit.getReceipt(client);
		return tokenMintRx;
	}

	return mintRx;
}
export default tokenCreateFcn;
