import restdb from './restaurantDB.js';

class paymentTable extends restdb {
  constructor() {
    // Calls parent constructor first
    super();
    const sql = `CREATE TABLE IF NOT EXISTS payments(payment text)`
    this.run(sql)
  }

	createPayment(payment) {
    return this.run(
      'INSERT OR IGNORE INTO payments (payment) VALUES (?)',
      [payment]
    )
  }

	getPayment() {
    return this.get(
      `SELECT * FROM payments`)
  }

}

export default paymentTable;