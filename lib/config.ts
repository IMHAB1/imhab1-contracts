import invariant from "invariant";
import { config as dotenvConfig } from "dotenv";
import { CHAIN_IDS, ensureSupportedNetwork } from "./constants";
dotenvConfig();

export const infuraProjectId = process.env["INFURA_PROJECT_ID"];
export const forkNetwork = process.env["FORK_NETWORK"] ?? "polygon";

ensureSupportedNetwork(forkNetwork);

export const RPC =
  forkNetwork === "polygon"
    ? `https://polygon-mainnet.infura.io/v3/${infuraProjectId}`
    : forkNetwork === "polygon_mumbai"
    ? `https://polygon-mumbai.infura.io/v3/${infuraProjectId}`
    : forkNetwork === "optimism"
    ? `https://optimism-mainnet.infura.io/v3/${infuraProjectId}`
    : `https://optimism-goerli.infura.io/v3/${infuraProjectId}`;

export const CHAIN_ID: number = (CHAIN_IDS as any)[forkNetwork];
invariant(CHAIN_ID, "%s not defined in CHAIN_IDS", forkNetwork);
