const { sumTotal } = require("./utils");
const { createAPI } = require("./api");
const api = createAPI();

describe("api.category", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, category: "electronics" }]),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it("should call the correct endpoint with the given category", async () => {
    const category = "electronics";
    const result = await api.category(category);

    expect(fetch).toHaveBeenCalledWith(
      expect.objectContaining({
        href: `https://fakestoreapi.com/products/category/${category}`,
      }),
      expect.objectContaining({ method: "GET" })
    );
    expect(result).toEqual([{ id: 1, category: "electronics" }]);
  });
});

describe("sumTotal", () => {
  it("should return the correct total amount for given items", () => {
    const cartItems = [
      { price: 10, quantity: 2 },
      { price: 20, quantity: 1 },
      { price: 5, quantity: 4 },
    ];
    const result = sumTotal(cartItems);
    expect(result).toBe(60);
  });

  it("should return 0 for an empty cart", () => {
    const cartItems = [];
    const result = sumTotal(cartItems);
    expect(result).toBe(0);
  });

  it("should return the correct amount for a cart with one item", () => {
    const cartItems = [{ price: 20, quantity: 4 }];
    expect(sumTotal(cartItems)).toBe(80);
  });

  it("should return 0 when cart has all items with quantity 0", () => {
    const cartItems = [
      { price: 10, quantity: 0 },
      { price: 15, quantity: 0 },
    ];
    expect(sumTotal(cartItems)).toBe(0);
  });
});
