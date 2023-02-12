module.exports = function (deployer: Truffle.Deployer) {
  const ConvertLib = artifacts.require("ConvertLib");
  const MetaCoin = artifacts.require("MetaCoin");

  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
