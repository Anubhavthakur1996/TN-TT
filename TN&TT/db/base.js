import knex from "./conn.js";

const isTable = async (tableName) => {
  const exists = await knex.schema.hasTable(tableName);
  return exists;
};

const createHotTable = async () => {
  return knex.schema.createTable("hot", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.string("abstract");
    table.string("url");
    table.string("img");
    table.integer("clicks");
  });
};

export const addToHot = async (item) => {
  let exist = await isTable("hot");

  if (!exist) {
    await createHotTable();
  }

  let record = await knex("hot").where("url", item.url).first();

  if (!record) {
    const newRecord = {
      title: item?.title,
      abstract: item?.abstract,
      url: item?.url,
      img: item?.multimedia?.[0]?.url || "",
      clicks: 1,
    };
    return knex("hot").insert(newRecord);
  }

  return knex("hot").where("url", item.url).increment("clicks", 1);
};

export const getHot = async () => {
  const hotNews = await knex("hot").select("*").orderBy('clicks', 'desc');
  return hotNews;
};
