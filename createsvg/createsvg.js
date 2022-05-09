"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var nft_storage_1 = require("nft.storage");
var mime = require("mime");
var path = require("path");
// import { getFilesFromPath } from 'files-from-path'
// Paste your NFT.Storage API key into the quotes:
var NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyQjZFNTNDM0Y3N2E5OUI5NDgzODJGN2FkNjA5Y2QzMzkxZGEyQzgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MTkwODExMDQ1NiwibmFtZSI6InN0YWJsZW5vZGVzdGVzdCJ9.fBg2Zzgd7vJ04TnyzfIkyU4H9rlzriAckIITlSEQBG0';
var createNFT = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, i, content, name_1, description, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, fs.promises.readFile('./snodes.svg')];
            case 1:
                data = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < 5)) return [3 /*break*/, 5];
                content = data.toString();
                content = getBrown(content);
                content = getDark1(content);
                content = getLight1(content);
                content = getLight2(content);
                content = getLight3(content);
                name_1 = 'stablenodes/stableNodesNFT' + i + '.svg';
                description = 'NFT for stables nodes NFT#' + i + 1;
                return [4 /*yield*/, fs.promises.writeFile(name_1, content)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                storeNFTFolder('stablenodes');
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
function getBrown(content) {
    var col = [
        "#936743",
        "#342517",
        "#463120",
        "#573d28",
        "#694a30",
        "#7a5638",
        "#8c6240",
        "#342518",
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
    return content.replace(/#936743/g, col[getRandomInt(24)]);
}
function getDark1(content) {
    var col = [
        "#322c21",
        "#0f0e0a",
        "#1f1b14",
        "#2e291f",
        "#000000",
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
    return content.replace(/#322c21/g, col[getRandomInt(24)]);
}
function getLight1(content) {
    var col = [
        "#84a3b0",
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
        "#0a0e10",
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
    return content.replace(/#84a3b0/g, col[getRandomInt(24)]);
}
function getLight2(content) {
    var col = [
        "#cca364",
        "#ecddc6",
        "#e6d1b3",
        "#dfc69f",
        "#d9ba8c",
        "#d2af79",
        "#f2e8d9",
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
    return content.replace(/#cca364/g, col[getRandomInt(24)]);
}
function getLight3(content) {
    var col = [
        "#d1dfde",
        "#e1eae9",
        "#f0f5f4",
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
    return content.replace(/#d1dfde/g, col[getRandomInt(24)]);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
var storeNFT = function (imagePath, name, description) { return __awaiter(void 0, void 0, void 0, function () {
    var image, nftstorage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fileFromPath(imagePath)
                // create a new NFTStorage client using our API key
            ];
            case 1:
                image = _a.sent();
                // create a new NFTStorage client using our API key
                console.log("New NFTStorage");
                nftstorage = new nft_storage_1.NFTStorage({ token: NFT_STORAGE_KEY });
                // call client.store, passing in the image & metadata
                console.log("nftstorage.store");
                return [2 /*return*/, nftstorage.store({
                        image: image,
                        name: name,
                        description: description
                    })];
        }
    });
}); };
var storeNFTFolder = function (folder) { return __awaiter(void 0, void 0, void 0, function () {
    var filesS, files, i, name_2, f, storage, cid, status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filesS = [];
                fs.readdirSync(folder).forEach(function (name) {
                    filesS.push(name);
                });
                // build files array
                process.chdir("./".concat(folder));
                console.log("Building files array");
                files = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < filesS.length)) return [3 /*break*/, 4];
                name_2 = filesS[i];
                console.log(name_2);
                return [4 /*yield*/, fileFromPath(name_2)];
            case 2:
                f = _a.sent();
                files.push(f);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                storage = new nft_storage_1.NFTStorage({ token: NFT_STORAGE_KEY });
                console.log("storing ".concat(files.length, " file(s) from ").concat(folder));
                return [4 /*yield*/, storage.storeDirectory(files)];
            case 5:
                cid = _a.sent();
                console.log({ cid: cid });
                return [4 /*yield*/, storage.status(cid)];
            case 6:
                status = _a.sent();
                console.log(status);
                process.chdir('..');
                return [2 /*return*/];
        }
    });
}); };
/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files.
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
var fileFromPath = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var content, type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.promises.readFile(filePath)];
            case 1:
                content = _a.sent();
                type = mime.getType(filePath);
                return [2 /*return*/, new nft_storage_1.File([content], path.basename(filePath), { type: type })];
        }
    });
}); };
createNFT();
