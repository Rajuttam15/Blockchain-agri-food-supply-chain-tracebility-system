// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract StakeholderRegistry is AccessControl {
    bytes32 public constant FARMER_ROLE = keccak256("FARMER");
    bytes32 public constant PROCESSOR_ROLE = keccak256("PROCESSOR");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER");

    struct Stakeholder {
        string name;
        string location;
        uint256 registrationDate;
    }

    mapping(address => Stakeholder) public stakeholders;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function registerStakeholder(
        string memory _name,
        string memory _location,
        bytes32 _role
    ) external {
        require(!hasRole(_role, msg.sender), "Already registered");
        
        if (_role == FARMER_ROLE) {
            _grantRole(FARMER_ROLE, msg.sender);
        } else if (_role == PROCESSOR_ROLE) {
            _grantRole(PROCESSOR_ROLE, msg.sender);
        } else if (_role == RETAILER_ROLE) {
            _grantRole(RETAILER_ROLE, msg.sender);
        } else {
            revert("Invalid role");
        }

        stakeholders[msg.sender] = Stakeholder({
            name: _name,
            location: _location,
            registrationDate: block.timestamp
        });
    }
}