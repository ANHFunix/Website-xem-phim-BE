const fs = require('fs');
const path = require('path');
const dirRoot = require('../utils/path');

const DATA_PATH = path.join(dirRoot, 'data', 'userToken.json');

module.exports = class UserToken {
    static getAll = () => {
        return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    }

    static getUserToken = (tokenUser) => {
        const tokens = this.getAll();
        const token = tokens.filter(t => t.token === tokenUser);
        return token;
    };
}