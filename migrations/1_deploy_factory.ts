import invariant from "invariant";
import { forkNetwork } from "../lib/config";
import { SUPERFLUID_FACTORY } from "../lib/constants";

export default async function (deployer: Truffle.Deployer) {
  const SUPERFLUID_FACTORY_ADDRESS: string = (SUPERFLUID_FACTORY as any)[
    forkNetwork
  ];

  invariant(
    SUPERFLUID_FACTORY_ADDRESS,
    'SuperTokenFactory is not supported in %s. use one of "%s"',
    forkNetwork,
    Object.keys(SUPERFLUID_FACTORY).join(",")
  );

  const Factory = artifacts.require("Factory");
  // deploy Factory contract
  await deployer.deploy(Factory, SUPERFLUID_FACTORY_ADDRESS);
  const factory = await Factory.deployed();

  // deploy other contracts
  await factory.deployContracts();
}
