// scripts/deploy-all.js
const { ethers } = require("hardhat");

async function main() {
  // 1. Deploy StakeholderRegistry
  const StakeholderRegistry = await ethers.getContractFactory("StakeholderRegistry");
  const stakeholderRegistry = await StakeholderRegistry.deploy();
  await stakeholderRegistry.waitForDeployment();

  // 2. Deploy ProductRegistry
  const ProductRegistry = await ethers.getContractFactory("ProductRegistry");
  const productRegistry = await ProductRegistry.deploy(stakeholderRegistry.target);
  await productRegistry.waitForDeployment();

  // 3. Deploy QualityValidator
  const QualityValidator = await ethers.getContractFactory("QualityValidator");
  const qualityValidator = await QualityValidator.deploy(productRegistry.target);
  await qualityValidator.waitForDeployment();

  // 4. Deploy SensorDataOracle
  const SensorDataOracle = await ethers.getContractFactory("SensorDataOracle");
  const sensorDataOracle = await SensorDataOracle.deploy();
  await sensorDataOracle.waitForDeployment();

  // 5. Deploy ComplianceManager
  const ComplianceManager = await ethers.getContractFactory("ComplianceManager");
  const complianceManager = await ComplianceManager.deploy(productRegistry.target);
  await complianceManager.waitForDeployment();

  console.log("StakeholderRegistry deployed to:", stakeholderRegistry.target);
  console.log("ProductRegistry deployed to:", productRegistry.target);
  console.log("QualityValidator deployed to:", qualityValidator.target);
  console.log("SensorDataOracle deployed to:", sensorDataOracle.target);
  console.log("ComplianceManager deployed to:", complianceManager.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});