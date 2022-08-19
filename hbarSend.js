import { TransferTransaction, Hbar } from "@hashgraph/sdk";

async function hbarSendFcn(client, accounts, hbar2Send) {
	console.log(`\n=======================================`);
	console.log(`- Sending HBAR to accounts...`);

	let hbarSendRx = [];
	for (var i = 0; i < accounts.length; i++) {
		try {
			let hbarSendTx = new TransferTransaction()
				.addHbarTransfer(client.operatorAccountId, -hbar2Send)
				.addHbarTransfer(accounts[i], hbar2Send)
				.freezeWith(client);
			let hbarSendSubmit = await hbarSendTx.execute(client);
			hbarSendRx[i] = await hbarSendSubmit.getReceipt(client);
			console.log(`- Sent hbar to account ${accounts[i]}: ${hbarSendRx[i].status}`);
		} catch {
			console.log(`- ERROR: Couldn't send hbar to ${accounts[i]}`);
		}
	}

	return hbarSendRx;
}

export default hbarSendFcn;
