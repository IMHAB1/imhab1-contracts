# load .env file
set -o allexport
source .env set

INFURA_URL_PREFIX=$1
INFURA_URL="$INFURA_URL_PREFIX/$INFURA_PROJECT_ID"

echo "INFURA_URL: $INFURA_URL"

yarn ganache --fork $INFURA_URL --mnemonic "$MNEMONIC" --gasLimit 20000000
