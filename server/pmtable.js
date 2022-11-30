import restdb from './restaurantDB.js';

class pmtable extends restdb {
  constructor() {
    // Calls parent constructor first
    super();
    const sql = `CREATE TABLE IF NOT EXISTS pmtable(username text PRIMARY KEY, fullname text not null, address1 text not null, address2 text, city text not null, state text not null, zipcode text not null, UNIQUE(username))`
    this.run(sql)
  }

	// This can run after user registration
	createUser(username, fullname, address1, address2, city, state, zipcode) {
    return this.run(
      'INSERT OR REPLACE INTO pmtable (username, fullname, address1, address2, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, fullname, address1, address2, city, state, zipcode]
    )
  }

	// This can run when a user goes to profile management and submits something
	updateUser(username, fullname, address1, address2, city, state, zipcode) {
    return this.run(
      `UPDATE pmtable 
			SET fullname = ?,
			SET address1 = ?,
			SET address2 = ?,
			SET city = ?,
			SET state = ?,
			SET zipcode = ?,
			WHERE username = ?`,
      [fullname, address1, address2, city, state, zipcode, username]
    )
  }

	// This runs... Just when user opens profile management page
	getByUsername(username) {
      return this.get(
        `SELECT * FROM pmtable WHERE username = ?`,
      [username])
  }

  getState(username){
    return this.get(
      `SELECT state FROM pmtable WHERE username =?`,
      [username]
    )
  }

}

export default pmtable;