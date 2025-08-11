import fs from "fs";
import { Anime } from "./anime.js";
// fs.readFile("./anime.js", "utf8",(err, data) => console.log(data));
const folderRe = /[\w ]+\(\d{4}\)/g;
const seasonRe = /Season \d{2}/g;
const seasonNumberRe = /s\d{2}/ig;
const videoRe = /([\w\d ']+)\(\d{4}\)\s-\ss\d{2}e\d{2}\s?-?\s([\w\d ']+)\.\w{3}/ig;
const episodeRe = /ep?(?=\s?\d{2})/i;
const episodeNumberRe = /(?<=ep?\s?)\d{2}/i;

let season, episode;
fs.readdir("./", (err, files)=>{
    files.forEach(file => {
        // if folder name not matched
        if(!folderRe.test(file)){
            // scan inside it to see the video
            fs.readdir(`./${file}`, (err, files) => {
                // if it is a folder 
                if(!err){
                    // if there is a season folder
                    let seasonFolder = getSeasonFolder(`./${file}`)
                    if(seasonFolder.length !== 0){
                        season = seasonFolder[0].match(/\d{2}/)[0];
                        console.log(season);
                    } 
                        // check if any file has ep and then number after it
                        console.log(files.filter(file => episodeNumberRe.test(file)));
                    

                    // files.forEach(file => {
                    //     // checks if any file has word "ep" in it, if it doesn't match the syntax of plex
                    //     if(epsiodeRe.test(file) && !videoRe.test(file)){
                    //         if(seasonNumberRe.test(file)){
                    //             season = file.match(seasonNumberRe)[0];
                    //         }
                    //         season = "01";
                    //         console.log("has episode", file);
                    //         episode = file.match(epsodeNumberRe)[0];
                    //         console.log(episode, "THIS IS THE EPISODE");
                    //     }
                    //     console.log(videoRe.test(file));
                    //     console.log(file.match(videoRe));
                    //     console.log(file);
                    // });
                }
                // console.error(`Error happened with ${file}, it seems its not  folder\n${err}`)
                // console.log(files, "child");
            })
            let anime = new Anime(file, );
        };
    })
    console.log(files, "parent");
})

function getSeasonFolder(path) {
    let files = fs.readdirSync(path);
    return files.filter(file => seasonRe.test(file));
}

function getSeasonNumber(path){
    let seasonFolder = getSeasonFolder(`./${file}`)
    if(seasonFolder.length !== 0){
        season = seasonFolder[0].match(/\d{2}/)[0];
        console.log(season);
    } 

}

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