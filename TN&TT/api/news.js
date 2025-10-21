import axios from "axios";

export const getTrendingNews = async () => {
  console.log(process.env.NYT_API);

  // NYT
  const world = axios.get(
    `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.NYT_API}`
  );

  // The Guardian
  const trending = axios.get(
    `https://content.guardianapis.com/search?q=india&order-by=relevance&api-key=${process.env.TG_API}`
  );

  return await Promise.all([world, trending]);
};
