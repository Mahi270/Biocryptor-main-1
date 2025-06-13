// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecryptionLog {
    // Struct to hold log info
    struct LogEntry {
        address user;
        string ipfsCid;
        uint256 timestamp;
    }

    // Array of logs
    LogEntry[] public logs;

    // Event for front-end or external tools to listen
    event DecryptionLogged(address indexed user, string ipfsCid, uint256 timestamp);

    // Function to log a decryption operation
    function logDecryption(string memory ipfsCid) public {
        logs.push(LogEntry(msg.sender, ipfsCid, block.timestamp));
        emit DecryptionLogged(msg.sender, ipfsCid, block.timestamp);
    }

    // Optional: Retrieve all logs (not gas efficient for large data)
    function getLogs() public view returns (LogEntry[] memory) {
        return logs;
    }

    // Get log count
    function getLogCount() public view returns (uint256) {
        return logs.length;
    }

    // Get a specific log by index
    function getLogByIndex(uint256 index) public view returns (address, string memory, uint256) {
        require(index < logs.length, "Index out of bounds");
        LogEntry memory entry = logs[index];
        return (entry.user, entry.ipfsCid, entry.timestamp);
    }
}