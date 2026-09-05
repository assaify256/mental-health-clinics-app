import session from 'express-session';
import connectSequelize from "connect-session-sequelize";
import sequelize from './db-config.ts';

const SequelizeStore = connectSequelize(session.Store);
export const store = new SequelizeStore({ db: sequelize });


const sessionConfig = session({
  store: store,
  secret: process.env.SESSION_SECRET || 'development-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
});

export default sessionConfig;