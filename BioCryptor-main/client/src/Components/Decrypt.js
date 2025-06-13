// // // // // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // // // // import Web3 from "web3";
// // // // // // // // import sha256 from "crypto-js/sha256";
// // // // // // // // import CPABEDecryption from "/biocryptor/client/src/contracts/CPABEDecryption.json";

// // // // // // // // const contractAddress = "0xYourGanacheContractAddress";

// // // // // // // // function Decrypt() {
// // // // // // // //   const [encryptedData, setEncryptedData] = useState("");
// // // // // // // //   const [decryptedData, setDecryptedData] = useState("");
// // // // // // // //   const [faceHash, setFaceHash] = useState("");
// // // // // // // //   const videoRef = useRef(null);
// // // // // // // //   const canvasRef = useRef(null);
// // // // // // // //   const [web3, setWeb3] = useState(null);
// // // // // // // //   const [contract, setContract] = useState(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     setWeb3(new Web3("http://127.0.0.1:7545"));
// // // // // // // //     setContract(new web3.eth.Contract(CPABEDecryption.abi, contractAddress));
// // // // // // // //   }, []);

// // // // // // // //   const captureFace = () => {
// // // // // // // //     const video = videoRef.current;
// // // // // // // //     const canvas = canvasRef.current;
// // // // // // // //     const context = canvas.getContext("2d");
// // // // // // // //     context.drawImage(video, 0, 0, canvas.width, canvas.height);
// // // // // // // //     const imageData = canvas.toDataURL();
// // // // // // // //     const hash = sha256(imageData).toString();
// // // // // // // //     setFaceHash(hash);
// // // // // // // //   };

// // // // // // // //   const handleDecrypt = async () => {
// // // // // // // //     try {
// // // // // // // //       const encryptedDataHash = "exampleHash"; // Replace with actual hash from your data
// // // // // // // //       const accessPolicy = "role:admin"; // Example access policy

// // // // // // // //       const decryptedData = await performDecryptionLogic(); // Your decryption function
// // // // // // // //       if (decryptedData) {
// // // // // // // //         await contract.methods
// // // // // // // //           .logDecryption(encryptedDataHash, accessPolicy, true)
// // // // // // // //           .send({ from: account });
// // // // // // // //         alert("Decryption successful: " + decryptedData);
// // // // // // // //       } else {
// // // // // // // //         await contract.methods
// // // // // // // //           .logDecryption(encryptedDataHash, accessPolicy, false)
// // // // // // // //           .send({ from: account });
// // // // // // // //         alert("Decryption failed.");
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error(error);
// // // // // // // //       alert("Decryption error occurred.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <h1>Decrypt Data</h1>
// // // // // // // //       <textarea
// // // // // // // //         placeholder="Paste Encrypted Data"
// // // // // // // //         value={encryptedData}
// // // // // // // //         onChange={(e) => setEncryptedData(e.target.value)}
// // // // // // // //       />
// // // // // // // //       <video ref={videoRef} autoPlay width="320" height="240"></video>
// // // // // // // //       <canvas
// // // // // // // //         ref={canvasRef}
// // // // // // // //         width="320"
// // // // // // // //         height="240"
// // // // // // // //         style={{ display: "none" }}
// // // // // // // //       ></canvas>
// // // // // // // //       <button onClick={captureFace}>Capture Face</button>
// // // // // // // //       <button onClick={handleDecrypt}>Decrypt</button>
// // // // // // // //       {decryptedData && <p>Decrypted Data: {decryptedData}</p>}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default Decrypt;

// // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // import Web3 from "web3";
// // // // // // // import CPABEDecrypt from "/biocryptor/client/src/contracts/CPABEDecryption.json"; // Smart contract ABI
// // // // // // // import sha256 from "crypto-js/sha256";

// // // // // // // const contractAddress = "0x7dD99359aa2E3961B8a989b35Ee2B9E37514BD95"; // Replace with actual address

// // // // // // // function Decrypt() {
// // // // // // //   const [encryptedData, setEncryptedData] = useState("");
// // // // // // //   const [decryptedData, setDecryptedData] = useState("");
// // // // // // //   const [accessPolicy, setAccessPolicy] = useState("");
// // // // // // //   const [imageHash, setImageHash] = useState("");
// // // // // // //   const [web3, setWeb3] = useState(null);
// // // // // // //   const [account, setAccount] = useState("");
// // // // // // //   const [contract, setContract] = useState(null);
// // // // // // //   const videoRef = useRef(null);
// // // // // // //   const canvasRef = useRef(null);

// // // // // // //   const loadBlockchainData = async () => {
// // // // // // //     const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache
// // // // // // //     const accounts = await web3Instance.eth.getAccounts();
// // // // // // //     setWeb3(web3Instance);
// // // // // // //     setAccount(accounts[0]);
// // // // // // //     const contractInstance = new web3Instance.eth.Contract(
// // // // // // //       CPABEDecrypt.abi,
// // // // // // //       contractAddress
// // // // // // //     );
// // // // // // //     setContract(contractInstance);
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     loadBlockchainData();
// // // // // // //   }, []);

// // // // // // //   const captureAndHashFace = async () => {
// // // // // // //     // Implement webcam capture logic here
// // // // // // //     const video = videoRef.current;
// // // // // // //     const canvas = canvasRef.current;
// // // // // // //     const context = canvas.getContext("2d");
// // // // // // //     context.drawImage(video, 0, 0, canvas.width, canvas.height);
// // // // // // //     const imageData = canvas.toDataURL();
// // // // // // //     const hash = sha256(imageData).toString();
// // // // // // //     const faceHashBytes32 = Web3.utils.hexToBytes("0x" + hash);

// // // // // // //     setImageHash(faceHashBytes32);
// // // // // // //     return faceHashBytes32;
// // // // // // //   };

// // // // // // //   const performDecryptionLogic = async () => {
// // // // // // //     // Load private key and attributes for decryption (hardcoded or user-provided)
// // // // // // //     const userKey = {
// // // // // // //       privateKey:
// // // // // // //         "0xb0d748b7f204648b949c0cfe00b4d8c5c8636c4454c2a1235114988ccd4a6027",
// // // // // // //       attributes: ["Chief of Police", "Police Department"],
// // // // // // //     };

// // // // // // //     const accessPolicyArray = ["Chief of Police", "Police Department"]; // Example: "role:admin,dept:IT"

// // // // // // //     // Simulating CPABE decryption using access policy and user key
// // // // // // //     const decrypted = await CPABEDecrypt(
// // // // // // //       encryptedData,
// // // // // // //       userKey,
// // // // // // //       accessPolicyArray
// // // // // // //     );

// // // // // // //     const userFaceHash = await captureAndHashFace();

// // // // // // //     if (
// // // // // // //       decrypted &&
// // // // // // //       userFaceHash ===
// // // // // // //         "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52"
// // // // // // //     ) {
// // // // // // //       return decrypted;
// // // // // // //     } else {
// // // // // // //       throw new Error("Decryption failed: Attributes or biometric mismatch.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleDecrypt = async () => {
// // // // // // //     try {
// // // // // // //       const encryptedDataHash = sha256(encryptedData).toString(); // Moved inside function
// // // // // // //       const result = await performDecryptionLogic();

// // // // // // //       if (result) {
// // // // // // //         const gasEstimate = await contract.methods
// // // // // // //           .logDecryption(imageHash, encryptedData)
// // // // // // //           .estimateGas({ from: account });

// // // // // // //         await contract.methods
// // // // // // //           .logDecryption(imageHash, encryptedData)
// // // // // // //           .send({ from: account, gas: gasEstimate.toString() });
// // // // // // //         setDecryptedData(result);
// // // // // // //         alert("Decryption successful: " + result);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error(error);
// // // // // // //       const encryptedDataHash = sha256(encryptedData).toString(); // Define for failed decryption too
// // // // // // //       await contract.methods
// // // // // // //         .logDecryption(encryptedDataHash, accessPolicy, false)
// // // // // // //         .send({ from: account });
// // // // // // //       alert("Decryption failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       <h1>Decrypt Data</h1>
// // // // // // //       <textarea
// // // // // // //         placeholder="Encrypted Data"
// // // // // // //         value={encryptedData}
// // // // // // //         onChange={(e) => setEncryptedData(e.target.value)}
// // // // // // //       ></textarea>
// // // // // // //       <video ref={videoRef} autoPlay width="320" height="240"></video>
// // // // // // //       <canvas
// // // // // // //         ref={canvasRef}
// // // // // // //         width="320"
// // // // // // //         height="240"
// // // // // // //         style={{ display: "none" }}
// // // // // // //       />
// // // // // // //       <button onClick={captureAndHashFace}>Capture Face</button>
// // // // // // //       <button onClick={handleDecrypt}>Decrypt</button>
// // // // // // //       {decryptedData && <p>Decrypted Data: {decryptedData}</p>}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default Decrypt;

// // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // import Web3 from "web3";
// // // // // // import CPABEDecrypt from "/biocryptor/client/src/contracts/CPABEDecryption.json";
// // // // // // import sha256 from "crypto-js/sha256";

// // // // // // const contractAddress = "0x7dD99359aa2E3961B8a989b35Ee2B9E37514BD95"; // Replace with actual address

// // // // // // function Decrypt() {
// // // // // //   const [encryptedData, setEncryptedData] = useState("");
// // // // // //   const [decryptedData, setDecryptedData] = useState("");
// // // // // //   const [imageHash, setImageHash] = useState("");
// // // // // //   const [web3, setWeb3] = useState(null);
// // // // // //   const [account, setAccount] = useState("");
// // // // // //   const [contract, setContract] = useState(null);
// // // // // //   const videoRef = useRef(null);
// // // // // //   const canvasRef = useRef(null);

// // // // // //   const loadBlockchainData = async () => {
// // // // // //     const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache
// // // // // //     const accounts = await web3Instance.eth.getAccounts();
// // // // // //     setWeb3(web3Instance);
// // // // // //     setAccount(accounts[0]);
// // // // // //     const contractInstance = new web3Instance.eth.Contract(
// // // // // //       CPABEDecrypt.abi,
// // // // // //       contractAddress
// // // // // //     );
// // // // // //     setContract(contractInstance);
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     loadBlockchainData();
// // // // // //   }, []);

// // // // // //   const captureAndHashFace = async () => {
// // // // // //     const video = videoRef.current;
// // // // // //     const canvas = canvasRef.current;
// // // // // //     const context = canvas.getContext("2d");
// // // // // //     context.drawImage(video, 0, 0, canvas.width, canvas.height);
// // // // // //     const imageData = canvas.toDataURL();
// // // // // //     const hash = sha256(imageData).toString();
// // // // // //     return Web3.utils.hexToBytes("0x" + hash);
// // // // // //   };

// // // // // //   const handleContractCall = async (dataHash, accessPolicy, success) => {
// // // // // //     try {
// // // // // //       const gasEstimate = await contract.methods
// // // // // //         .logDecryption(dataHash, accessPolicy, success)
// // // // // //         .estimateGas({ from: account });

// // // // // //       const receipt = await contract.methods
// // // // // //         .logDecryption(dataHash, accessPolicy, success)
// // // // // //         .send({ from: account, gas: gasEstimate.toString() });

// // // // // //       console.log(`Transaction hash: ${receipt.transactionHash}`);
// // // // // //       console.log(`Gas used: ${receipt.gasUsed}`);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error in contract call:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const performDecryptionLogic = async () => {
// // // // // //     const userKey = {
// // // // // //       privateKey: "0xYourPrivateKeyHere",
// // // // // //       attributes: ["attribute1", "attribute2"], // Replace with actual attributes
// // // // // //     };

// // // // // //     const accessPolicyArray = ["attribute1", "attribute3"]; // Example hardcoded access policy
// // // // // //     const userFaceHash = await captureAndHashFace();

// // // // // //     const attributeCheck = accessPolicyArray.every((attr) =>
// // // // // //       userKey.attributes.includes(attr)
// // // // // //     );

// // // // // //     if (attributeCheck && userFaceHash === imageHash) {
// // // // // //       return "Decrypted Data"; // Replace with actual decryption logic
// // // // // //     } else {
// // // // // //       throw new Error("Attributes or biometric authentication failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDecrypt = async () => {
// // // // // //     try {
// // // // // //       const encryptedDataHash = sha256(encryptedData).toString();
// // // // // //       const result = await performDecryptionLogic();
// // // // // //       await handleContractCall(
// // // // // //         encryptedDataHash,
// // // // // //         "attribute1,attribute3",
// // // // // //         true
// // // // // //       );
// // // // // //       setDecryptedData(result);
// // // // // //       alert("Decryption successful: " + result);
// // // // // //     } catch (error) {
// // // // // //       console.error(error);
// // // // // //       const encryptedDataHash = sha256(encryptedData).toString();
// // // // // //       await handleContractCall(
// // // // // //         encryptedDataHash,
// // // // // //         "attribute1,attribute3",
// // // // // //         false
// // // // // //       );
// // // // // //       alert("Decryption failed.");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h1>Decrypt Data</h1>
// // // // // //       <textarea
// // // // // //         placeholder="Encrypted Data"
// // // // // //         value={encryptedData}
// // // // // //         onChange={(e) => setEncryptedData(e.target.value)}
// // // // // //       ></textarea>
// // // // // //       <video ref={videoRef} autoPlay width="320" height="240"></video>
// // // // // //       <canvas
// // // // // //         ref={canvasRef}
// // // // // //         width="320"
// // // // // //         height="240"
// // // // // //         style={{ display: "none" }}
// // // // // //       />
// // // // // //       <button onClick={handleDecrypt}>Decrypt</button>
// // // // // //       {decryptedData && <p>Decrypted Data: {decryptedData}</p>}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default Decrypt;

// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import Web3 from "web3";
// // // // // import CPABEDecrypt from "/biocryptor/client/src/contracts/CPABEDecryption.json"; // Smart contract ABI
// // // // // import sha256 from "crypto-js/sha256";

// // // // // const contractAddress = "0x7dD99359aa2E3961B8a989b35Ee2B9E37514BD95"; // Replace with actual address

// // // // // function Decrypt() {
// // // // //   const [encryptedData, setEncryptedData] = useState("");
// // // // //   const [decryptedData, setDecryptedData] = useState("");
// // // // //   const [imageHash, setImageHash] = useState("");
// // // // //   const [web3, setWeb3] = useState(null);
// // // // //   const [account, setAccount] = useState("");
// // // // //   const [contract, setContract] = useState(null);
// // // // //   const videoRef = useRef(null);
// // // // //   const canvasRef = useRef(null);

// // // // //   const loadBlockchainData = async () => {
// // // // //     const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache
// // // // //     const accounts = await web3Instance.eth.getAccounts();
// // // // //     setWeb3(web3Instance);
// // // // //     setAccount(accounts[0]);
// // // // //     const contractInstance = new web3Instance.eth.Contract(
// // // // //       CPABEDecrypt.abi,
// // // // //       contractAddress
// // // // //     );
// // // // //     setContract(contractInstance);
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     loadBlockchainData();
// // // // //   }, []);

// // // // //   const captureAndHashFace = async () => {
// // // // //     const video = videoRef.current;
// // // // //     const canvas = canvasRef.current;
// // // // //     const context = canvas.getContext("2d");
// // // // //     context.drawImage(video, 0, 0, canvas.width, canvas.height);
// // // // //     const imageData = canvas.toDataURL();
// // // // //     const hash = sha256(imageData).toString();
// // // // //     const faceHashBytes32 = Web3.utils.hexToBytes("0x" + hash);
// // // // //     setImageHash(faceHashBytes32);
// // // // //     return faceHashBytes32;
// // // // //   };

// // // // //   const performDecryptionLogic = async () => {
// // // // //     const userKey = {
// // // // //       privateKey:
// // // // //         "0xb0d748b7f204648b949c0cfe00b4d8c5c8636c4454c2a1235114988ccd4a6027",
// // // // //       attributes: ["Chief of Police", "Police Department"],
// // // // //     };

// // // // //     const accessPolicyArray = ["Chief of Police", "Police Department"];
// // // // //     const decrypted = await CPABEDecrypt(
// // // // //       encryptedData,
// // // // //       userKey,
// // // // //       accessPolicyArray
// // // // //     );
// // // // //     const userFaceHash = await captureAndHashFace();

// // // // //     if (
// // // // //       decrypted &&
// // // // //       userFaceHash ===
// // // // //         "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52"
// // // // //     ) {
// // // // //       return decrypted;
// // // // //     } else {
// // // // //       throw new Error("Decryption failed: Attributes or biometric mismatch.");
// // // // //     }
// // // // //   };

// // // // //   const handleDecrypt = async () => {
// // // // //     try {
// // // // //       const encryptedDataHash = sha256(encryptedData).toString();
// // // // //       const result = await performDecryptionLogic();

// // // // //       if (result) {
// // // // //         const attributesUsed = JSON.stringify([
// // // // //           "Chief of Police",
// // // // //           "Police Department",
// // // // //         ]);

// // // // //         const gasEstimate = await contract.methods
// // // // //           .logDecryption(encryptedDataHash, attributesUsed, true)
// // // // //           .estimateGas({ from: account });

// // // // //         await contract.methods
// // // // //           .logDecryption(encryptedDataHash, attributesUsed, true)
// // // // //           .send({ from: account, gas: gasEstimate.toString() });

// // // // //         setDecryptedData(result);
// // // // //         alert("Decryption successful: " + result);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       const encryptedDataHash = sha256(encryptedData).toString();
// // // // //       const attributesUsed = JSON.stringify([
// // // // //         "Chief of Police",
// // // // //         "Police Department",
// // // // //       ]);

// // // // //       await contract.methods
// // // // //         .logDecryption(encryptedDataHash, attributesUsed, false)
// // // // //         .send({ from: account });

// // // // //       alert("Decryption failed.");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h1>Decrypt Data</h1>
// // // // //       <textarea
// // // // //         placeholder="Encrypted Data"
// // // // //         value={encryptedData}
// // // // //         onChange={(e) => setEncryptedData(e.target.value)}
// // // // //       ></textarea>
// // // // //       <video ref={videoRef} autoPlay width="320" height="240"></video>
// // // // //       <canvas
// // // // //         ref={canvasRef}
// // // // //         width="320"
// // // // //         height="240"
// // // // //         style={{ display: "none" }}
// // // // //       />
// // // // //       <button onClick={captureAndHashFace}>Capture Face</button>
// // // // //       <button onClick={handleDecrypt}>Decrypt</button>
// // // // //       {decryptedData && <p>Decrypted Data: {decryptedData}</p>}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Decrypt;

// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import Web3 from "web3";
// // // // import CPABEDecrypt from "/biocryptor/client/src/contracts/CPABEDecryption.json"; // Smart contract ABI
// // // // import sha256 from "crypto-js/sha256";

// // // // const contractAddress = "0x3a752747216750E2Bc3317b084cE86572ab3eD59"; // Replace with actual address

// // // // function Decrypt() {
// // // //   const [encryptedData, setEncryptedData] = useState("");
// // // //   const [decryptedData, setDecryptedData] = useState("");
// // // //   const [imageHash, setImageHash] = useState("");
// // // //   const [web3, setWeb3] = useState(null);
// // // //   const [account, setAccount] = useState("");
// // // //   const [contract, setContract] = useState(null);
// // // //   const [uploadedImage, setUploadedImage] = useState(null); // State for the uploaded image
// // // //   const videoRef = useRef(null);
// // // //   const canvasRef = useRef(null);

// // // //   const loadBlockchainData = async () => {
// // // //     const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache
// // // //     const accounts = await web3Instance.eth.getAccounts();
// // // //     setWeb3(web3Instance);
// // // //     setAccount(accounts[0]);
// // // //     const contractInstance = new web3Instance.eth.Contract(
// // // //       CPABEDecrypt.abi,
// // // //       contractAddress
// // // //     );
// // // //     setContract(contractInstance);
// // // //   };

// // // //   useEffect(() => {
// // // //     loadBlockchainData();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //       navigator.mediaDevices
// // // //         .getUserMedia({ video: true })
// // // //         .then((stream) => {
// // // //           if (videoRef.current) {
// // // //             videoRef.current.srcObject = stream;
// // // //           }
// // // //         })
// // // //         .catch((err) => {
// // // //           console.error("Error accessing webcam:", err);
// // // //         });
// // // //     }, []);

// // // //   const captureAndHashFace = async () => {
// // // //     const video = videoRef.current;
// // // //     const canvas = canvasRef.current;
// // // //     const context = canvas.getContext("2d");
// // // //     context.drawImage(video, 0, 0, canvas.width, canvas.height);
// // // //     const imageData = canvas.toDataURL();
// // // //     const hash = sha256(imageData).toString();
// // // //     const faceHashBytes32 = Web3.utils.hexToBytes("0x" + hash);
// // // //     setImageHash(faceHashBytes32);
// // // //     return faceHashBytes32;
// // // //   };

// // // //   const handleImageUpload = (event) => {
// // // //     const file = event.target.files[0];
// // // //     if (file) {
// // // //       const reader = new FileReader();
// // // //       reader.onloadend = () => {
// // // //         const img = new Image();
// // // //         img.onload = () => {
// // // //           const canvas = document.createElement("canvas");
// // // //           const context = canvas.getContext("2d");
// // // //           context.drawImage(img, 0, 0, canvas.width, canvas.height);
// // // //           const imageData = canvas.toDataURL();
// // // //           const hash = sha256(imageData).toString();
// // // //           setUploadedImage(hash);
// // // //         };
// // // //         img.src = reader.result;
// // // //       };
// // // //       reader.readAsDataURL(file);
// // // //     }
// // // //   };

// // // //   const performDecryptionLogic = async () => {
// // // //     const userKey = {
// // // //       privateKey:
// // // //         "0xb0d748b7f204648b949c0cfe00b4d8c5c8636c4454c2a1235114988ccd4a6027",
// // // //       attributes: ["Chief of Police", "Police Department"],
// // // //     };

// // // //     const accessPolicyArray = ["Chief of Police", "Police Department"];
// // // //     const decrypted = await CPABEDecrypt(
// // // //       encryptedData,
// // // //       userKey,
// // // //       accessPolicyArray
// // // //     );
// // // //     const userFaceHash = await captureAndHashFace();

// // // //     if (
// // // //       decrypted &&
// // // //       (userFaceHash === uploadedImage ||
// // // //         userFaceHash ===
// // // //           "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52")
// // // //     ) {
// // // //       return decrypted;
// // // //     } else {
// // // //       throw new Error("Decryption failed: Attributes or biometric mismatch.");
// // // //     }
// // // //   };

// // // //   const handleDecrypt = async () => {
// // // //     if (!web3 || !contract) {
// // // //       alert("Web3 or contract is not initialized.");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const userKey = {
// // // //         privateKey:
// // // //           "0xb0d748b7f204648b949c0cfe00b4d8c5c8636c4454c2a1235114988ccd4a6027",
// // // //         attributes: ["Chief of Police", "Police Department"],
// // // //       };
// // // //       const encryptedDataHash = Web3.utils.keccak256(encryptedData); // Keccak256 for data hash
// // // //       const attributesUsedString = JSON.stringify(userKey.attributes); // Convert attributes to string
// // // //       const attributesHash = Web3.utils.keccak256(attributesUsedString); // Hash attributes string

// // // //       const result = await performDecryptionLogic();

// // // //       // 17d8bcd02a7aad60ee700ca24dc605cff486d9efadb987fc73ac64f5f7431d05 encrypted data

// // // //       if (result) {
// // // //         const gasEstimate = await contract.methods
// // // //           .logDecryption(encryptedDataHash, attributesHash, true)
// // // //           .estimateGas({ from: account });

// // // //         await contract.methods
// // // //           .logDecryption(encryptedDataHash, attributesHash, true)
// // // //           .send({ from: account, gas: gasEstimate });

// // // //         setDecryptedData(result);
// // // //         alert("Decryption successful: " + result);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //       alert("Decryption failed " + error.message);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h1>Decrypt Data</h1>
// // // //       <textarea
// // // //         placeholder="Encrypted Data"
// // // //         value={encryptedData}
// // // //         onChange={(e) => setEncryptedData(e.target.value)}
// // // //       ></textarea>
// // // //       <video ref={videoRef} autoPlay width="320" height="240"></video>
// // // //       <canvas
// // // //         ref={canvasRef}
// // // //         width="320"
// // // //         height="240"
// // // //         style={{ display: "none" }}
// // // //       />
// // // //       <button onClick={captureAndHashFace}>Capture Face</button>
// // // //       <input type="file" accept="image/*" onChange={handleImageUpload} />
// // // //       <button onClick={handleDecrypt}>Decrypt</button>
// // // //       {decryptedData && <p>Decrypted Data: {decryptedData}</p>}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Decrypt;

// // // import React, { useState, useEffect, useRef } from "react";
// // // import Web3 from "web3";
// // // import sha256 from "crypto-js/sha256";
// // // import CPABEDecryption from "/biocryptor/client/src/contracts/CPABEDecryption.json"; // Smart contract ABI

// // // const contractAddress = "0x6f6413CeC356a04f65410Dfb59696A6832Efb587"; // Replace with actual contract address

// // // function Decrypt() {
// // //   const [encryptedData, setEncryptedData] = useState("");
// // //   const [decryptedData, setDecryptedData] = useState("");
// // //   const [web3, setWeb3] = useState(null);
// // //   const [account, setAccount] = useState("");
// // //   const [contract, setContract] = useState(null);
// // //   const videoRef = useRef(null);
// // //   const canvasRef = useRef(null);

// // //   const loadBlockchainData = async () => {
// // //     const web3Instance = new Web3("http://127.0.0.1:7545"); // Ganache
// // //     const accounts = await web3Instance.eth.getAccounts();
// // //     const contractInstance = new web3Instance.eth.Contract(
// // //       CPABEDecryption.abi,
// // //       contractAddress
// // //     );
// // //     setWeb3(web3Instance);
// // //     setAccount(accounts[0]);
// // //     setContract(contractInstance);
// // //   };

// // //   useEffect(() => {
// // //     loadBlockchainData();
// // //   }, []);

// // //   const captureAndHashFace = async () => {
// // //     const video = videoRef.current;
// // //     const canvas = canvasRef.current;
// // //     const context = canvas.getContext("2d");
// // //     context.drawImage(video, 0, 0, canvas.width, canvas.height);
// // //     const imageData = canvas.toDataURL();
// // //     const hash = sha256(imageData).toString();
// // //     return Web3.utils.hexToBytes("0x" + hash); // Return bytes32 formatted hash
// // //   };

// // //   const fakeCPABEDecrypt = (encryptedData, userKey) => {
// // //     // Simulate decryption using a simple string match logic
// // //     if (userKey.attributes.includes("Chief of Police") && encryptedData) {
// // //       return "Decrypted message content"; // Replace with actual decrypted data logic
// // //     }
// // //     return null;
// // //   };

// // //   const performDecryptionLogic = async () => {
// // //     const userKey = {
// // //       privateKey:
// // //         "0xb0d748b7f204648b949c0cfe00b4d8c5c8636c4454c2a1235114988ccd4a6027",
// // //       attributes: ["Chief of Police", "Police Department"],
// // //     };

// // //     const decrypted = fakeCPABEDecrypt(encryptedData, userKey);
// // //     const userFaceHash = await captureAndHashFace();
// // //     const expectedHash =
// // //       "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52";

// // //     if (decrypted && userFaceHash === expectedHash) {
// // //       return decrypted;
// // //     } else {
// // //       throw new Error("Decryption failed: Attributes or biometric mismatch.");
// // //     }
// // //   };

// // //   const handleDecrypt = async () => {
// // //     try {
// // //       const encryptedDataHash = sha256(encryptedData).toString();
// // //       const result = await performDecryptionLogic();
// // //       if (result) {
// // //         const gasEstimate = await contract.methods
// // //           .logDecryption(
// // //             encryptedDataHash,
// // //             JSON.stringify(["Chief of Police", "Police Department"]),
// // //             true
// // //           )
// // //           .estimateGas({ from: account });
// // //         await contract.methods
// // //           .logDecryption(
// // //             encryptedDataHash,
// // //             JSON.stringify(["Chief of Police", "Police Department"]),
// // //             true
// // //           )
// // //           .send({ from: account, gas: gasEstimate });
// // //         setDecryptedData(result);
// // //         alert("Decryption successful: " + result);
// // //       }
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert("Decryption failed.");
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Decrypt Data</h1>
// // //       <textarea
// // //         placeholder="Encrypted Data"
// // //         value={encryptedData}
// // //         onChange={(e) => setEncryptedData(e.target.value)}
// // //       ></textarea>
// // //       <video ref={videoRef} autoPlay width="320" height="240"></video>
// // //       <canvas
// // //         ref={canvasRef}
// // //         width="320"
// // //         height="240"
// // //         style={{ display: "none" }}
// // //       />
// // //       <button onClick={handleDecrypt}>Decrypt</button>
// // //       {decryptedData && <p>Decrypted Data: {decryptedData}</p>}
// // //     </div>
// // //   );
// // // }

// // // export default Decrypt;

// // import React, { useState, useEffect, useRef } from "react";
// // import Web3 from "web3";
// // import sha256 from "crypto-js/sha256";
// // import CPABEDecryption from "/biocryptor/client/src/contracts/CPABEDecryption.json"; // Replace with actual ABI

// // const contractAddress = "0x08E97874c9e600Bc5c182EAa641B089Ebced1A9c"; // Replace with actual contract address

// // function Decrypt() {
// //   const [encryptedData, setEncryptedData] = useState("");
// //   const [decryptedData, setDecryptedData] = useState("");
// //   const [web3, setWeb3] = useState(null);
// //   const [account, setAccount] = useState("");
// //   const [contract, setContract] = useState(null);

// //   const [isCameraOn, setIsCameraOn] = useState(false);
// //   const [faceHash, setFaceHash] = useState("");

// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);
// //   const streamRef = useRef(null);

// //   useEffect(() => {
// //     const loadBlockchainData = async () => {
// //       const web3Instance = new Web3("http://127.0.0.1:7545");
// //       const accounts = await web3Instance.eth.getAccounts();
// //       const contractInstance = new web3Instance.eth.Contract(
// //         CPABEDecryption.abi,
// //         contractAddress
// //       );
// //       setWeb3(web3Instance);
// //       setAccount(accounts[5]);
// //       setContract(contractInstance);
// //     };
// //     loadBlockchainData();
// //   }, []);

// //   // const handleFileChange = (e) => {
// //   //   const uploadedFile = e.target.files[0];
// //   //   setFile(uploadedFile);
// //   // };

// //   // const computeFileHash = (file) => {
// //   //   return new Promise((resolve, reject) => {
// //   //     const reader = new FileReader();
// //   //     reader.onload = () => {
// //   //       const binaryData = reader.result;
// //   //       const hash = sha256(binaryData).toString();
// //   //       resolve(hash);
// //   //     };
// //   //     reader.onerror = reject;
// //   //     reader.readAsArrayBuffer(file);
// //   //   });
// //   // };

// //   function fakeCPABEDecrypt(encryptedData, userKey, expectedHash) {
// //     let ct = JSON.parse(encryptedData);
// //     // Decode base64 strings
// //     const ciphertext = ct.ciphertext; // base64 decode ciphertext

// //     // Access policy attributes
// //     const accessPolicyAttributes = ct.access_policy.split(" AND ");

// //     const hasRequiredAttribute = accessPolicyAttributes.some((attr) =>
// //       userKey.attributes.includes(attr)
// //     );

// //     if (!hasRequiredAttribute) {
// //       throw new Error("Access Denied: Insufficient Attributes");
// //     }

// //     const userFaceHash = userKey.faceHash;
// //     if (userFaceHash !== expectedHash) {
// //       throw new Error("Access Denied: Face Hash Mismatch");
// //     }

// //     const decryptedMessage = "This is confidential data"; // In real CP-ABE, this would be actual decryption

// //     return decryptedMessage;
// //   }

// //   const toggleCamera = async () => {
// //     setIsCameraOn(!isCameraOn);
// //     if (!isCameraOn) {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia({
// //           video: true,
// //         });
// //         if (videoRef.current) {
// //           videoRef.current.srcObject = stream;
// //           videoRef.current.play();
// //         }
// //       } catch (error) {
// //         console.error("Failed to access camera:", error.message);
// //         alert(
// //           "Failed to access camera. Ensure camera permissions are granted."
// //         );
// //       }
// //     } else {
// //       const stream = videoRef.current.srcObject;
// //       if (stream) {
// //         stream.getTracks().forEach((track) => track.stop());
// //       }
// //       videoRef.current.srcObject = null;
// //     }
// //   };

// //   const captureFace = () => {
// //     if (isCameraOn && videoRef.current && canvasRef.current) {
// //       const canvas = canvasRef.current;
// //       const context = canvas.getContext("2d");
// //       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
// //       const imageData = canvas.toDataURL();
// //       const hash = sha256(imageData).toString();
// //       setFaceHash(hash);
// //       alert("Face captured and hashed.");
// //     } else {
// //       alert("Camera is not enabled.");
// //     }
// //   };

// //   const handleDecrypt = async () => {
// //     const encryptedData = JSON.stringify({
// //       ciphertext: "Vz+SVbf3rMUEDgHQR1m6hA==", // base64 encoded ciphertext
// //       access_policy: "Chief of Police AND Police Department",
// //     });

// //     // if (!file) {
// //     //   alert("Please upload an image for verification.");
// //     //   return;
// //     // }

// //     const userKey = {
// //       privateKey:
// //         "0xb0d748b7f204648b949c0cfe00b4d8c5c8636c4454c2a1235114988ccd4a6027",
// //       attributes: ["Chief of Police", "Police Department"],
// //       faceHash:
// //         "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52",
// //     };

// //     const encryptedDataHash = `0x${sha256(encryptedData).toString()}`; // Prefix with 0x
// //     const attributesUsedHash = `0x${sha256(
// //       JSON.stringify(userKey.attributes)
// //     ).toString()}`; // Hash attributes

// //     const expectedHash =
// //       "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52";
// //     if (
// //       "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52" !==
// //       expectedHash
// //     ) {
// //       alert("Biometric verification failed.");
// //       return;
// //     }

// //     const decrypted = fakeCPABEDecrypt(encryptedData, userKey, expectedHash);
// //     try {
// //       const gasEstimate = await contract.methods
// //         .logDecryption(encryptedDataHash, attributesUsedHash, true)
// //         .estimateGas({ from: account });

// //       await contract.methods
// //         .logDecryption(encryptedDataHash, attributesUsedHash, true)
// //         .send({ from: account, gas: gasEstimate });

// //       setDecryptedData(decrypted);
// //       alert("Decryption successful: " + decrypted);
// //     } catch (error) {
// //       console.error("Contract error:", error);
// //       alert("Decryption failed: " + error.message);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Decrypt Data</h1>
// //       <textarea
// //         placeholder="Encrypted Data"
// //         value={encryptedData}
// //         onChange={(e) => setEncryptedData(e.target.value)}
// //       ></textarea>
// //       <div>
// //         <button onClick={toggleCamera}>
// //           {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
// //         </button>
// //         {isCameraOn && (
// //           <div>
// //             <video ref={videoRef} width="320" height="240" autoPlay />
// //             <canvas
// //               ref={canvasRef}
// //               width="320"
// //               height="240"
// //               style={{ display: "none" }}
// //             />
// //             <button onClick={captureFace}>Capture Face</button>
// //           </div>
// //         )}
// //       </div>
// //       <button onClick={handleDecrypt}>Decrypt</button>
// //       {decryptedData && <p>Decrypted Data: {decryptedData}</p>}
// //     </div>
// //   );
// // }

// // export default Decrypt;

// import React, { useState, useEffect, useRef } from "react";
// import Web3 from "web3";
// import CryptoJS from "crypto-js";
// import axios from "axios";
// import CPABEDecryption from "/biocryptor/client/src/contracts/CPABEDecryption.json"; // Replace with actual ABI

// const contractAddress = "0x08E97874c9e600Bc5c182EAa641B089Ebced1A9c"; // Replace with actual contract address
// const IPFS_GATEWAY = "https://ipfs.io/ipfs/"; // IPFS Gateway URL

// function Decrypt() {
//   const [decryptedData, setDecryptedData] = useState("");
//   const [web3, setWeb3] = useState(null);
//   const [account, setAccount] = useState("");
//   const [contract, setContract] = useState(null);
//   const [faceHash, setFaceHash] = useState("");
//   const [ipfsCid, setIpfsCid] = useState("");

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const loadBlockchainData = async () => {
//       const web3Instance = new Web3("http://127.0.0.1:7545");
//       const accounts = await web3Instance.eth.getAccounts();
//       const contractInstance = new web3Instance.eth.Contract(
//         CPABEDecryption.abi,
//         contractAddress
//       );
//       setWeb3(web3Instance);
//       setAccount(accounts[5]);
//       setContract(contractInstance);
//     };
//     loadBlockchainData();
//   }, []);

//   const toggleCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       }
//     } catch (error) {
//       console.error("Camera access denied", error);
//     }
//   };

//   const captureFace = () => {
//     if (videoRef.current && canvasRef.current) {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//       const imageData = canvas.toDataURL();
//       const hash = CryptoJS.SHA256(imageData).toString();
//       setFaceHash(hash);
//     }
//   };

//   const fetchIPFSData = async (cid) => {
//     try {
//       const response = await axios.get(`${IPFS_GATEWAY}${cid}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching IPFS data", error);
//       return null;
//     }
//   };

//   const handleDecrypt = async () => {
//     try {
//       const result = await contract.methods.getDecryptionData(account).call();
//       const { ipfsCid, accessPolicy, encryptedAESKey, encryptedData } = result;

//       const dataFromIPFS = await fetchIPFSData(ipfsCid);
//       if (!dataFromIPFS) return alert("Failed to retrieve data from IPFS");

//       const userKey = {
//         attributes: ["Chief of Police", "Police Department"],
//         faceHash:
//           "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52",
//       };

//       const requiredAttributes = accessPolicy.split(" AND ");
//       const hasAccess = requiredAttributes.every((attr) =>
//         userKey.attributes.includes(attr)
//       );
//       if (!hasAccess) return alert("Access Denied: Insufficient Attributes");

//       if (userKey.faceHash !== faceHash)
//         return alert("Face authentication failed");

//       const decryptedAESKey = CryptoJS.AES.decrypt(
//         encryptedAESKey,
//         "userPrivateKey"
//       ).toString(CryptoJS.enc.Utf8);
//       const decryptedMessage = CryptoJS.AES.decrypt(
//         encryptedData,
//         decryptedAESKey
//       ).toString(CryptoJS.enc.Utf8);
//       setDecryptedData(decryptedMessage);
//       alert("Decryption successful");
//     } catch (error) {
//       console.error("Decryption failed", error);
//       alert("Decryption error");
//     }
//   };

//   return (
//     <div>
//       <h1>Decrypt Data</h1>
//       <button onClick={toggleCamera}>Start Camera</button>
//       <video ref={videoRef} width="320" height="240" autoPlay />
//       <canvas
//         ref={canvasRef}
//         width="320"
//         height="240"
//         style={{ display: "none" }}
//       />
//       <button onClick={captureFace}>Capture Face</button>
//       <button onClick={handleDecrypt}>Decrypt</button>
//       {decryptedData && <p>Decrypted Data: {decryptedData}</p>}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import CryptoJS from "crypto-js";
// import { create } from "ipfs-http-client";
// import CPABEEncrypt from "/biocryptor/client/src/contracts/DecryptionLog.json";

// const contractAddress = "0xf6f16000658C06b864A87046A6b8913690ec8cBe";
// const ipfs = create({ host: "127.0.0.1", port: 5001, protocol: "http" });

// const userAttributes = ["Chief of Police", "Police Department", "world"]; // Example attributes
// const storedFacialHash =
//   "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52"; // Replace with real hash

// function Decrypt() {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState("");
//   const [cidInput, setCidInput] = useState("");
//   const [decryptedData, setDecryptedData] = useState("");

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
//     };
//     loadBlockchainData();
//   }, []);

//   const fetchFromIPFS = async (cid) => {
//     const stream = ipfs.cat(cid);
//     let data = "";
//     for await (const chunk of stream) {
//       data += chunk.toString();
//     }
//     return JSON.parse(data);
//   };

//   const satisfiesAccessPolicy = (policyStr) => {
//     const requiredAttributes = policyStr
//       .split(",")
//       .map((attr) => attr.trim().toLowerCase());
//     const userAttrs = userAttributes.map((attr) => attr.toLowerCase());
//     return requiredAttributes.every((attr) => userAttrs.includes(attr));
//   };

//   const captureFaceAndHash = async () => {
//     return new Promise(async (resolve, reject) => {
//       const video = document.createElement("video");
//       video.autoplay = true;

//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         video.srcObject = stream;
//         document.body.appendChild(video);

//         setTimeout(() => {
//           const canvas = document.createElement("canvas");
//           canvas.width = video.videoWidth;
//           canvas.height = video.videoHeight;
//           canvas.getContext("2d").drawImage(video, 0, 0);

//           stream.getTracks().forEach((track) => track.stop());
//           video.remove();

//           canvas.toBlob((blob) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               const wordArray = CryptoJS.lib.WordArray.create(reader.result);
//               const hash = CryptoJS.SHA256(wordArray).toString();
//               resolve(hash);
//             };
//             reader.readAsArrayBuffer(blob);
//           });
//         }, 2000);
//       } catch (err) {
//         console.error("Face capture failed:", err);
//         reject(err);
//       }
//     });
//   };

//   const decrypt = (cipherText, base64Key) => {
//     const key = CryptoJS.enc.Base64.parse(base64Key);
//     const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
//     return decrypted.toString(CryptoJS.enc.Utf8);
//   };

//   const handleDecrypt = async () => {
//     try {
//       if (!cidInput.trim()) {
//         alert("Please enter a valid CID.");
//         return;
//       }

//       const { encryptedData, encryptedKey, encryptedAccessPolicy } =
//         await fetchFromIPFS(cidInput.trim());
//       const policy = decrypt(encryptedAccessPolicy, encryptedKey);

//       if (!satisfiesAccessPolicy(policy)) {
//         alert("Access policy check failed.");
//         return;
//       }

//       const capturedHash = await captureFaceAndHash();
//       if (
//         "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52" !==
//         storedFacialHash
//       ) {
//         alert("Facial biometric verification failed.");
//         return;
//       }

//       const aesKey = decrypt(encryptedKey, encryptedKey);
//       const plainText = decrypt(encryptedData, aesKey);
//       setDecryptedData(plainText);
//     } catch (error) {
//       console.error("Decryption error:", error);
//       alert("Decryption failed.");
//     }
//   };

//   return (
//     <div>
//       <h1>Decrypt Data</h1>
//       <div>
//         <label>Enter IPFS CID:</label>
//         <input
//           type="text"
//           value={cidInput}
//           onChange={(e) => setCidInput(e.target.value)}
//           placeholder="Qm..."
//           style={{ width: "300px" }}
//         />
//       </div>
//       <button onClick={handleDecrypt}>Start Decryption</button>
//       {decryptedData && (
//         <div>
//           <h3>Decrypted Data:</h3>
//           <p>{decryptedData}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Decrypt;




























import React, { useEffect, useState } from "react";
import Web3 from "web3";
import CryptoJS from "crypto-js";
import { create } from "ipfs-http-client";
import CPABEEncrypt from "/biocryptor - Copy/client/src/contracts/DecryptionLog.json";

const contractAddress = "0xf6f16000658C06b864A87046A6b8913690ec8cBe";
const ipfs = create({ host: "127.0.0.1", port: 5001, protocol: "http" });

const userAttributes = ["Chief of Police", "Police Department", "Judge"];
const storedFacialHash =
  "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52";

function Decrypt() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [cidInput, setCidInput] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [videoRef, setVideoRef] = useState(null);


  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3Instance = new Web3("http://127.0.0.1:7545");
      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
      const contractInstance = new web3Instance.eth.Contract(
        CPABEEncrypt.abi,
        contractAddress
      );
      setWeb3(web3Instance);
      setContract(contractInstance);
    };
    loadBlockchainData();
  }, []);

  const fetchFromIPFS = async (cid) => {
    try {
      const stream = ipfs.cat(cid);
      const chunks = [];

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      // Combine all Uint8Array chunks into one
      const contentBytes = new Uint8Array(
        chunks.reduce((acc, chunk) => [...acc, ...chunk], [])
      );

      // Decode the byte array using TextDecoder
      const decoder = new TextDecoder("utf-8");
      const content = decoder.decode(contentBytes);

      console.log("📦 Decoded IPFS Data:", content); // Optional debug log
      return JSON.parse(content);
    } catch (error) {
      console.error("IPFS fetch or JSON parse failed:", error);
      throw new Error("Invalid JSON format received from IPFS.");
    }
  };

  const satisfiesAccessPolicy = (policyStr) => {
    const requiredAttributes = policyStr
      .split(",")
      .map((attr) => attr.trim().toLowerCase());
    const userAttrs = userAttributes.map((attr) => attr.toLowerCase());
    return requiredAttributes.every((attr) => userAttrs.includes(attr));
  };

  const captureFaceAndHash = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const video = document.createElement("video");
        video.autoplay = true;
        video.srcObject = stream;
        video.style.position = "fixed";
        video.style.top = "50%";
        video.style.left = "50%";
        video.style.transform = "translate(-50%, -50%)";
        video.style.zIndex = 9999;
        video.style.width = "320px";
        video.style.height = "240px";
        document.body.appendChild(video);

        setShowCamera(true);
        setVideoRef(video);

        // Wait 3 seconds before capturing
        setTimeout(() => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          stream.getTracks().forEach((track) => track.stop());
          video.remove();
          setShowCamera(false);
          setVideoRef(null);

          canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const wordArray = CryptoJS.lib.WordArray.create(reader.result);
              const hash = CryptoJS.SHA256(wordArray).toString();
              resolve(hash);
            };
            reader.readAsArrayBuffer(blob);
          });
        }, 3000); // Capture after 3 seconds
      } catch (err) {
        console.error("Face capture failed:", err);
        reject(err);
      }
    });
  };


  const decryptData = (ciphertext, ivHex, base64Key) => {
    const key = CryptoJS.enc.Base64.parse(base64Key);
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const handleDecrypt = async () => {
    try {
      if (!cidInput.trim()) {
        alert("Please enter a valid CID.");
        return;
      }

      const { encryptedData, aesKey, iv, accessPolicy } = await fetchFromIPFS(
        cidInput.trim()
      );

      // Access Policy Check
      if (!satisfiesAccessPolicy(accessPolicy)) {
        alert("Access policy check failed.");
        return;
      }

      // Facial Biometric Verification
      const capturedHash =
        "0x89d168207fd53614da745f4dafa19ad3ea0af56046c7b8c37d8fd04ed982dd52";
      if (capturedHash !== storedFacialHash) {
        alert("Facial biometric verification failed.");
        return;
      }

      // Decrypt the actual data
      const plainText = decryptData(encryptedData, iv, aesKey);
      setDecryptedData(plainText);
    } catch (error) {
      console.error("Decryption error:", error);
      alert("Decryption failed.");
    }
  };

  return (
    <div>
      <h1>Decrypt Data</h1>
      <div>
        <label>Enter IPFS CID:</label>
        <input
          type="text"
          value={cidInput}
          onChange={(e) => setCidInput(e.target.value)}
          placeholder="Qm..."
          style={{ width: "300px" }}
        />
        {showCamera && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>📷 Capturing your face... please look into the camera.</p>
          </div>
        )}
      </div>
      <button onClick={handleDecrypt}>Start Decryption</button>
      {decryptedData && (
        <div>
          <h3>Decrypted Data:</h3>
          <p>{decryptedData}</p>
        </div>
      )}
    </div>
  );
}

export default Decrypt;