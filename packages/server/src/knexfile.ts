export default {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './db.test'
        },
        useNullAsDefault: true,
    },
    test: {
        client: 'sqlite3',
        connection: {
            filename: './db.test',
        },
        useNullAsDefault: true,
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};