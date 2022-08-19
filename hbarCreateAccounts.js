import { AccountCreateTransaction, PrivateKey, Hbar } from "@hashgraph/sdk";

async function hbarCreateAccountsFcn(client, numAccounts) {
	console.log(`\n=======================================`);
	console.log(`- Creating Hedera accounts...`);

	let accountCreateRxs = [];
	let accounts = [];
	let pvKey = [];

	for (var i = 0; i < numAccounts; i++) {
		try {
			pvKey[i] = PrivateKey.generateED25519();
			let accountCreateTx = new AccountCreateTransaction()
				.setKey(pvKey[i].publicKey)
				.setInitialBalance(new Hbar(0.5))
				.setMaxAutomaticTokenAssociations(10);
			let accountCreateSubmit = await accountCreateTx.execute(client);
			accountCreateRxs[i] = await accountCreateSubmit.getReceipt(client);
			accounts[i] = accountCreateRxs[i].accountId;
			console.log(`- Creation of account ${accounts[i]}: ${accountCreateRxs[i].status}`);
		} catch {
			console.log(`- ERROR: Couldn't create account ${accounts[i]}`);
		}
	}
	console.table(`${accounts}`);
	return [accounts, accountCreateRxs];
}

export default hbarCreateAccountsFcn;
