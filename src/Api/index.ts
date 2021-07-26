import axios from 'axios';

interface IData {
    data: IImageURL;
}

interface IImageURL {
    image_url: string;
}

const Api = {
    getData: (tag: string) => axios.get<IData>(`https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${tag}`),
};
  
export default Api;
