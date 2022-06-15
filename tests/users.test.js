const userModel = require("../models/User");
const db = require("./db-handler");
const { creditService, debitService } = require("../services/account.js");
const { isCreditAuthorized, isDebitAuthorized, isTimestampBetweenRangeHoursMailToSend } = require("../controllers/bank");
const { isPayloadCorrect } = require("../controllers/users");

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

describe("Bank isTimestampBetweenRangeHoursMailToSend", () => {
  it("don't send mail before 10pm", async () => {
    const date = new Date();
    date.setHours(21, 59, 59);
    expect(isTimestampBetweenRangeHoursMailToSend(date)).toBeFalsy();
  });

  it("send mail at 10pm", async () => {
    const date = new Date();
    date.setHours(22, 0, 0);
    expect(isTimestampBetweenRangeHoursMailToSend(date)).toBeTruthy();
  });

  it("don't send mail at 6am", async () => {
    const date = new Date();
    date.setHours(6, 0, 0);
    expect(isTimestampBetweenRangeHoursMailToSend(date)).toBeFalsy();
  });

  it("send mail at 12am", async () => {
    const date = new Date();
    date.setHours(0, 0, 0);
    expect(isTimestampBetweenRangeHoursMailToSend(date)).toBeTruthy();
  });
});

describe("Bank isPayloadCorrect", () => {
  it("payload is correct", async () => {
    const payload = {
      amount: 10
    };
    expect(isPayloadCorrect(payload)).toBeTruthy();
  });

  it("payload incorrect", async () => {
    const payload = {
      amount: "10"
    };
    expect(isPayloadCorrect(payload)).toBeFalsy();
  });
})

describe("Bank debit", () => {
  it("don't authorized final BankAccount under 0", async () => {
    const initialAmountBank = 1000
    const amountToDebit = 1000.0000001
    expect(isDebitAuthorized(initialAmountBank, amountToDebit)).toBeFalsy();
  });
  it("authorize final BankAccount at 0", async () => {
    const initialAmountBank = 1000
    const amountToDebit = 1000
    expect(isDebitAuthorized(initialAmountBank, amountToDebit)).toBeTruthy();
  });
  it("authorize final BankAccount superior to 0", async () => {
    const initialAmountBank = 1000
    const amountToDebit = 500
    expect(isDebitAuthorized(initialAmountBank, amountToDebit)).toBeTruthy();
  });
});

describe("Bank credit", () => {
  it("don't authorized final BankAccount above 1000", async () => {
    const initialAmountBank = 900
    const amountToDebit = 100.0000001
    expect(isCreditAuthorized(initialAmountBank, amountToDebit)).toBeFalsy();
  });
  it("authorize final BankAccount at 1000", async () => {
    const initialAmountBank = 900
    const amountToDebit = 100
    expect(isCreditAuthorized(initialAmountBank, amountToDebit)).toBeTruthy();
  });
  it("authorize final BankAccount under 1000", async () => {
    const initialAmountBank = 500
    const amountToDebit = 100
    expect(isCreditAuthorized(initialAmountBank, amountToDebit)).toBeTruthy();
  });
})



describe("User model", () => {
  it("create & save user successfully", async () => {
    await userModel.create(mockUser);
    const insertedUser = await userModel.findOne({ _id: 10 });
    expect(insertedUser._doc).toEqual(mockUser);
  });

  it("can credit user", async () => {
    const user = await userModel.create(mockUser);
    const creditAmount = 100;
    const creditedUser = await creditService(user, creditAmount);
    expect(creditedUser.amount).toBe(100);
  });

  it("can debit user", async () => {
    const mockUserWithAmount = { ...mockUser, amount: 100 };
    const user = await userModel.create(mockUserWithAmount);
    const debitAmount = 100;
    const debitedUser = await debitService(user, debitAmount);
    expect(debitedUser.amount).toBe(0);
  });
});