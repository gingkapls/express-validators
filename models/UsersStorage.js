class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  async addUser({ fname, lname }) {
    const id = this.id;
    this.storage[id] = { id, fname, lname };
    this.id += 1;
  }

  async getUser({ id }) {
    return this.storage[id];
  }

  async getUsers() {
    return Object.values(this.storage);
  }

  async updateUser(id, { fname, lname }) {
    if (!this.storage[id]) throw new Error("User not found");

    return (this.storage[id] = { id, fname, lname });
  }

  async deleteUser({ id }) {
    delete this.storage[id];
  }
}

module.exports = new UserStorage();
