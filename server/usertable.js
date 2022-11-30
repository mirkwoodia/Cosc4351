import restdb from './restaurantDB.js';

class usertable extends restdb {
  constructor() {
    // Calls parent constructor first
    super();
    const sql = `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username text not null, password text not null, UNIQUE(username))`
    this.run(sql)
  }

	createUser(username, password) {
    return this.run(
      'INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)',
      [username, password]
    )
  }

	updateUser(username, password) {
    return this.run(
      `UPDATE users 
			SET password = ?,
			WHERE username = ?`,
      [password, username]
    )
  }

	getByUsername(username) {
    return this.get(
      `SELECT * FROM users WHERE username = ?`,
      [username])
  }

  getUser(username, password) {
      return this.get(
          `SELECT * FROM users WHERE username = ? AND password = ?`,
          [username, password]
      )
  };

  getAllUsers() {
    return this.all(`SELECT * FROM users`);
  }

}

export default usertable;