import invariant from "invariant";

export const CHAIN_IDS = {
  polygon: 137, // Polygon Mainnet
  polygon_mumbai: 80001, // Polygon Testnet Mumbai
  optimism: 10, // Optimism
  optimism_goerli: 420, // Optimism Goerli Testnet
};

export const SUPERFLUID_FACTORY = {
  polygon: "0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34",
  polygon_mumbai: "0x200657E2f123761662567A1744f9ACAe50dF47E6",
  optimism: "0x8276469A443D5C6B7146BED45e2abCaD3B6adad9",
  optimism_goerli: "0x9aCc39d15e3f168c111a1D4F80271a9E526c9a9F",
};

export function ensureSupportedNetwork(networkName: string) {
  invariant(
    networkName in CHAIN_IDS,
    "networkName not supported. use one of [%s]",
    Object.keys(CHAIN_IDS).join(", ")
  );
}
