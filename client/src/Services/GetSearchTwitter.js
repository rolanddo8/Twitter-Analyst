import axios from 'axios';

const URL = '/twitter'

export const getSearchTwitter = async (keyword) => {
    try {
        const data = await axios.get(`${URL}`, { params: { keyword: keyword } });
        return data;
    }
    catch (err) {
        console.error(err);
    }
} 