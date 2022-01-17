const { getConvertion, getRate } = require('../utils');

describe("Unit tests for fetching convertion", () => {
  it("should return AUD to AUD", () => {
    coinInput = getConvertion('AUD', 'AUD', 10);
    expect(coinInput).toBe("10.00");
  });

  it("should return AUD to USD", () => {
    coinInput = getConvertion('AUD', 'USD', 100);
    expect(coinInput).toBe("83.71");
  });

  it("should return USD to JPY", () => {
    coinInput = getConvertion('USD', 'JPY', 1);
    expect(coinInput).toBe("120");
  });

  it("should return AUD to DKK", () => {
    coinInput = getConvertion('AUD', 'DKK', 100);
    expect(coinInput).toBe("505.76");
  });

  it("should return CZK to DKK", () => {
    coinInput = getConvertion('CZK', 'DKK', 100);
    expect(coinInput).toBe("26.96");
  });

  it("should return unable to find rates", () => {
    coinInput = getConvertion('USA', 'JPY', 1);
    expect(coinInput).toBe("Unable to find rates.");
  });

});


describe("Unit tests for fetching rate from matrix", () => {
  it("should return AUD to USD - D", () => {
    coinInput = getRate('AUD', 'USD', 'D');
    expect(coinInput).toBe(0.8371);
  });

  it("should return USD to CAD - INV", () => {
    coinInput = getRate('USD', 'CAD', 'INV');
    expect(coinInput).toBe(1.1479738261967627);
  });

  it("should return AUD to JPY - USD", () => {
    coinInput = getRate('AUD', 'JPY', 'USD');
    expect(coinInput).toBe(100.410145);
  });

  it("should return JPY to EUR - USD", () => {
    coinInput = getRate('JPY', 'EUR', 'USD');
    expect(coinInput).toBe(0.0067696362183661245);
  });

});