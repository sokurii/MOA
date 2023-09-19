import baseAxios from 'axios';

export const axios = baseAxios.create({
    baseURL: "https://moamore.site:8589/",
  });