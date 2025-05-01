// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ProductRegistry.sol";

contract QualityValidator is AccessControl {
    ProductRegistry public productRegistry;

    struct QualityCheck {
        uint256 timestamp;
        string parameter;
        uint256 value;
        bool passed;
        string ipfsReport;
    }

    mapping(uint256 => QualityCheck[]) public qualityChecks;

    event QualityCheckRecorded(
        uint256 productId,
        string parameter,
        uint256 value,
        bool passed
    );

    constructor(address _productRegistry) {
        productRegistry = ProductRegistry(_productRegistry);
    }

    function recordQualityCheck(
        uint256 _productId,
        string memory _parameter,
        uint256 _value,
        bool _passed,
        string memory _ipfsReport
    ) external onlyRole(productRegistry.stakeholderRegistry().PROCESSOR_ROLE()) {
        qualityChecks[_productId].push(QualityCheck({
            timestamp: block.timestamp,
            parameter: _parameter,
            value: _value,
            passed: _passed,
            ipfsReport: _ipfsReport
        }));

        emit QualityCheckRecorded(_productId, _parameter, _value, _passed);
    }
}