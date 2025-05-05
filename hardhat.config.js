require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/8277224bfdfc440988904e7a55ccfad0",
      chainId: 11155111,
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
    }
  }
};