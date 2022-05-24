// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/// @custom:security-contact shaunenslin@icloud.com
contract StableNodesNFT is
    Initializable,
    ERC721Upgradeable,
    ERC721EnumerableUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;
    event NodeMinted(Node node);
    event ContractApproved(uint256 timestamp);
    event ClaimApproved(Node node);
    event ClaimAllComplete();

    uint256 public totalNodes;
    uint256 public yield;
    uint256 public claimTax;
    uint256 public claimRotTax;
    uint256 public nodeFee;
    uint256 public teamSplit;
    uint256 public treasurySplit;
    uint256 public dividendSplit;
    uint256 public rewardSplit;
    uint256 public nodeCost;

    uint256 randNonce;
    address payable private _contractOwner;

    mapping(address => uint256) private _contractApproved;

    struct Node {
        string name;
        uint256 createDate;
        uint256 lastRewardDate;
    }
    mapping(uint256 => Node) private nodes;

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() public initializer {
        console.log("Initialize...");
        __ERC721_init("StableNodeNFT", "SNNFT");
        __ERC721Enumerable_init();
        __Ownable_init();

        yield = 200;
        claimTax = 15;
        claimRotTax = 10;
        teamSplit = 5;
        treasurySplit = 30;
        dividendSplit = 2;
        rewardSplit = 63;
        nodeCost = 500000000000000000;
        randNonce = 0;
        _contractOwner = payable(msg.sender);
        console.log("Deploying with:", msg.sender);
        console.log("Nodecost", nodeCost);
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function approveContract() public virtual returns (bool) {
        _approveContract();
        return true;
    }

    function getCost() public view returns (uint256) {
        console.log("Nodecost>", nodeCost);
        return nodeCost;
    }

    function isContractApproved() public view returns (bool) {
        return _isContractApproved();
    }

    function _approveContract() internal virtual {
        _contractApproved[msg.sender] = block.timestamp;
        emit ContractApproved(block.timestamp);
        console.log(msg.sender.balance / 1000000000000000000); //msg.sender.balance);
        console.log(_contractApproved[msg.sender]);
    }

    function _isContractApproved() internal view returns (bool) {
        if (_contractApproved[msg.sender] > 0) {
            return true;
        } else {
            return false;
        }
    }

    /*
     * Approve and pay for a node
     */
    function mintNode(string memory _name) public payable virtual {
        console.log("Nodecost>", nodeCost);
        console.log(msg.value);
        require(msg.value == nodeCost, "Invalid amount to purchase node");
        // mint NFT
        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        console.log("Starting node creation", newItemId, _name, msg.sender);
        _safeMint(msg.sender, newItemId);

        _mintNode(newItemId, _name);
    }

    function _mintNode(uint256 newItemId, string memory _name) private {
        // set image
        string memory imageURI = string(
            abi.encodePacked(
                "ipfs://bafybeifgr3dvr4ivhm4tm2nvo3lc5bbo3in3jybphu6irtztpd736hwzvq/stableNodesNFT",
                newItemId,
                ".svg"
            )
        );
        _setTokenURI(newItemId, formatTokenURI(imageURI));

        // add to nodes
        Node memory newNode = Node(_name, block.timestamp, block.timestamp);
        nodes[newItemId] = newNode;

        // Split TODO

        // emit
        emit NodeMinted(newNode);
        console.log("Node minted and emitted");
    }

    function nodeForToken(uint256 idx) public view returns (Node memory _node) {
        return nodes[idx];
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function formatTokenURI(string memory imageURI)
        public
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                "SVG NFT", // You can add whatever name here
                                '", "description":"An NFT based on SVG!", "attributes":"", "image":"',
                                imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    // function claimAll() public virtual returns (bool) {
    //     console.log("Starting node all claim");
    //     for (uint256 i = 0; i < nodeNames[msg.sender].length; i++) {
    //         _claim(nodeNames[msg.sender][i]);
    //     }

    //     // emit
    //     emit ClaimAllComplete();
    //     console.log("Node claimed and emitted");
    //     return true;
    // }

    /*
     * Approve and pay for a node
     * https://stackoverflow.com/questions/68593044/does-solidity-function-with-payable-modifier-allow-to-perform-msg-sender-call
     */
    function claimNode(uint256 idx) public virtual returns (bool) {
        //
        uint256 token = tokenOfOwnerByIndex(msg.sender, idx);
        Node memory node = nodeForToken(token);
        require(node.createDate > 0, "Node doesnt exist!");

        console.log("Starting node claim");
        _claim(node, idx);
        // emit
        emit ClaimApproved(node);
        console.log("Node claimed and emitted");
        return true;
    }

    function _claim(Node memory node, uint256 idx) private returns (bool) {
        // get number of seconds since last claim
        uint256 diffSeconds = block.timestamp - node.lastRewardDate;
        uint256 reward = ((nodeCost * (1 + (yield / 100))) / 31536000) *
            diffSeconds;
        console.log(
            "Reward claimed for ",
            nodeCost,
            " rate ",
            (1 + (yield / 100)) / 31536000
        );
        console.log("Reward claimed:", reward, " for ", diffSeconds);

        // take off tax
        uint256 roidays = 365 / (1 + (yield / 100));
        uint256 diffdays = 0;
        if (diffSeconds > 86400) {
            diffdays = diffSeconds / 86400;
        }
        uint256 tax = 0;
        if (diffdays > roidays) {
            tax = (reward / 100) * claimRotTax; // * (claimRotTax / 100); //10%
            console.log("tax rot:", tax, " roidays:", roidays);
        } else {
            tax = (reward / 100) * claimTax; // * (claimTax / 100); //15%
            console.log("tax:", tax, " roidays:", roidays);
        }
        reward = reward - tax;
        console.log("Reward after tax:", reward);

        // This forwards all available gas. Be sure to check the return value!
        address payable receiver = payable(msg.sender);
        receiver.transfer(reward);

        // reset lastRewardDate
        nodes[idx].lastRewardDate = block.timestamp;
        return true;
    }
}
