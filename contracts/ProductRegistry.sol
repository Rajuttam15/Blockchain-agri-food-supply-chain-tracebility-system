// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./StakeholderRegistry.sol";

contract ProductRegistry is AccessControl {
    StakeholderRegistry public stakeholderRegistry;

    enum ProductState { HARVESTED, PROCESSED, PACKAGED, SHIPPED, DELIVERED }

    struct Product {
        address producer;
        string origin;
        uint256 harvestDate;
        ProductState state;
        string ipfsHash;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductStateChanged(uint256 productId, ProductState newState);

    constructor(address _stakeholderRegistry) {
        stakeholderRegistry = StakeholderRegistry(_stakeholderRegistry);
    }

    function registerProduct(
        string memory _origin,
        string memory _ipfsHash
    ) external onlyRole(stakeholderRegistry.FARMER_ROLE()) {
        productCount++;
        products[productCount] = Product({
            producer: msg.sender,
            origin: _origin,
            harvestDate: block.timestamp,
            state: ProductState.HARVESTED,
            ipfsHash: _ipfsHash
        });
    }

    function updateProductState(
        uint256 _productId, 
        ProductState _newState
    ) external {
        require(
            hasRole(stakeholderRegistry.PROCESSOR_ROLE(), msg.sender) ||
            hasRole(stakeholderRegistry.RETAILER_ROLE(), msg.sender),
            "Not authorized"
        );
        
        products[_productId].state = _newState;
        emit ProductStateChanged(_productId, _newState);
    }
}