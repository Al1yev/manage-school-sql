class FeatureAPI {
  constructor(req, query) {
    this.req = req;
    this.query = query;
  }

  filter() {
    if (this.req.query) {
      const others = ["sort", "limit", "page", "field"];

      let filtQuery = { ...this.req.query };
      Object.keys(filtQuery).map((el) =>
        others.includes(el) ? delete filtQuery[el] : undefined
      );

      if (!Object.keys(filtQuery).length) return this;

      let strQuery = "";
      Object.keys(filtQuery).map(
        (el) => (strQuery += el + ` = '${filtQuery[el]}' AND `)
      );

      this.query = this.query + ` WHERE ${strQuery.slice(0, -4)}`;
    }
    return this;
  }

  sort() {
    if (this.req.query.sort) {
      this.query += ` ORDER BY ` + this.req.query.sort;
    }
    return this;
  }

  field() {
    if (this.req.query.field) {
      this.query = this.query.replace("*", this.req.query.field);
    }
    return this;
  }

  pagination() {
    const page = this.req.query.page || 1;
    const limit = this.req.query.limit || 5;
    const skip = (page - 1) * limit;
    this.query = this.query + " LIMIT " + limit + " OFFSET " + skip;
    return this;
  }
}

module.exports = FeatureAPI;
