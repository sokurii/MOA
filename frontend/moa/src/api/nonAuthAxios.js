import baseAxios from 'axios';

export const nonAuthAxios = baseAxios.create({
    baseURL: "https://moamore.site:8589/",
});