db.createUser(
    {
        user: 'user',
        pwd: 'pass',
        roles: [{ role: 'readWrite', db: 'pedago' }],
    },
);
db.createCollection('users');

db.users.insert(
    {
        id: 1,
        name: "John Doe",
        amount: 0,
    }
);