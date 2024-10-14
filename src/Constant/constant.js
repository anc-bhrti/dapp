const contractAddress = "0x5b407fa6cc1b2939ad3a45733cbea1c0d46b8a7b";

const contractAbi = [
        "function list(uint256 _id, string memory _name, string memory _category, string memory _image, uint256 _cost, uint256 _rating, uint256 _stock) public",
        "function buy(uint256 _id) external payable",
        "function withdraw() public",
        "function items(uint256) public view returns (uint256 id, string memory name, string memory category, string memory image, uint256 cost, uint256 rating, uint256 stock)",
        "function orders(address, uint256) public view returns (uint256 time, uint256 id, string memory name, string memory category, string memory image, uint256 cost, uint256 rating, uint256 stock)",
        "function orderCount(address) public view returns (uint256)",
        "event Buy(address indexed buyer, uint256 orderId, uint256 itemId)",
        "event List(string name, uint256 cost, uint256 quantity)"
];

export {contractAddress, contractAbi};