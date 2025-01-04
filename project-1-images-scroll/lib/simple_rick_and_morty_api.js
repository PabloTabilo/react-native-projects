export async function getRickAndMortyCharacters(){
    const ENDPOINT_RICKANDMORTY_CHARACTERS = "https://rickandmortyapi.com/api/character/?page=2"
    const rawData = await fetch(ENDPOINT_RICKANDMORTY_CHARACTERS);
    const json = await rawData.json();
    const items = json["results"];

    return items.map((item)=>{
        const {id, name, gender, image} = item;
        return {
            id,
            name,
            gender,
            image,
        };

    });

}

export async function getGameDetails(slug){
    const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;


    const rawData = await fetch(GAME_DETAILS);
    const json = await rawData.json();

    const {components} = json;
    const {title, description, criticScoreSummary, images} = components[0];

    const {score} = criticScoreSummary;

    const cardImage = images.find((image)=> image.typeName === "cardImage" );

    const {bucketType, bucketPath} = cardImage;

    const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

    const rawReviews = components[3].data.items;

    const reviews = rawReviews.map((review)=>{
        const {quote, score, date, publicationName, author } = review;
        return {quote, score, date, publicationName, author };
    });

    return {
        img, 
        title,
        slug,
        description,
        score,
        reviews,
    };
}