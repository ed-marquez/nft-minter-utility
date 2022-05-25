console.clear();
import { AccountId, PrivateKey, Client } from "@hashgraph/sdk";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

import tokenCreateFcn from "./tokenCreate.js";
import tokenMintFcn from "./tokenMint.js";

// Configure Hedera accounts and client, and generate needed keys
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
const apiKey = process.env.NFT_ST_API_KEY;

async function main() {
	// const tokenId = await tokenCreateFcn(client);
	const tokenId = "0.0.34913499";

	const mintRx = await tokenMintFcn(client, apiKey, tokenId);
}

main();
