import fs, { Dir } from "fs";
import { Anime } from "./anime.js";
// fs.readFile("./anime.js", "utf8",(err, data) => console.log(data));
const folderRe = /[\w ]+\(\d{4}\)/g;
const seasonRe = /Season \d{2}/g;
const seasonNumberRe = /s\d{2}/ig;
const videoRe = /([\w\d ']+)\(\d{4}\)\s-\ss\d{2}e\d{2}\s?-?\s([\w\d ']+)\.\w{3}/ig;
const episodeRe = /ep?(?=\s?\d{2})/i;
const episodeNumberRe = /(?<=ep?\s?)\d{2}/i;
const fileRe = /\.(?=\w{1,4})/i;

let season, episode;
let fsP = fs.promises;

let object = {
    name: "Dekin no Mogura",
    season: "" || "01",
    episodes: ["[Witanime.com] DNM EP 01 FHD.mp4"],

}
// fs.readdir("./", (err, files)=>{
//     files.forEach(file => {
//         // if folder name not matched
//         if(!folderRe.test(file)){
//             // scan inside it to see the video
//             fs.readdir(`./${file}`, (err, files) => {
//                 // if it is a folder 
//                 if(!err){
//                     // if there is a season folder
//                     // check if any file has ep and then number after it
                    
//                     getSeasonNumber(`./${file}`);
//                     getEpisodeNumber(`./${file}`);
//                     console.log(files.filter(file => episodeNumberRe.test(file)));

//                     // files.forEach(file => {
//                     //     // checks if any file has word "ep" in it, if it doesn't match the syntax of plex
//                     //     if(epsiodeRe.test(file) && !videoRe.test(file)){
//                     //         if(seasonNumberRe.test(file)){
//                     //             season = file.match(seasonNumberRe)[0];
//                     //         }
//                     //         season = "01";
//                     //         console.log("has episode", file);
//                     //         episode = file.match(epsodeNumberRe)[0];
//                     //         console.log(episode, "THIS IS THE EPISODE");
//                     //     }
//                     //     console.log(videoRe.test(file));
//                     //     console.log(file.match(videoRe));
//                     //     console.log(file);
//                     // });
//                 }
//                 // console.error(`Error happened with ${file}, it seems its not  folder\n${err}`)
//                 // console.log(files, "child");
//             })
//             let anime = new Anime(file, );
//         };
//     })
//     console.log(files, "parent");
// })

function getSeasonFolder(path) {
    let files = fs.readdirSync(path);
    return files.filter(file => seasonRe.test(file));
}

function getSeasonNumber(path){
    let seasonFolder = getSeasonFolder(path)
    if(seasonFolder.length !== 0){
        season = seasonFolder[0].match(/\d{2}/)[0];
        console.log(season);
    } 
    season = "01";
}

// still not completed
function getEpisodeNumber(path){
    console.log(path);
}

// async function getDirWithEp(){
//     let grandDir = await fsP.readdir("./"); // read all directory
//     let filesList = []
//     await grandDir.map(async file => {
//         if(fileRe.test(file)){ // check if it is a file or no
//             return;
//         }
//         console.log(file, "false, this is a folder! scanning ...."); // if it is a folder scan it
//         filesList.push([`${file}`, await fsP.readdir(`./${file}`)]); 
//         // console.log(filesList);
//         return filesList;
//     });
//     console.log(filesList)
// }
async function getDirectory() {
    let currentDirectory = await fsP.readdir("./");
    let directory = [];

    async function getFolderContents(){
        for (let folder of currentDirectory) {
            if (fileRe.test(folder)) continue; // if it is a file not folder skip it
            // console.log(file, "false, this is a folder! scanning ....");
            let folderContents = await fsP.readdir(`./${folder}`); // get what inside folders
            // for(let file of folderContents){
            //     if(fileRe.test(file)) continue;
            //     seasonContents = await fsP.readdir(`./${folder}/${file}`);
            // }
            directory.push([folder, folderContents]); // push folder name and it's array of contents
        }
        return directory;
    }
   
    async function getSeasonContents(directory){
        Promise.all(await getFolderContents());
        for(let folder of directory){
            for (let file of folder[1]){
                if (fileRe.test(file)) continue;
                let seasonContents = await fsP.readdir(`./${folder[0]}/${file}`);
                folder[1].push(seasonContents);
            }
        }
        return directory
    }
   return getSeasonContents(directory);
}
console.log(await getDirectory());

// function checkSeasonFolder(path){
//     fs.readdirSync(path, (err, files) => {
//         console.log(files);
//         files.forEach(file => {
//             console.log(file)
//             if(seasonRe.test(file)){
//                 return true;
//             }
//         })
//         return false;
//     });
// }