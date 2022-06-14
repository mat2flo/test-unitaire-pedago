print('Start #################################################################');

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
        name: "User 1",
        amount: 5,
    }
)

print('End #################################################################');