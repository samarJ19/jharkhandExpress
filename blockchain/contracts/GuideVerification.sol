// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GuideVerification {
    address public admin;
    mapping(address => bool) public verifiedGuides;

    event GuideVerified(address guide);

    constructor() {
        admin = msg.sender; // whoever deploys is admin
    }

    // Only admin can verify
    function verifyGuide(address _guide) public {
        require(msg.sender == admin, "Only admin can verify guides");
        verifiedGuides[_guide] = true;
        emit GuideVerified(_guide);
    }

    // Anyone can check
    function isVerified(address _guide) public view returns (bool) {
        return verifiedGuides[_guide];
    }
}
