console.clear();
import { AccountId, PrivateKey, Client } from "@hashgraph/sdk";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

// import hbarCreateAccountsFcn from "./hbarCreateAccounts.js";
import accounts from "./hbarAccounts.js";
import hbarSendFcn from "./hbarSend.js";

// Configure Hedera accounts and client, and generate needed keys
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
// const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
	// Use this for testing if need to generate Testnet accounts to send NFTs to
	// const numAccounts = 5;
	// const [accounts, accRxs] = await hbarCreateAccountsFcn(client, numAccounts);

	const hbar2Send = 1;
	const hbarSendRx = await hbarSendFcn(client, accounts, hbar2Send);
}

main();
