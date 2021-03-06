const mssql = require('mssql');

const configMsSql = {
    provider: mssql,
    user: 'user',
    password: 'password',    
    server: 'server',
    database: 'database',
    port: 1433,    
    pool: {
        max: 10,
        min: 2,
        idleTimeoutMillis: 30000
    }
}

const configAzure = {
    provider: mssql,
    user: 'user',
    password: 'password',
    server: 'server',
    database: 'database',
    port: 1433,
    options: {        
        encrypt: true
    }
}

module.exports = configAzure;