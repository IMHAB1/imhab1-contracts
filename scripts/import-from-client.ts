/// This script assumes imhab1-contracts repo and imhab1-client is located in same directory.
/// This script copies lecture data from imhab1-client to imhab1-contracts

import path, { basename } from "path";
import fs, { mkdirSync, promises as fsAsync } from "fs";
import glob from "glob";
import invariant from "invariant";

const ROOT_DIR_CONTRACTS = path.join(__dirname, "../");
const ROOT_DIR_CLIENT = path.join(ROOT_DIR_CONTRACTS, "../imhab1-client");

invariant(
  fs.existsSync(ROOT_DIR_CLIENT),
  "imhab1-client directory doesn't exist: %s",
  ROOT_DIR_CLIENT
);

// copy `CLIENT/src/resources/*.info.js` to `CONTRACTS/resources/*.info.ts`
const RECOURSE_DIR_CLIENT = path.join(ROOT_DIR_CLIENT, "src/resources");
const RECOURSE_DIR_CONTRACTS = path.join(ROOT_DIR_CONTRACTS, "resources");

async function main() {
  mkdirSync(RECOURSE_DIR_CONTRACTS, { recursive: true });

  const resourceFiles = glob.sync(path.join(RECOURSE_DIR_CLIENT, "*.info.js"));

  await Promise.all(
    resourceFiles.map(async (srcFile) => {
      const destFile = path.join(
        RECOURSE_DIR_CONTRACTS,
        basename(srcFile).replace(".js", ".ts")
      );
      await fsAsync.copyFile(srcFile, destFile);
      console.log("copy resource file \n from %s \n to %s", srcFile, destFile);
    })
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
