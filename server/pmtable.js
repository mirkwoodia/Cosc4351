import restdb from './restaurantDB.js';

class pmtable extends restdb {
  constructor() {
    // Calls parent constructor first
    super();
    const sql = `CREATE TABLE IF NOT EXISTS pmtable(username text PRIMARY KEY, name text, mailing_address text not null, billing_address text, diner text not null, payment text not null, points text not null, UNIQUE(username))`
    this.run(sql)
  }

	// This can run after user registration
	createUser(username, name, mailing_address, billing_address, diner, payment, points) {
    return this.run(
      'INSERT OR REPLACE INTO pmtable (username, name, mailing_address, billing_address, diner, payment, points) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, name, mailing_address, billing_address, diner, payment, points]
    )
  }

	// This can run when a user goes to profile management and submits something
	updateUser(username, name, mailing_address, billing_address, diner, payment, points) {
    return this.run(
      `UPDATE pmtable 
			SET name = ?,
			SET mailing_address = ?,
			SET billing_address = ?,
			SET diner = ?,
			SET payment = ?,
			SET points = ?,
			WHERE username = ?`,
      [name, mailing_address, billing_address, diner, payment, points, username]
    )
  }

	// This runs... Just when user opens profile management page
	getByUsername(username) {
      return this.get(
        `SELECT * FROM pmtable WHERE username = ?`,
      [username])
  }

  getPayment(username){
    return this.get(
      `SELECT payment FROM pmtable WHERE username =?`,
      [username]
    )
  }

}

export default pmtable;