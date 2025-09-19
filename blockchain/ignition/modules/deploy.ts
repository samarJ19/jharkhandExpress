import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GuideVerificationModule = buildModule("GuideVerificationModule", (m) => {
  // Deploy the GuideVerification contract
  const guideVerification = m.contract("GuideVerification", []);
  
  
  return { guideVerification };
});

export default GuideVerificationModule;
