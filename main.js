// let api = "https://api.jikan.moe/v4";
// let id;
// let name;
// let year;
// let season;
// let episode;
// let title;
// let object;
// let data;
// async function getData(){
//     await fetch(`${api}/anime/1/full`)
//         .then(response => response.json())
//         .then(result => {
//             object = result.data;
//             id = object["mal_id"];
//             name = object.title;
//             year = object.year;
//         });
    
//     console.log(object)

//     await fetch(`${api}/anime/${id}/episodes`)
//         .then(response => response.json())
//         .then(result => {
//             data = result.data;
//             episode = data[0].mal_id;
//             title = data[0].title;
//             console.log(data[0]);
//         });
//     console.log(episode, title);

//     await fetch(`${api}/anime?q=kimetso`)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result);
//             data = result.data;
//             episode = data[0].mal_id;
//             title = data[0].title;
//             console.log(data[0]);
//         });
    
// };

// getData();

// // function Organizor(){
// //     constructor(name, year, season, episode, title){
// //         this.name = name;
// //         this.year = year;
// //         this.season = season;
// //         this.episode = episode;
// //         this.title = title;
// //     }
// // } 