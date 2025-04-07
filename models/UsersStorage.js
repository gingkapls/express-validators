class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  async addUser({ fname, lname, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, fname, lname, email, age, bio };
    this.id += 1;
  }

  async getUser({ id }) {
    return this.storage[id];
  }

  async getUsers() {
    return Object.values(this.storage);
  }

  async updateUser(id, { fname, lname, email, age, bio }) {
    if (!this.storage[id]) throw new Error("User not found");

    return (this.storage[id] = { id, fname, lname, email, age, bio });
  }

  async deleteUser({ id }) {
    delete this.storage[id];
  }
}

module.exports = new UsersStorage();
