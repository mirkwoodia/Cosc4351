import paymentTable from '../paymentTable.js'
const payment = new paymentTable();

payment.createPayment("credit");
payment.createPayment("check");
payment.createPayment("cash");

const getPayment = (req,res) => {
	payment.getPayment()
	.then((result) =>{
			res.json({result});
	})
}

export {getPayment};