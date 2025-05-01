// scripts/deploy.js (Enhanced)
const { ethers, run } = require("hardhat");

async function main() {
  // Deploy ProductRegistry
  console.log("🚀 Deploying ProductRegistry...");
  const ProductRegistry = await ethers.getContractFactory("ProductRegistry");
  const productRegistry = await ProductRegistry.deploy();
  
  await productRegistry.waitForDeployment();
  const contractAddress = await productRegistry.getAddress();
  console.log("✅ ProductRegistry deployed to:", contractAddress);

  // Wait for 5 block confirmations
  console.log("⏳ Waiting for confirmations...");
  await productRegistry.deploymentTransaction().wait(5);

  // Verify on Etherscan (for testnets/mainnet)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("🔍 Verifying contract...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("✅ Verification successful!");
    } catch (error) {
      console.error("⚠️ Verification failed:", error.message);
    }
  }

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contract: "ProductRegistry",
    address: contractAddress,
    timestamp: new Date().toISOString(),
  };
  
  require("fs").writeFileSync(
    `deployments/${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});