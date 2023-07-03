require('dotenv').config();

const PORT = process.env.NODE_PORT;
const HOST = process.env.NODE_HOST;
const PG_DB = process.env.PG_DB
const PG_USER = process.env.PG_USER
const PG_PASSWORD = process.env.PG_PASSWORD
const PG_HOST = process.env.PG_HOST
const PG_PORT = process.env.PG_PORT

const USER_STATUS_ACTIVE = 1;
const USER_STATUS_DELETED = 99;

const REPORT_STATUS_PENDING = 1;
const REPORT_STATUS_ACCEPTED = 2;
const REPORT_STATUS_DELETED = 99;

const ADMIN_USER = 1;
const REGULAR_USER = 2;

const isAdminUser = req => req.cookies.userData && req.cookies.userData.role && req.cookies.userData.role == ADMIN_USER;

module.exports = {
    HOST,
    PORT,
    PG_DB,
    PG_USER,
    PG_PASSWORD,
    PG_HOST,
    PG_PORT,
    USER_STATUS_ACTIVE,
    USER_STATUS_DELETED,
    REPORT_STATUS_PENDING,
    REPORT_STATUS_ACCEPTED,
    REPORT_STATUS_DELETED,
    ADMIN_USER,
    REGULAR_USER,
    isAdminUser,
}
