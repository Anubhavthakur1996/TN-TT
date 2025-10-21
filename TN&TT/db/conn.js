import knexFactory from "knex";

const knex = knexFactory({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "GameFreak",
    password: "Ab@2682428842",
    database: "tn_tt",
  },
});

export default knex;
