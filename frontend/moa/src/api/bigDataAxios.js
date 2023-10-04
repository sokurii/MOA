import baseAxios from 'axios';

export const bigDataAxios = baseAxios.create({
    baseURL: "http://j9e204a.p.ssafy.io:8000/",
});