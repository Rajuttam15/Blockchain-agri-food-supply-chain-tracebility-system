// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ProductRegistry.sol";

contract ComplianceManager is AccessControl {
    ProductRegistry public productRegistry;

    struct Certificate {
        string standard;
        string issuer;
        uint256 issueDate;
        uint256 expiryDate;
        string ipfsProof;
    }

    mapping(uint256 => Certificate[]) public productCertificates;

    event CertificateAdded(
        uint256 productId,
        string standard,
        string issuer
    );

    constructor(address _productRegistry) {
        productRegistry = ProductRegistry(_productRegistry);
    }

    function addCertificate(
        uint256 _productId,
        string memory _standard,
        string memory _issuer,
        uint256 _expiryDate,
        string memory _ipfsProof
    ) external onlyRole(productRegistry.stakeholderRegistry().FARMER_ROLE()) {
        productCertificates[_productId].push(Certificate({
            standard: _standard,
            issuer: _issuer,
            issueDate: block.timestamp,
            expiryDate: _expiryDate,
            ipfsProof: _ipfsProof
        }));

        emit CertificateAdded(_productId, _standard, _issuer);
    }
}