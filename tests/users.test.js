const userModel = require("../models/User");
const db = require("./db-handler");
const { creditService, debitService } = require("../services/account.js");

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

const mockUser = {
  _id: 10,
  name: "John Doe",
  amount: 0,
};

describe("User model", () => {
  it("create & save user successfully", async () => {
    await userModel.create(mockUser);
    const insertedUser = await userModel.findOne({ _id: 10 });
    expect(insertedUser._doc).toEqual(mockUser);
  });

  it("can credit user", async () => {
    const user = await userModel.create(mockUser);
    const creditAmount = 100;
    console.log(user);
    const creditedUser = await creditService(user._id, creditAmount);
    expect(creditedUser.amount).toBe(100);
  });

  it("can debit user", async () => {
    const mockUserWithAmount = { ...mockUser, amount: 100 };
    const user = await userModel.create(mockUserWithAmount);
    const debitAmount = 100;
    const debitedUser = await debitService(user._id, debitAmount);
    expect(debitedUser.amount).toBe(0);
  });
});
