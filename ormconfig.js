module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  synchronize: false,
  logging: false,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  entities: [
    'src/database/entity/**/*.js'
  ],
  migrations: [
    'src/database/migration/**/*.js'
  ],
  subscribers: [
    'src/database/subscriber/**/*.js'
  ],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber'
  }
}
