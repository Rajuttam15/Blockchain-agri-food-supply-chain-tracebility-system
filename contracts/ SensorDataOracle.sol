// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SensorDataOracle is Ownable {
    struct SensorReading {
        uint256 timestamp;
        uint256 temperature;
        uint256 humidity;
        string deviceId;
    }

    mapping(uint256 => SensorReading[]) public productSensorData;

    event SensorDataRecorded(
        uint256 productId,
        uint256 temperature,
        uint256 humidity,
        string deviceId
    );

    function recordSensorData(
        uint256 _productId,
        uint256 _temperature,
        uint256 _humidity,
        string memory _deviceId
    ) external onlyOwner {
        productSensorData[_productId].push(SensorReading({
            timestamp: block.timestamp,
            temperature: _temperature,
            humidity: _humidity,
            deviceId: _deviceId
        }));

        emit SensorDataRecorded(_productId, _temperature, _humidity, _deviceId);
    }
}