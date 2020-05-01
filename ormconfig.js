const isDev = process.env.NODE_ENV !== 'production'
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
    `${isDev ? 'src' : 'dist'}/database/entity/**/*.js`
  ],
  migrations: [
    `${isDev ? 'src' : 'dist'}/database/migration/**/*.js`
  ],
  subscribers: [
    `${isDev ? 'src' : 'dist'}/database/subscriber/**/*.js`
  ],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber'
  }
}
