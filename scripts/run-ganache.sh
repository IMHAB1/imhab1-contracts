# load .env file
set -o allexport
source .env set

INFURA_URL_PREFIX=$1
INFURA_URL="$INFURA_URL_PREFIX/$INFURA_PROJECT_ID"

echo "INFURA_URL: $INFURA_URL"

if [[ $FORK_NETWORK == "polygon" ]]; then
  CHAIN_ID="137"
elif [[ $FORK_NETWORK == "polygon_mumbai" ]]; then
  CHAIN_ID="80001"
elif [[ $FORK_NETWORK == "optimism" ]]; then
  CHAIN_ID="10"
elif [[ $FORK_NETWORK == "optimism_goerli" ]]; then
  CHAIN_ID="420"
else
  echo "Unknown network: $FORK_NETWORK"
  exit 1
fi

yarn ganache --fork $INFURA_URL --mnemonic "$MNEMONIC" --gasLimit 20000000 --chain.chainId $CHAIN_ID
