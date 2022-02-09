const annonce = artifacts.require("AnnonceContract");

module.exports = function (deployer) {
  deployer.deploy(annonce);
};
