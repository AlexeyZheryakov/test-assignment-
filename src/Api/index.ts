import axios from 'axios';

export interface IData {
    data: IImageURL;
}

interface IImageURL {
    image_url: string;
}

const getImage = (tag: string) =>
    axios.get<IData>(
        `${process.env.REACT_APP_API_URL}/v1/gifs/random?api_key=${process.env.REACT_APP_API_KEY}&tag=${tag}`
    );

const getImages = (tags: string[]) => {
    const requests = tags.map((tag) => getImage(tag));
    return Promise.all(requests);
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getImageByDeley = async (
    tags: string[],
    callback: (res: { ok: boolean; data: IData; err: string }) => void,
    loading: (loading: boolean) => void
) => {
    loading(true);
    for await (const tag of tags) {
        try {
            const { data } = await getImage(tag);
            callback({ ok: true, data, err: '' });
        } catch(error) {
            callback({ ok: false, data: {data: {image_url: ''}}, err: `${error}` })
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
