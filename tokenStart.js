console.clear();
import { AccountId, PrivateKey, Client } from "@hashgraph/sdk";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

import accounts from "./hbarAccounts.js";

import tokenCreateFcn from "./tokenCreate.js";
import tokenMintFcn from "./tokenMint.js";
import tokenSendFcn from "./tokenSend.js";

// Configure Hedera accounts and client, and generate needed keys
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forMainnet().setOperator(operatorId, operatorKey);
const apiKey = process.env.NFT_ST_API_KEY;

async function main() {
	const tokenId = "0.0.794631"; //dApp Days NFT Token ID on Mainnet
	// const tokenId = await tokenCreateFcn(client);

	const mintRx = await tokenMintFcn(client, apiKey, tokenId);

	// const tokenSendRx = tokenSendFcn(client, accounts, tokenId);
}

main();
