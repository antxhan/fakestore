function createAPI() {
  return {
    async _request(endpoint, params = null, method = "GET") {
      // concatenates base url with endpoint
      const baseUrl = "https://fakestoreapi.com/";
      const url = new URL(baseUrl + endpoint);

      // appends params to url if their value exists
      if (params) {
        url.search = new URLSearchParams(
          Object.entries(params).filter(([key, value]) => value != null)
        );
      }

      // makes request to api and returns data
      const response = await fetch(url, {
        method: method,
      });
      const data = await response.json();
      return data;
    },
    products(limit = null) {
      const endpoint = "products";
      const params = {
        limit,
      };
      return this._request(endpoint, params);
    },
    product(id) {
      const endpoint = `products/${id}`;
      return this._request(endpoint);
    },
    category(category) {
      const endpoint = `products/category/${category}`;
      return this._request(endpoint);
    },
  };
}

module.exports = { createAPI };
