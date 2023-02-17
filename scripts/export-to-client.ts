/// This script assumes imhab1-contracts repo and imhab1-client is located in same directory.
/// This script copies contract abi and deployment in json format.

import path, { basename } from "path";
import fs, { cp } from "fs";
import glob from "glob";
import invariant from "invariant";

const ROOT_DIR_CONTRACTS = path.join(__dirname, "../");
const ROOT_DIR_CLIENT = path.join(ROOT_DIR_CONTRACTS, "../imhab1-client");

invariant(
  fs.existsSync(ROOT_DIR_CLIENT),
  "imhab1-client directory doesn't exist: %s",
  ROOT_DIR_CLIENT
);

const TRUFFLE_BUILD_DIR = path.join(ROOT_DIR_CONTRACTS, "build/contracts");

invariant(
  fs.existsSync(TRUFFLE_BUILD_DIR),
  "truffle build dir directory doesn't exist: %s",
  TRUFFLE_BUILD_DIR
);

const TRUFFLE_ARTIFACT_FILES = glob.sync(
  path.join(TRUFFLE_BUILD_DIR, "*.json")
);

console.log(`artifacts detected: %s`, TRUFFLE_ARTIFACT_FILES.length);
TRUFFLE_ARTIFACT_FILES.forEach((file) => {
  console.log(" > %s", file);
});

// copy abi
for (const file of TRUFFLE_ARTIFACT_FILES) {
  const fileName = basename(file);
  const destName = path.join(ROOT_DIR_CLIENT, "abi", fileName);
  fs.mkdirSync(path.dirname(destName), { recursive: true });

  // read json
  const { abi } = require(file);

  fs.writeFileSync(destName, JSON.stringify(abi, null, 2), {
    encoding: "utf-8",
  });

  console.log("copy abi \n from %s \n to %s", file, destName);
}

// copy deployment.json
const DEPLOYMENT_FILE_CONTRACTS = path.join(
  ROOT_DIR_CONTRACTS,
  "deployment.json"
);
const DEPLOYMENT_FILE_CLIENT = path.join(ROOT_DIR_CLIENT, "deployment.json");

const deployment = require(DEPLOYMENT_FILE_CONTRACTS);
fs.writeFileSync(DEPLOYMENT_FILE_CLIENT, JSON.stringify(deployment, null, 2), {
  encoding: "utf-8",
});

console.log(
  "copy deployment \n from %s \n to %s",
  DEPLOYMENT_FILE_CONTRACTS,
  DEPLOYMENT_FILE_CLIENT
);
