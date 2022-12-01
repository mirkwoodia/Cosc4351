import restdb from './restaurantDB.js';
class reservationtable extends restdb 
{
  constructor() 
  {
    // Calls parent constructor first
    super();
    this.run("PRAGMA foreign_keys = ON;")
    const sql = `CREATE TABLE IF NOT EXISTS reservations(id INTEGER PRIMARY KEY AUTOINCREMENT, username text, res_start text, FOREIGN KEY (username) REFERENCES usertable(username))`
    this.run(sql)
  }

  createReservation(userID, start)
  {
    return this.run(
        'INSERT INTO reservations (userID, res_start) VALUES (?,?)',
    [userID,start]);
  }

  getByStart(start)
  {
    return this.get(
        'SELECT * FROM reservations WHERE res_start = ?',
        [start]
    )
  }

  getAllReservations()
  {
    return this.all("SELECT * FROM reservations")
  }
}

export default reservationtable