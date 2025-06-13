// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import Web3 from "web3";
// // // // // // // import sha256 from "crypto-js/sha256";
// // // // // // // import CPABEEncrypt from "/biocryptor/client/src/contracts/CPABEEncryption.json"; // Replace with actual ABI

// // // // // // // const contractAddress = "0x2de882377b0C4F69776a8a85B365E041302596Eb"; // Replace with actual contract address
// // // // // // // const maxUsers = 6; // Allow up to 6 users

// // // // // // // function Encrypt() {
// // // // // // //   const [web3, setWeb3] = useState(null);
// // // // // // //   const [contract, setContract] = useState(null);
// // // // // // //   const [accounts, setAccounts] = useState([]);
// // // // // // //   const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
// // // // // // //   const [data, setData] = useState("");
// // // // // // //   const [accessPolicy, setAccessPolicy] = useState("");

// // // // // // //   useEffect(() => {
// // // // // // //     const loadBlockchainData = async () => {
// // // // // // //       const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache local blockchain
// // // // // // //       const accountsList = await web3Instance.eth.getAccounts();
// // // // // // //       setAccounts(accountsList.slice(0, maxUsers)); // Set the first 6 accounts
// // // // // // //       const contractInstance = new web3Instance.eth.Contract(
// // // // // // //         CPABEEncrypt.abi,
// // // // // // //         contractAddress
// // // // // // //       );
// // // // // // //       setWeb3(web3Instance);
// // // // // // //       setContract(contractInstance);
// // // // // // //     };
// // // // // // //     loadBlockchainData();
// // // // // // //   }, []);

// // // // // // //   const dataHash = sha256(data).toString(); // Hash the input data

// // // // // // //   const handleEncrypt = async () => {
// // // // // // //     if (!web3 || !contract) {
// // // // // // //       alert("Web3 or contract is not initialized.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     if (accounts.length === 0) {
// // // // // // //       alert("No available accounts for encryption.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const account = accounts[currentAccountIndex]; // Get the current account
// // // // // // //     setCurrentAccountIndex((currentAccountIndex + 1) % maxUsers); // Cycle to the next account

// // // // // // //     const accessPolicyFormatted = JSON.stringify(accessPolicy.split(","));

// // // // // // //     try {
// // // // // // //       console.log("Data hash:", dataHash);
// // // // // // //       console.log("Access Policy:", accessPolicyFormatted);
// // // // // // //       const gasEstimate = await contract.methods
// // // // // // //         .logEncryption(dataHash, accessPolicyFormatted)
// // // // // // //         .estimateGas({ from: account });

// // // // // // //       await contract.methods
// // // // // // //         .logEncryption(dataHash, accessPolicyFormatted)
// // // // // // //         .send({ from: account, gas: gasEstimate.toString() });

// // // // // // //       alert(`Encryption logged successfully by account: ${account}`);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Encryption failed for account", account, error);
// // // // // // //       alert("Encryption failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       <h1>Encrypt Data</h1>
// // // // // // //       <div>
// // // // // // //         <textarea
// // // // // // //           value={data}
// // // // // // //           onChange={(e) => setData(e.target.value)}
// // // // // // //           placeholder="Enter data to encrypt"
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //       <div>
// // // // // // //         <label>Access Policy (comma-separated):</label>
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           value={accessPolicy}
// // // // // // //           onChange={(e) => setAccessPolicy(e.target.value)}
// // // // // // //           placeholder="e.g., role:admin, location:NY"
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //       <button onClick={handleEncrypt}>Encrypt</button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default Encrypt;

// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import Web3 from "web3";
// // // // // // import CryptoJS from "crypto-js";
// // // // // // import CPABEEncrypt from "/biocryptor/client/src/contracts/CPABEEncryption.json"; // Replace with actual ABI

// // // // // // const contractAddress = "0x2de882377b0C4F69776a8a85B365E041302596Eb"; // Replace with actual contract address
// // // // // // const maxUsers = 6; // Allow up to 6 users

// // // // // // function Encrypt() {
// // // // // //   const [web3, setWeb3] = useState(null);
// // // // // //   const [contract, setContract] = useState(null);
// // // // // //   const [accounts, setAccounts] = useState([]);
// // // // // //   const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
// // // // // //   const [data, setData] = useState("");
// // // // // //   const [accessPolicy, setAccessPolicy] = useState("");
// // // // // //   const [aesKey, setAesKey] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     const loadBlockchainData = async () => {
// // // // // //       const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache local blockchain
// // // // // //       const accountsList = await web3Instance.eth.getAccounts();
// // // // // //       setAccounts(accountsList.slice(0, maxUsers)); // Set the first 6 accounts
// // // // // //       const contractInstance = new web3Instance.eth.Contract(
// // // // // //         CPABEEncrypt.abi,
// // // // // //         contractAddress
// // // // // //       );
// // // // // //       setWeb3(web3Instance);
// // // // // //       setContract(contractInstance);
// // // // // //     };

// // // // // //     const generateKey = () => {
// // // // // //       const key = CryptoJS.lib.WordArray.random(16); // 128-bit key
// // // // // //       setAesKey(key);
// // // // // //     };

// // // // // //     loadBlockchainData();
// // // // // //     generateKey(); // Generate AES key on component load
// // // // // //   }, []);

// // // // // //   const handleEncrypt = async () => {
// // // // // //     if (!web3 || !contract || !aesKey) {
// // // // // //       alert("Web3, contract, or AES key is not initialized.");
// // // // // //       return;
// // // // // //     }

// // // // // //     if (accounts.length === 0) {
// // // // // //       alert("No available accounts for encryption.");
// // // // // //       return;
// // // // // //     }

// // // // // //     const account = accounts[currentAccountIndex]; // Get the current account
// // // // // //     setCurrentAccountIndex((currentAccountIndex + 1) % maxUsers); // Cycle to the next account

// // // // // //     const accessPolicyFormatted = JSON.stringify(accessPolicy.split(","));

// // // // // //     try {
// // // // // //       const encryptedData = CryptoJS.AES.encrypt(data, aesKey).toString();
// // // // // //       console.log("Encrypted Data:", encryptedData);
// // // // // //       console.log("Access Policy:", accessPolicyFormatted);

// // // // // //       const gasEstimate = await contract.methods
// // // // // //         .logEncryption(encryptedData, accessPolicyFormatted)
// // // // // //         .estimateGas({ from: account });

// // // // // //       await contract.methods
// // // // // //         .logEncryption(encryptedData, accessPolicyFormatted)
// // // // // //         .send({ from: account, gas: gasEstimate.toString() });

// // // // // //       alert(`Encryption logged successfully by account: ${account}`);
// // // // // //     } catch (error) {
// // // // // //       console.error("Encryption failed for account", account, error);
// // // // // //       alert("Encryption failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h1>Encrypt Data</h1>
// // // // // //       <div>
// // // // // //         <textarea
// // // // // //           value={data}
// // // // // //           onChange={(e) => setData(e.target.value)}
// // // // // //           placeholder="Enter data to encrypt"
// // // // // //         />
// // // // // //       </div>
// // // // // //       <div>
// // // // // //         <label>Access Policy (comma-separated):</label>
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           value={accessPolicy}
// // // // // //           onChange={(e) => setAccessPolicy(e.target.value)}
// // // // // //           placeholder="e.g., role:admin, location:NY"
// // // // // //         />
// // // // // //       </div>
// // // // // //       <button onClick={handleEncrypt}>Encrypt</button>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default Encrypt;

// // // // // import React, { useState, useEffect } from "react";
// // // // // import Web3 from "web3";
// // // // // import sha256 from "crypto-js/sha256";
// // // // // import CPABEEncrypt from "/biocryptor/client/src/contracts/CPABEEncryption.json"; // Replace with actual ABI

// // // // // const contractAddress = "0x2de882377b0C4F69776a8a85B365E041302596Eb"; // Replace with actual contract address

// // // // // function Encrypt() {
// // // // //   const [web3, setWeb3] = useState(null);
// // // // //   const [contract, setContract] = useState(null);
// // // // //   const [account, setAccount] = useState(""); // Define account state
// // // // //   const [data, setData] = useState("");
// // // // //   const [accessPolicy, setAccessPolicy] = useState(""); // Access policy state

// // // // //   useEffect(() => {
// // // // //     const loadBlockchainData = async () => {
// // // // //       const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache local blockchain
// // // // //       const accounts = await web3Instance.eth.getAccounts();
// // // // //       setAccount(accounts[1]); // Set the first account
// // // // //       const contractInstance = new web3Instance.eth.Contract(
// // // // //         CPABEEncrypt.abi,
// // // // //         contractAddress
// // // // //       );
// // // // //       setWeb3(web3Instance);
// // // // //       setContract(contractInstance);
// // // // //     };
// // // // //     loadBlockchainData();
// // // // //   }, []);

// // // // //   const dataHash = sha256(data).toString(); // Hash the input data
// // // // //   const accessPolicyFormatted = JSON.stringify(accessPolicy); // Assuming `accessPolicy` is defined

// // // // //   const handleEncrypt = async () => {
// // // // //     if (!web3 || !contract) {
// // // // //       alert("Web3 or contract is not initialized.");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       console.log("Data hash:", dataHash);
// // // // //       console.log("Access Policy:", accessPolicyFormatted);
// // // // //       await handleContractCall(dataHash, accessPolicyFormatted);

// // // // //       const gasEstimate = await contract.methods
// // // // //         .logEncryption(dataHash, accessPolicyFormatted)
// // // // //         .estimateGas({ from: account });

// // // // //       await contract.methods
// // // // //         .logEncryption(dataHash, accessPolicyFormatted)
// // // // //         .send({ from: account, gas: gasEstimate.toString() });

// // // // //       alert("Encryption logged successfully.");
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       alert("Encryption failed.");
// // // // //     }
// // // // //   };

// // // // //   const handleContractCall = async () => {
// // // // //     try {
// // // // //       const startTime = performance.now(); // Start time

// // // // //       const gasEstimate = await contract.methods
// // // // //         .logEncryption(dataHash, accessPolicyFormatted)
// // // // //         .estimateGas({ from: account });

// // // // //       const receipt = await contract.methods
// // // // //         .logEncryption(dataHash, accessPolicyFormatted)
// // // // //         .send({ from: account, gas: gasEstimate });

// // // // //       const endTime = performance.now(); // End time

// // // // //       const timeTaken = (endTime - startTime) / 1000; // Time in seconds
// // // // //       console.log(
// // // // //         `Time taken for contract call: ${timeTaken.toFixed(2)} seconds`
// // // // //       );

// // // // //       console.log(`Transaction hash: ${receipt.transactionHash}`);
// // // // //       console.log(`Gas used: ${receipt.gasUsed}`);
// // // // //     } catch (error) {
// // // // //       console.error("Error in contract call:", error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h1>Encrypt Data</h1>
// // // // //       <div>
// // // // //         <textarea
// // // // //           value={data}
// // // // //           onChange={(e) => setData(e.target.value)}
// // // // //           placeholder="Enter data to encrypt"
// // // // //         />
// // // // //       </div>
// // // // //       <div>
// // // // //         <label>Access Policy (comma-separated):</label>
// // // // //         <input
// // // // //           type="text"
// // // // //           value={accessPolicy}
// // // // //           onChange={(e) => setAccessPolicy(e.target.value)}
// // // // //           placeholder="e.g., role:admin, location:NY"
// // // // //         />
// // // // //       </div>
// // // // //       <button onClick={handleEncrypt}>Encrypt</button>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Encrypt;

// // import React, { useState, useEffect } from "react";
// // import Web3 from "web3";
// // import CryptoJS from "crypto-js";
// // import CPABEEncrypt from "/biocryptor/client/src/contracts/EncryptionLog.json"; // Replace with actual ABI

// // const contractAddress = "0x8451a39A44726d4335E8777C8d23D14FC6fa1853"; // Replace with actual contract address

// // function Encrypt() {
// //   const [web3, setWeb3] = useState(null);
// //   const [contract, setContract] = useState(null);
// //   const [account, setAccount] = useState(""); // Define account state
// //   const [data, setData] = useState("");
// //   const [accessPolicy, setAccessPolicy] = useState(""); // Access policy state
// //   const [aesKey, setAesKey] = useState(null);

// //   useEffect(() => {
// //     const loadBlockchainData = async () => {
// //       const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache local blockchain
// //       const accounts = await web3Instance.eth.getAccounts();
// //       setAccount(accounts[2]); // Set the first account
// //       const contractInstance = new web3Instance.eth.Contract(
// //         CPABEEncrypt.abi,
// //         contractAddress
// //       );
// //       setWeb3(web3Instance);
// //       setContract(contractInstance);
// //       generateAesKey(); // Generate AES key
// //     };
// //     loadBlockchainData();
// //   }, []);

// //   const generateAesKey = () => {
// //     const key = CryptoJS.lib.WordArray.random(32); // 32 bytes for AES-256
// //     const keyBase64 = key.toString(CryptoJS.enc.Base64); // Base64-encoded key
// //     setAesKey(keyBase64); // Save Base64 key
// //     console.log("Generated AES-256 Key (Base64):", keyBase64);
// //   };

// //   const encryptData = (data, base64Key) => {
// //     if (!data || !base64Key) {
// //       throw new Error("Data or key is missing.");
// //     }

// //     const key = CryptoJS.enc.Base64.parse(base64Key); // Convert Base64 to WordArray
// //     const iv = CryptoJS.lib.WordArray.random(32); // Generate a random IV

// //     const encrypted = CryptoJS.AES.encrypt(data, key, {
// //       iv: iv, // Initialization Vector for CBC mode
// //       mode: CryptoJS.mode.CBC,
// //       padding: CryptoJS.pad.Pkcs7,
// //     }).toString();

// //     console.log("IV:", iv.toString(CryptoJS.enc.Base64)); // Optional: Log the IV
// //     return encrypted;
// //   };

// //   const handleEncrypt = async () => {
// //     if (!web3 || !contract) {
// //       alert("Web3 or contract is not initialized.");
// //       return;
// //     }

// //     if (!aesKey) {
// //       alert("AES key not generated.");
// //       return;
// //     }

// //     const encryptedData = encryptData(data, aesKey);
// //     const accessPolicyFormatted = JSON.stringify(accessPolicy);

// //     try {
// //       console.log("Encrypted Data:", encryptedData);
// //       console.log("Access Policy:", accessPolicyFormatted);
// //       await handleContractCall(encryptedData, accessPolicyFormatted);

// //       const gasEstimate = await contract.methods
// //         .logEncryption(encryptedData, accessPolicyFormatted)
// //         .estimateGas({ from: account });

// //       await contract.methods
// //         .logEncryption(encryptedData, accessPolicyFormatted)
// //         .send({ from: account, gas: gasEstimate.toString() });

// //       alert("Encryption logged successfully.");
// //     } catch (error) {
// //       console.error(error);
// //       alert("Encryption failed.");
// //     }
// //   };

// //   const handleContractCall = async (encryptedData, accessPolicyFormatted) => {
// //     try {
// //       const startTime = performance.now(); // Start time

// //       const gasEstimate = await contract.methods
// //         .logEncryption(encryptedData, accessPolicyFormatted)
// //         .estimateGas({ from: account });

// //       const receipt = await contract.methods
// //         .logEncryption(encryptedData, accessPolicyFormatted)
// //         .send({ from: account, gas: gasEstimate });

// //       const endTime = performance.now(); // End time

// //       const timeTaken = (endTime - startTime) / 1000; // Time in seconds
// //       console.log(
// //         `Time taken for contract call: ${timeTaken.toFixed(2)} seconds`
// //       );

// //       console.log(`Transaction hash: ${receipt.transactionHash}`);
// //       console.log(`Gas used: ${receipt.gasUsed}`);
// //     } catch (error) {
// //       console.error("Error in contract call:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Encrypt Data</h1>
// //       <div>
// //         <textarea
// //           value={data}
// //           onChange={(e) => setData(e.target.value)}
// //           placeholder="Enter data to encrypt"
// //         />
// //       </div>
// //       <div>
// //         <label>Access Policy (comma-separated):</label>
// //         <input
// //           type="text"
// //           value={accessPolicy}
// //           onChange={(e) => setAccessPolicy(e.target.value)}
// //           placeholder="e.g., role:admin, location:NY"
// //         />
// //       </div>
// //       <button onClick={handleEncrypt}>Encrypt</button>
// //     </div>
// //   );
// // }

// // export default Encrypt;

// // // // import React, { useState, useEffect } from "react";
// // // // import Web3 from "web3";
// // // // import CryptoJS from "crypto-js";
// // // // import { create } from "ipfs-http-client";
// // // // import CPABEEncrypt from "/biocryptor/client/src/contracts//EncryptionLog.json"; // Replace with actual ABI

// // // // const contractAddress = "0xA90B0587B79959B743c665fb6A5B3F1c7FF8a4dA"; // Replace with actual contract address
// // // // const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" }); // Connect to IPFS

// // // // function Encrypt() {
// // // //   const [web3, setWeb3] = useState(null);
// // // //   const [contract, setContract] = useState(null);
// // // //   const [account, setAccount] = useState("");
// // // //   const [data, setData] = useState("");
// // // //   const [accessPolicy, setAccessPolicy] = useState("");
// // // //   const [aesKey, setAesKey] = useState(null);

// // // //   useEffect(() => {
// // // //     const loadBlockchainData = async () => {
// // // //       const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache local blockchain
// // // //       const accounts = await web3Instance.eth.getAccounts();
// // // //       setAccount(accounts[0]); // Use the first account
// // // //       const contractInstance = new web3Instance.eth.Contract(
// // // //         CPABEEncrypt.abi,
// // // //         contractAddress
// // // //       );
// // // //       setWeb3(web3Instance);
// // // //       setContract(contractInstance);
// // // //       generateAesKey();
// // // //     };
// // // //     loadBlockchainData();
// // // //   }, []);

// // // //   const generateAesKey = () => {
// // // //     const key = CryptoJS.lib.WordArray.random(32);
// // // //     const keyBase64 = key.toString(CryptoJS.enc.Base64);
// // // //     setAesKey(keyBase64);
// // // //     console.log("Generated AES Key:", keyBase64);
// // // //   };

// // // //   const encryptData = (data, accessPolicy, base64Key) => {
// // // //     if (!data || !accessPolicy || !base64Key) {
// // // //       throw new Error("Missing data, access policy, or key.");
// // // //     }

// // // //     const key = CryptoJS.enc.Base64.parse(base64Key);
// // // //     const nonce = CryptoJS.lib.WordArray.random(16); // Generate a random nonce

// // // //     const combinedData = JSON.stringify({ data, accessPolicy });

// // // //     const encrypted = CryptoJS.AES.encrypt(combinedData, key, {
// // // //       mode: CryptoJS.mode.EAX,
// // // //       nonce: nonce,
// // // //       padding: CryptoJS.pad.Pkcs7,
// // // //     });

// // // //     return {
// // // //       encryptedData: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
// // // //       nonce: nonce.toString(CryptoJS.enc.Base64),
// // // //       tag: encrypted.mac.toString(CryptoJS.enc.Base64), // Authentication tag
// // // //     };
// // // //   };

// // // //   const uploadToIPFS = async (encryptedData) => {
// // // //     try {
// // // //       const { path } = await ipfs.add(JSON.stringify(encryptedData));
// // // //       return path; // IPFS hash
// // // //     } catch (error) {
// // // //       console.error("IPFS upload failed:", error);
// // // //       throw new Error("IPFS upload failed");
// // // //     }
// // // //   };

// // // //   const handleEncrypt = async () => {
// // // //     if (!web3 || !contract) {
// // // //       alert("Web3 or contract is not initialized.");
// // // //       return;
// // // //     }

// // // //     if (!aesKey) {
// // // //       alert("AES key not generated.");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const encryptedPayload = encryptData(data, accessPolicy, aesKey);
// // // //       console.log("Encrypted Data:", encryptedPayload);

// // // //       const ipfsHash = await uploadToIPFS(encryptedPayload);
// // // //       console.log("Stored on IPFS with hash:", ipfsHash);

// // // //       await handleContractCall(ipfsHash);
// // // //     } catch (error) {
// // // //       console.error("Encryption failed:", error);
// // // //       alert("Encryption failed.");
// // // //     }
// // // //   };

// // // //   const handleContractCall = async (ipfsHash) => {
// // // //     try {
// // // //       const gasEstimate = await contract.methods
// // // //         .logEncryption(ipfsHash)
// // // //         .estimateGas({ from: account });

// // // //       const receipt = await contract.methods
// // // //         .logEncryption(ipfsHash)
// // // //         .send({ from: account, gas: gasEstimate });

// // // //       console.log("Transaction hash:", receipt.transactionHash);
// // // //       console.log("Gas used:", receipt.gasUsed);
// // // //       alert("Encryption logged successfully on blockchain with IPFS hash.");
// // // //     } catch (error) {
// // // //       console.error("Error in contract call:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h1>Encrypt Data</h1>
// // // //       <div>
// // // //         <textarea
// // // //           value={data}
// // // //           onChange={(e) => setData(e.target.value)}
// // // //           placeholder="Enter data to encrypt"
// // // //         />
// // // //       </div>
// // // //       <div>
// // // //         <label>Access Policy (comma-separated):</label>
// // // //         <input
// // // //           type="text"
// // // //           value={accessPolicy}
// // // //           onChange={(e) => setAccessPolicy(e.target.value)}
// // // //           placeholder="e.g., role:admin, location:NY"
// // // //         />
// // // //       </div>
// // // //       <button onClick={handleEncrypt}>Encrypt</button>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Encrypt;

// // // import React, { useState, useEffect } from "react";
// // // import Web3 from "web3";
// // // import { create } from "ipfs-http-client";
// // // import sjcl from "sjcl";
// // // import CPABEEncrypt from "/biocryptor/client/src/contracts/EncryptionLog.json"; // Replace with actual ABI

// // // const contractAddress = "0xA90B0587B79959B743c665fb6A5B3F1c7FF8a4dA"; // Replace with actual contract address
// // // const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" }); // Connect to IPFS

// // // function Encrypt() {
// // //   const [web3, setWeb3] = useState(null);
// // //   const [contract, setContract] = useState(null);
// // //   const [account, setAccount] = useState("");
// // //   const [data, setData] = useState("");
// // //   const [accessPolicy, setAccessPolicy] = useState("");
// // //   const [aesKey, setAesKey] = useState(null);

// // //   useEffect(() => {
// // //     const loadBlockchainData = async () => {
// // //       const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache local blockchain
// // //       const accounts = await web3Instance.eth.getAccounts();
// // //       setAccount(accounts[0]); // Use the first account
// // //       const contractInstance = new web3Instance.eth.Contract(
// // //         CPABEEncrypt.abi,
// // //         contractAddress
// // //       );
// // //       setWeb3(web3Instance);
// // //       setContract(contractInstance);
// // //       generateAesKey();
// // //     };
// // //     loadBlockchainData();
// // //   }, []);

// // //   const generateAesKey = () => {
// // //     const key = sjcl.random.randomWords(8); // 256-bit key (AES-256)
// // //     const keyBase64 = sjcl.codec.base64.fromBits(key);
// // //     setAesKey(keyBase64);
// // //     console.log("Generated AES Key:", keyBase64);
// // //   };

// // //   const encryptData = (data, accessPolicy, base64Key) => {
// // //     if (!data || !accessPolicy || !base64Key) {
// // //       throw new Error("Missing data, access policy, or key.");
// // //     }

// // //     const key = sjcl.codec.base64.toBits(base64Key);
// // //     const nonce = sjcl.random.randomWords(4, 0); // 16-byte nonce

// // //     const combinedData = JSON.stringify({ data, accessPolicy });

// // //     const encrypted = sjcl.mode.eax.encrypt(
// // //       new sjcl.cipher.aes(key),
// // //       sjcl.codec.utf8String.toBits(combinedData),
// // //       nonce
// // //     );

// // //     return {
// // //       encryptedData: sjcl.codec.base64.fromBits(encrypted),
// // //       nonce: sjcl.codec.base64.fromBits(nonce),
// // //     };
// // //   };

// // //   const uploadToIPFS = async (encryptedData) => {
// // //     try {
// // //       const { path } = await ipfs.add(JSON.stringify(encryptedData));
// // //       return path; // IPFS hash
// // //     } catch (error) {
// // //       console.error("IPFS upload failed:", error);
// // //       throw new Error("IPFS upload failed");
// // //     }
// // //   };

// // //   const handleEncrypt = async () => {
// // //     if (!web3 || !contract) {
// // //       alert("Web3 or contract is not initialized.");
// // //       return;
// // //     }

// // //     if (!aesKey) {
// // //       alert("AES key not generated.");
// // //       return;
// // //     }

// // //     try {
// // //       const encryptedPayload = encryptData(data, accessPolicy, aesKey);
// // //       console.log("Encrypted Data:", encryptedPayload);

// // //       const ipfsHash = await uploadToIPFS(encryptedPayload);
// // //       console.log("Stored on IPFS with hash:", ipfsHash);

// // //       await handleContractCall(ipfsHash);
// // //     } catch (error) {
// // //       console.error("Encryption failed:", error);
// // //       alert("Encryption failed.");
// // //     }
// // //   };

// // //   const handleContractCall = async (ipfsHash) => {
// // //     try {
// // //       const gasEstimate = await contract.methods
// // //         .logEncryption(ipfsHash)
// // //         .estimateGas({ from: account });

// // //       const receipt = await contract.methods
// // //         .logEncryption(ipfsHash)
// // //         .send({ from: account, gas: gasEstimate });

// // //       console.log("Transaction hash:", receipt.transactionHash);
// // //       console.log("Gas used:", receipt.gasUsed);
// // //       alert("Encryption logged successfully on blockchain with IPFS hash.");
// // //     } catch (error) {
// // //       console.error("Error in contract call:", error);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Encrypt Data</h1>
// // //       <div>
// // //         <textarea
// // //           value={data}
// // //           onChange={(e) => setData(e.target.value)}
// // //           placeholder="Enter data to encrypt"
// // //         />
// // //       </div>
// // //       <div>
// // //         <label>Access Policy (comma-separated):</label>
// // //         <input
// // //           type="text"
// // //           value={accessPolicy}
// // //           onChange={(e) => setAccessPolicy(e.target.value)}
// // //           placeholder="e.g., role:admin, location:NY"
// // //         />
// // //       </div>
// // //       <button onClick={handleEncrypt}>Encrypt</button>
// // //     </div>
// // //   );
// // // }

// // // export default Encrypt;

// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import CryptoJS from "crypto-js";
// import { create } from "ipfs-http-client";
// import CPABEEncrypt from "/biocryptor/client/src/contracts/EncryptionLog.json"; // Replace with actual ABI

// const contractAddress = "0x1F196a380910781100C1d5B483D63F35D7d1e53c"; // Replace with actual contract address
// const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" }); // IPFS client

// function Encrypt() {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState("");
//   const [data, setData] = useState("");
//   const [accessPolicy, setAccessPolicy] = useState("");
//   const [aesKey, setAesKey] = useState(null);

//   useEffect(() => {
//     const loadBlockchainData = async () => {
//       const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache local blockchain
//       const accounts = await web3Instance.eth.getAccounts();
//       setAccount(accounts[0]);
//       const contractInstance = new web3Instance.eth.Contract(
//         CPABEEncrypt.abi,
//         contractAddress
//       );
//       setWeb3(web3Instance);
//       setContract(contractInstance);
//       generateAesKey();
//     };
//     loadBlockchainData();
//   }, []);

//   const generateAesKey = () => {
//     const key = CryptoJS.lib.WordArray.random(32);
//     const keyBase64 = key.toString(CryptoJS.enc.Base64);
//     setAesKey(keyBase64);
//     console.log("Generated AES-256 Key (Base64):", keyBase64);
//   };

//   const encryptData = (data, base64Key) => {
//     if (!data || !base64Key) throw new Error("Data or key is missing.");
//     const key = CryptoJS.enc.Base64.parse(base64Key);
//     const iv = CryptoJS.lib.WordArray.random(16);
//     const encrypted = CryptoJS.AES.encrypt(data, key, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     }).toString();
//     console.log("IV:", iv.toString(CryptoJS.enc.Base64));
//     return encrypted;
//   };

//   const projectId = "b448ab44cc904fd0bf3763c4d339bc14"; // Replace with Infura Project ID
//   const projectSecret =
//     "yEgjaQkLkk1AJUIDcpyJ7WLS/8ipIu99J5OcYblbaPGFxTj+jGDcmQ"; // Replace with Infura Project Secret

//   // ✅ Create an authentication string
//   const auth = "Basic " + btoa(projectId + ":" + projectSecret);

//   // ✅ Connect to Infura IPFS with authentication
//   const ipfs = create({
//     host: "ipfs.infura.io",
//     port: 5001,
//     protocol: "https",
//     headers: {
//       authorization: auth,
//     },
//   });

//   const uploadToIPFS = async (data) => {
//     try {
//       const added = await ipfs.add(data);
//       console.log("IPFS CID:", added.path); // This is your CID
//       return added.path; // Returns the IPFS CID
//     } catch (error) {
//       console.error("IPFS Upload Error:", error);
//       throw new Error("Failed to upload to IPFS");
//     }
//   };

//   const handleEncrypt = async () => {
//     if (!web3 || !contract) {
//       alert("Web3 or contract is not initialized.");
//       return;
//     }
//     if (!aesKey) {
//       alert("AES key not generated.");
//       return;
//     }

//     try {
//       const encryptedData = encryptData(data, aesKey);
//       const ipfsHash = await uploadToIPFS(encryptedData);
//       const accessPolicyFormatted = JSON.stringify(accessPolicy);
//       console.log("Encrypted Data Hash on IPFS:", ipfsHash);
//       await handleContractCall(ipfsHash, accessPolicyFormatted);

//       alert("Encryption logged successfully.");
//     } catch (error) {
//       console.error("Encryption failed:", error);
//       alert("Encryption failed.");
//     }
//   };

//   const handleContractCall = async (ipfsHash, accessPolicyFormatted) => {
//     try {
//       const gasEstimate = await contract.methods
//         .logEncryption(ipfsHash, accessPolicyFormatted)
//         .estimateGas({ from: account });

//       const receipt = await contract.methods
//         .logEncryption(ipfsHash, accessPolicyFormatted)
//         .send({ from: account, gas: gasEstimate });

//       console.log(`Transaction hash: ${receipt.transactionHash}`);
//       console.log(`Gas used: ${receipt.gasUsed}`);
//     } catch (error) {
//       console.error("Error in contract call:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Encrypt Data</h1>
//       <div>
//         <textarea
//           value={data}
//           onChange={(e) => setData(e.target.value)}
//           placeholder="Enter data to encrypt"
//         />
//       </div>
//       <div>
//         <label>Access Policy (comma-separated):</label>
//         <input
//           type="text"
//           value={accessPolicy}
//           onChange={(e) => setAccessPolicy(e.target.value)}
//           placeholder="e.g., role:admin, location:NY"
//         />
//       </div>
//       <button onClick={handleEncrypt}>Encrypt & Upload</button>
//     </div>
//   );
// }

// export default Encrypt;

// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import CryptoJS from "crypto-js";
// import { create } from "ipfs-http-client";
// import CPABEEncrypt from "/biocryptor/client/src/contracts/EncryptionLog.json"; // Replace with actual ABI

// const contractAddress = "0xBce62c3F1597019D9662fFf4Bc63f972a6B7Dc51"; // Replace with actual contract address
// const ipfs = create({ host: "127.0.0.1", port: 5001, protocol: "http" }); // Connect to local IPFS node

// function Encrypt() {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState("");
//   const [data, setData] = useState("");
//   const [accessPolicy, setAccessPolicy] = useState("");
//   const [aesKey, setAesKey] = useState(null);
//   const [ipfsCid, setIpfsCid] = useState("");

//   useEffect(() => {
//     const loadBlockchainData = async () => {
//       const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache local blockchain
//       const accounts = await web3Instance.eth.getAccounts();
//       setAccount(accounts[0]);
//       const contractInstance = new web3Instance.eth.Contract(
//         CPABEEncrypt.abi,
//         contractAddress
//       );
//       setWeb3(web3Instance);
//       setContract(contractInstance);
//       generateAesKey();
//     };
//     loadBlockchainData();
//   }, []);

//   const generateAesKey = () => {
//     const key = CryptoJS.lib.WordArray.random(32);
//     const keyBase64 = key.toString(CryptoJS.enc.Base64);
//     setAesKey(keyBase64);
//     console.log("Generated AES-256 Key (Base64):", keyBase64);
//   };

//   const encryptData = (plainText, base64Key) => {
//     const key = CryptoJS.enc.Base64.parse(base64Key);
//     const iv = CryptoJS.lib.WordArray.random(16); // IV needed for CBC mode

//     const encrypted = CryptoJS.AES.encrypt(plainText, key, {
//       iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     // Store both ciphertext and IV
//     return JSON.stringify({
//       ciphertext: encrypted.toString(),
//       iv: iv.toString(CryptoJS.enc.Hex),
//     });
//   };


//   const uploadToIPFS = async (jsonData) => {
//     try {
//       const { path } = await ipfs.add(JSON.stringify(jsonData));
//       console.log("IPFS CID:", path);
//       setIpfsCid(path);
//       return path;
//     } catch (error) {
//       console.error("IPFS Upload Error:", error);
//       throw new Error("Failed to upload to IPFS");
//     }
//   };

//   const handleEncrypt = async () => {
//     if (!web3 || !contract) {
//       alert("Web3 or contract is not initialized.");
//       return;
//     }
//     if (!aesKey) {
//       alert("AES key not generated.");
//       return;
//     }

//     try {
//       const encryptedData = encryptData(data, aesKey);
//       const encryptedKey = encryptData(aesKey, aesKey);
//       const encryptedAccessPolicy = encryptData(accessPolicy, aesKey);

//       const jsonData = {
//         encryptedData: encryptedData,
//         encryptedKey: encryptedKey,
//         encryptedAccessPolicy: encryptedAccessPolicy,
//       };
//       const ipfsHash = await uploadToIPFS(jsonData);
//       console.log("Encrypted Data Stored on IPFS:", ipfsHash);
//       await handleContractCall(ipfsHash);
//       alert("Encryption logged successfully.");
//     } catch (error) {
//       console.error("Encryption failed:", error);
//       alert("Encryption failed.");
//     }
//   };

//   const logCidToBackend = async (cid) => {
//     try {
//       const response = await fetch("http://localhost:5000/log-cid", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cid }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to log CID");
//       }

//       console.log("CID logged to backend.");
//     } catch (err) {
//       console.error("CID Logging Error:", err);
//     }
//   };

//   const handleContractCall = async (ipfsHash) => {
//     try {
//       const gasEstimate = await contract.methods
//         .logEncryption(ipfsHash)
//         .estimateGas({ from: account });

//       const receipt = await contract.methods
//         .logEncryption(ipfsHash)
//         .send({ from: account, gas: gasEstimate });

//       console.log(`Transaction hash: ${receipt.transactionHash}`);
//       console.log(`Gas used: ${receipt.gasUsed}`);
//     } catch (error) {
//       console.error("Error in contract call:", error);
//     }
//     await logCidToBackend(ipfsHash);
//   };

//   return (
//     <div>
//       <h1>Encrypt Data</h1>
//       <div>
//         <textarea
//           value={data}
//           onChange={(e) => setData(e.target.value)}
//           placeholder="Enter data to encrypt"
//         />
//       </div>
//       <div>
//         <label>Access Policy (comma-separated):</label>
//         <input
//           type="text"
//           value={accessPolicy}
//           onChange={(e) => setAccessPolicy(e.target.value)}
//           placeholder="e.g., role:admin, location:NY"
//         />
//       </div>
//       <button onClick={handleEncrypt}>Encrypt & Upload</button>
//       {ipfsCid && (
//         <div>
//           <h2>Stored IPFS CID:</h2>
//           <p>{ipfsCid}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Encrypt;


































// https://ipfs.io/ipfs/QmYourCIDHere

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CryptoJS from "crypto-js";
import { create } from "ipfs-http-client";
import CPABEEncrypt from "/biocryptor - Copy/client/src/contracts/EncryptionLog.json"; // Replace with actual ABI

const contractAddress = "0xBce62c3F1597019D9662fFf4Bc63f972a6B7Dc51"; // Replace with actual contract address
const ipfs = create({ host: "127.0.0.1", port: 5001, protocol: "http" }); // Connect to local IPFS node

function Encrypt() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [data, setData] = useState("");
  const [accessPolicy, setAccessPolicy] = useState("");
  const [aesKey, setAesKey] = useState(null);
  const [ipfsCid, setIpfsCid] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache local blockchain
      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
      const contractInstance = new web3Instance.eth.Contract(
        CPABEEncrypt.abi,
        contractAddress
      );
      setWeb3(web3Instance);
      setContract(contractInstance);
      generateAesKey();
    };
    loadBlockchainData();
  }, []);

  const generateAesKey = () => {
    const key = CryptoJS.lib.WordArray.random(32); // 256-bit key
    const keyBase64 = key.toString(CryptoJS.enc.Base64);
    setAesKey(keyBase64);
    console.log("Generated AES-256 Key (Base64):", keyBase64);
  };

  const encryptData = (plainText, base64Key) => {
    const key = CryptoJS.enc.Base64.parse(base64Key);
    const iv = CryptoJS.lib.WordArray.random(16); // 128-bit IV

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return {
      ciphertext: encrypted.toString(),
      iv: iv.toString(CryptoJS.enc.Hex),
    };
  };

  const uploadToIPFS = async (jsonData) => {
    try {
      const { path } = await ipfs.add(jsonData);
      console.log("IPFS CID:", path);
      setIpfsCid(path);
      return path;
    } catch (error) {
      console.error("IPFS Upload Error:", error);
      throw new Error("Failed to upload to IPFS");
    }
  };

  const handleEncrypt = async () => {
    if (!web3 || !contract) {
      alert("Web3 or contract is not initialized.");
      return;
    }
    if (!aesKey) {
      alert("AES key not generated.");
      return;
    }

    try {
      const { ciphertext, iv } = encryptData(data, aesKey);

      const jsonData = JSON.stringify({
        encryptedData: ciphertext,
        iv: iv,
        aesKey: aesKey, // Storing AES key in plaintext
        accessPolicy: accessPolicy, // Storing access policy in plaintext
      });

      const ipfsHash = await uploadToIPFS(jsonData);
      console.log("Encrypted Data Stored on IPFS:", ipfsHash);
      await handleContractCall(ipfsHash);
      alert("Encryption logged successfully.");
    } catch (error) {
      console.error("Encryption failed:", error);
      alert("Encryption failed.");
    }
  };

  const logCidToBackend = async (cid) => {
    try {
      const response = await fetch("http://localhost:5000/log-cid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cid }),
      });

      if (!response.ok) {
        throw new Error("Failed to log CID");
      }

      console.log("CID logged to backend.");
    } catch (err) {
      console.error("CID Logging Error:", err);
    }
  };

  const handleContractCall = async (ipfsHash) => {
    try {
      const gasEstimate = await contract.methods
        .logEncryption(ipfsHash)
        .estimateGas({ from: account });

      const receipt = await contract.methods
        .logEncryption(ipfsHash)
        .send({ from: account, gas: gasEstimate });

      console.log(`Transaction hash: ${receipt.transactionHash}`);
      console.log(`Gas used: ${receipt.gasUsed}`);
    } catch (error) {
      console.error("Error in contract call:", error);
    }
    await logCidToBackend(ipfsHash);
  };

  return (
    <div>
      <h1>Encrypt Data</h1>
      <div>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter data to encrypt"
        />
      </div>
      <div>
        <label>Access Policy (comma-separated):</label>
        <input
          type="text"
          value={accessPolicy}
          onChange={(e) => setAccessPolicy(e.target.value)}
          placeholder="e.g., role:admin, location:NY"
        />
      </div>
      <button onClick={handleEncrypt}>Encrypt & Upload</button>
      {ipfsCid && (
        <div>
          <h2>Stored IPFS CID:</h2>
          <p>{ipfsCid}</p>
        </div>
      )}
    </div>
  );
}

export default Encrypt;

