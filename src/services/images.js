const google = require('googleapis').google;
const customSearch = google.customsearch('v1');
const googleSearchCredentials = require('../credentials/google');

async function images(img_search){
    const query = img_search.trim;
    return fetchGoogleAndReturnImagesLinks(query);  
    async function fetchGoogleAndReturnImagesLinks(query){    
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.googleSearch_apikey,
            cx: googleSearchCredentials.searchEngine_id,
            q: query,
            searchType: 'image',
            imgSize: 'small',
            fileType: 'jpg',
            num: 1
        });
        
       /* const imagesUrl = response.data.items.map((item)=>{
           return item.link;
       }); */
       console.log('artist link image =>', response.data.items)
       return response.data.items;
    }
}
export default images;