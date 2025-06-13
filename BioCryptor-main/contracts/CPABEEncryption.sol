// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EncryptionLog {
    struct EncryptionRecord {
        string ipfsHash;
        address owner;
        uint256 timestamp;
    }

    mapping(address => EncryptionRecord[]) private userEncryptions;
    event EncryptionLogged(address indexed user, string ipfsHash, uint256 timestamp);

    function logEncryption(string memory _ipfsHash) public {
        EncryptionRecord memory newRecord = EncryptionRecord({
            ipfsHash: _ipfsHash,
            owner: msg.sender,
            timestamp: block.timestamp
        });

        userEncryptions[msg.sender].push(newRecord);
        emit EncryptionLogged(msg.sender, _ipfsHash, block.timestamp);
    }

    function getEncryptions(address _user) public view returns (EncryptionRecord[] memory) {
        return userEncryptions[_user];
    }
}
