import { addToHot, getHot } from "../db/base.js";

export const insertHotNews = async (newsItem) => {
  // const items = newsItems.map((item) => ({ url: item.url }));
  return await addToHot(newsItem);
};

export const getHotNews = async () => {
  return await getHot();
};
