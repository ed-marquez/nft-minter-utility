console.clear();
import { AccountId, PrivateKey, Client } from "@hashgraph/sdk";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

import accounts from "./hbarAccounts.js";
import hbarSendFcn from "./hbarSend.js";

// Configure Hedera accounts and client, and generate needed keys
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forMainnet().setOperator(operatorId, operatorKey);
// const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
	const hbar2Send = 1;
	const hbarSendRx = await hbarSendFcn(client, accounts, hbar2Send);
}

main();
