import axios from 'axios';

export interface IData {
    data: IImageURL;
}

interface IImageURL {
    image_url: string;
}

const getImage = (tag: string) =>
    axios.get<IData>(
        `https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${tag}`
    );

const getImages = (tags: string[]) => {
    const requests = tags.map((tag) => getImage(tag));
    return Promise.all(requests);
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getImageByDeley = async (
    tags: string[],
    callback: (res: { ok: boolean; data: IData }) => void,
    loading: (loading: boolean) => void
) => {
    for await (const tag of tags) {
        try {
            const { data } = await getImage(tag);
            callback({ ok: true, data });
        } catch(error) {
            callback({ ok: false, data: {data: {image_url: ''}} })
        }

        await sleep(5000);
        
    };
    loading(false);
};

const Api = {
    getImage,
    getImages,
    getImageByDeley,
};
  
export default Api;
