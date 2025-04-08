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

  async getUserById({ id }) {
    return this.storage[id];
  }

  async getUsersByName({ name }) {
    const allUsers = await this.getUsers();
    console.log(allUsers);

    return allUsers.filter((user) => {
      return user.fname.includes(name) || user.lname.includes(name);
    });
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

let storage = new UsersStorage();
storage.addUser({fname: "gin", lname: "kun", email: "gin@gin.com", age: 15, bio: ""});

module.exports = storage;
