import { TokenCreateTransaction, TokenType, TokenSupplyType } from "@hashgraph/sdk";

async function tokenCreateFcn(client) {
	console.log(`\n=======================================`);
	console.log(`- Creating HTS token...`);

	let nftCreateTx = await new TokenCreateTransaction()
		.setTokenName("myToken")
		.setTokenSymbol("NFT🚀")
		.setTokenType(TokenType.NonFungibleUnique)
		.setSupplyType(TokenSupplyType.Infinite)
		.setDecimals(0)
		.setInitialSupply(0)
		.setTreasuryAccountId(client.operatorAccountId)
		.setAdminKey(client.operatorPublicKey)
		.setSupplyKey(client.operatorPublicKey)
		.setTokenMemo("my Non-fungible token using NFT Storage.")
		.freezeWith(client);
	let nftCreateSubmit = await nftCreateTx.execute(client);
	let nftCreateRx = await nftCreateSubmit.getReceipt(client);
	let nftCreateRec = await nftCreateSubmit.getRecord(client);
	let tokenId = nftCreateRx.tokenId;
	console.log(`- Created NFT with Token ID: ${tokenId}`);
	console.log(`- Fees ${nftCreateRec.transactionFee._valueInTinybar.c[0] * 1e-8} \n`);

	return tokenId;
}
export default tokenCreateFcn;
