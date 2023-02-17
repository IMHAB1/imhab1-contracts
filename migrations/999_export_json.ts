import fs, { promises as fsAsync } from "fs";
import path from "path";

const DEPLOYMENT_FILE = path.join(__dirname, "../deployment.json");

export default async function (deployer: Truffle.Deployer, network: string) {
  const Factory = artifacts.require("Factory");
  const factory = await Factory.deployed();

  // skip develop network
  if (network === "develop" || network === "test" || network === "localhost") {
    return;
  }

  const json = fs.existsSync(DEPLOYMENT_FILE)
    ? await fsAsync.readFile(DEPLOYMENT_FILE, { encoding: "utf8" })
    : "";
  const data = json ? JSON.parse(json) : {};
  data[network] = {
    Factory: factory.address,
    CourseManager: await factory.courseManager(),
    IBT: await factory.ibt(),
    IBTx: await factory.ibtx(),
  };

  console.log("write deployment file: %s", DEPLOYMENT_FILE);
  await fsAsync.writeFile(DEPLOYMENT_FILE, JSON.stringify(data, null, 2));
}
