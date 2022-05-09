import * as fs from 'fs';
import { NFTStorage, File } from 'nft.storage'
import * as mime from 'mime'
import * as path from 'path'
import { getFilesFromPath } from 'web3.storage'
// import { getFilesFromPath } from 'files-from-path'

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyQjZFNTNDM0Y3N2E5OUI5NDgzODJGN2FkNjA5Y2QzMzkxZGEyQzgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MTkwODExMDQ1NiwibmFtZSI6InN0YWJsZW5vZGVzdGVzdCJ9.fBg2Zzgd7vJ04TnyzfIkyU4H9rlzriAckIITlSEQBG0'
                         

const createNFT = async () => {
    try {
        const data:Buffer = await fs.promises.readFile('./snodes.svg');
        // create the NFT images
        for (let i = 0; i < 5; i++) {
            let content:string = data.toString();
            content = getBrown(content);
            content = getDark1(content);
            content = getLight1(content);
            content = getLight2(content);
            content = getLight3(content);
            const name:string = 'stablenodes/stableNodesNFT'+ i +'.svg';
            const description:string = 'NFT for stables nodes NFT#'+ i+1;
            await fs.promises.writeFile(name, content);

            // const result = await storeNFT('./'+name, name, description)
            // console.log(result)
        }
        storeNFTFolder('stablenodes');
        

    } catch (error) {
        console.log(error)
    }   
    
}

function getBrown(content:string):string {
    let col:string[] = [
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

function getDark1(content:string):string{
    let col: string[] = [
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

function getLight1(content:string):string{
    let col: string[] = [
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

function getLight2(content:string):string{
    let col: string[] = [
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

function getLight3(content:string):string{
    let col: string[] = [
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


function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
 const storeNFT = async(imagePath:string, name:string, description:string) => {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    console.log("New NFTStorage");
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    console.log("nftstorage.store");
    
    return nftstorage.store({
        image,
        name,
        description,
    })
}

const storeNFTFolder = async(folder:string) => {
    // get file names 
    let filesS:string[] = [];
    fs.readdirSync(folder).forEach(name => {
        filesS.push(name);
      });

    // build files array
    process.chdir(`./${folder}`);
    console.log("Building files array")
    let files:File[] = [];
    for (let i = 0; i < filesS.length; i++) {
        const name = filesS[i];
        console.log(name); 
        const f = await fileFromPath(name)
        files.push(f);       
    }

    // // Upload folder
    const storage = new NFTStorage({ token: NFT_STORAGE_KEY })    
    console.log(`storing ${files.length} file(s) from ${folder}`)
    const cid = await storage.storeDirectory(files)
    console.log({ cid })

    const status = await storage.status(cid)
    console.log(status)
    process.chdir('..');
    
}

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
 const fileFromPath = async (filePath:string) => {
    const content:Buffer = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)

    return new File([content], path.basename(filePath), { type })
}

createNFT()
