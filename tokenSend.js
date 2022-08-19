import { TransferTransaction, Hbar } from "@hashgraph/sdk";

async function tokenSendFcn(client, accounts, tokenId) {
	console.log(`\n=======================================`);
	console.log(`- Sending NFTs to accounts...`);

	let tokenSendRx = [];
	let nftSerial = [];
	for (var i = 0; i < accounts.length; i++) {
		try {
			nftSerial = i + 1;
			let tokenSendTx = new TransferTransaction()
				.addNftTransfer(tokenId, nftSerial, client.operatorAccountId, accounts[i])
				.freezeWith(client);
			let tokenSendSubmit = await tokenSendTx.execute(client);
			tokenSendRx[i] = await tokenSendSubmit.getReceipt(client);
			console.log(`- Sent NFT ${nftSerial} to account ${accounts[i]}: ${tokenSendRx[i].status}`);
		} catch {
			console.log(`- ERROR: Couldn't send hbar to ${accounts[i]}`);
		}
	}

	return tokenSendRx;
}
export default tokenSendFcn;
