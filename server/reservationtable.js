import restdb from './restaurantDB.js';
class reservationtable extends restdb 
{
  constructor() 
  {
    // Calls parent constructor first
    super();
    const sql = `CREATE TABLE IF NOT EXISTS reservations(id INTEGER PRIMARY KEY AUTOINCREMENT, username text, res_start DATETIME, res_end DATETIME, tables INTEGER)`
    this.run(sql)
  }

  createReservation(username, start, end, tables)
  {
    return this.run(
        'INSERT INTO reservations (username, res_start, res_end, tables) VALUES (?,?,?,?)',
    [username,start, end, tables]);
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

  checkReservations()
  {
    return this.all("SELECT MAX(id) FROM reservations")
  }
}

export default reservationtable