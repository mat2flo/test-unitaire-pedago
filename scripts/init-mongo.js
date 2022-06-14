db.createUser({
  user: "admin",
  pwd: "pass",
  roles: [{ role: "readWrite", db: "pedago" }],
});
db.createCollection("users");

db.users.insert({
  _id: 1,
  name: "John Doe",
  amount: 0,
});
