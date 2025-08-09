class Anime{
    #api = "https://api.jikan.moe/v4";

    id;
    name;
    year;
    season;
    episode;
    title;

    constructor(name, season, episode){
       this.name = name;
       this.season = season;
       this.episode = episode;
    };

    async init(){
        await this.#getId();
        await this.#getTitle();
        return this;
    };

    async #getId(){
        try {
            let response = await fetch(`${this.#api}/anime?q=${this.name}`);
            let data = await response.json();
            this.id = data.data[0].mal_id;
            this.year = data.data[0].year;
            console.log(data);
        } catch (error) {
            console.error(`something went wrong\n${error}`);
        }
    }

    async #getTitle(){
        try {
            let response = await fetch(`${this.#api}/anime/${this.id}/episodes/${this.episode}`);
            let data = await response.json();
            this.title = data.data.title;
            console.log(data);

        } catch (error) {
            console.error(`get title something went wrong\n${error}`);
        }
    }
    
}

(async () => {
    let anime = await new Anime("kimitsu no yaiba", 1, 5).init();
    console.log(anime);
})();