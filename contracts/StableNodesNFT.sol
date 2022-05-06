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
        console.log(msg.value);
        console.log(nodeCost);
        require(msg.value == nodeCost, "Invalid amount to purchase node");
        console.log("Starting node creation");
        // mint NFT
        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, newItemId);

        _mintNode(newItemId, _name);
    }

    function _mintNode(uint256 newItemId, string memory _name) private {
        // set image
        string memory imageURI = svgToImageURI();
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

    // You could also just upload the raw SVG and have solildity convert it!
    // tokenOfOwnerByIndex
    // _balances
    function svgToImageURI() private returns (string memory) {
        string memory svg = getSVG();
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
        return string(abi.encodePacked(baseURL, svgBase64Encoded));
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

    function getSVG() internal virtual returns (string memory) {
        string memory brown = getBrown();
        // string memory dark1 = getDark1();
        // string memory light1 = getLight1();
        // string memory light2 = getLight2();
        // string memory light3 = getLight3();
        return
            string(
                abi.encodePacked(
                    "<svg xmlns='http://www.w3.org/2000/svg'"
                    "xmlns:xlink='http://www.w3.org/1999/xlink' width='100%' height='100%'>"
                    "<defs>"
                    "    <pattern id='p' width='100' height='100' patternUnits='userSpaceOnUse' patternTransform='rotate(308) scale(0.73)'>"
                    "        <path id='a' data-color='fill' fill='none' stroke='#FFF' stroke-width='10.36' d='M50 100L0 50V0l50 50 50-50h0v50l-50 50z'></path>"
                    "        <use xlink:href='#a' y='-100'></use>"
                    "        <use xlink:href='#a' y='100'></use>"
                    "    </pattern>"
                    "</defs>"
                    "<rect fill='",
                    brown,
                    "' width='100%' height='100%'></rect>"
                    "<rect fill='url(#p)' width='100%' height='100%'></rect>"
                    "</svg>"
                )
            );
    }

    function getBrown() internal virtual returns (string memory) {
        string[25] memory col = [
            "#342518",
            "#342518",
            "#463120",
            "#573d28",
            "#694a30",
            "#7a5638",
            "#8c6240",
            "#936743",
            "#9d6f48",
            "#af7b50",
            "#b78862",
            "#bf9573",
            "#c7a285",
            "#ffccb3",
            "#ffbb99",
            "#ffaa80",
            "#ff9966",
            "#ff884d",
            "#ff7733",
            "#ff661a",
            "#ff5500",
            "#cc4400",
            "#b33c00",
            "#993300",
            "#802b00"
        ];
        return col[randMod()];
    }

    function getDark1() internal virtual returns (string memory) {
        string[25] memory col = [
            "#000000",
            "#0f0e0a",
            "#1f1b14",
            "#2e291f",
            "#322c21",
            "#3d3629",
            "#4d4433",
            "#5c513d",
            "#6b5f47",
            "#7a6c52",
            "#8a7a5c",
            "#998766",
            "#a39375",
            "#ad9f85",
            "#00001a",
            "#000033",
            "#00004d",
            "#000066",
            "#000080",
            "#000099",
            "#001a4d",
            "#002266",
            "#002b80",
            "#003399",
            "#003cb3"
        ];
        return col[randMod()];
    }

    function getLight1() internal virtual returns (string memory) {
        string[25] memory col = [
            "#0a0e10",
            "#141c1f",
            "#1e2a2f",
            "#28373e",
            "#32454e",
            "#3c535d",
            "#46616d",
            "#506f7c",
            "#5a7d8c",
            "#638b9c",
            "#7396a5",
            "#84a3b0",
            "#92aeb9",
            "#a2b9c3",
            "#006699",
            "#0077b3",
            "#0088cc",
            "#0099e6",
            "#2d5986",
            "#336699",
            "#3973ac",
            "#2952a3",
            "#2e5cb8",
            "#3366cc",
            "#4775d1"
        ];
        return col[randMod()];
    }

    function getLight2() internal virtual returns (string memory) {
        string[25] memory col = [
            "#f2e8d9",
            "#ecddc6",
            "#e6d1b3",
            "#dfc69f",
            "#d9ba8c",
            "#d2af79",
            "#cca364",
            "#c69853",
            "#bf8c40",
            "#ffbf80",
            "#ffb366",
            "#ffa64d",
            "#ff9933",
            "#ff8c1a",
            "#ff8000",
            "#e67300",
            "#ffcc66",
            "#ffc34d",
            "#ffbb33",
            "#ffb31a",
            "#b37700",
            "#996600",
            "#805500",
            "#b30000",
            "#990000"
        ];
        return col[randMod()];
    }

    function getLight3() internal virtual returns (string memory) {
        string[25] memory col = [
            "#f0f5f4",
            "#e1eae9",
            "#d1dfde",
            "#c3d5d4",
            "#b4cbc9",
            "#a5c0be",
            "#96b6b4",
            "#87aba9",
            "#78a19e",
            "#699693",
            "#99ff33",
            "#8cff1a",
            "#80ff00",
            "#66cc00",
            "#53c68c",
            "#40bf80",
            "#39ac73",
            "#339966",
            "#2d8659",
            "#26734d",
            "#206040",
            "#194d33",
            "#133926",
            "#33ff99",
            "#1aff8c"
        ];
        return col[randMod()];
    }

    // Defining a function to generate
    // a random number https://www.geeksforgeeks.org/random-number-generator-in-solidity-using-keccak256/
    function randMod() internal returns (uint256) {
        // increase nonce
        randNonce++;
        return
            (uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % 100) / 4;
    }
}
