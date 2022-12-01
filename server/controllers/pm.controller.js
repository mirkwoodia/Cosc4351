import pmtable from '../pmtable.js'
const profile = new pmtable();

const createPMInfo = (req,res) => {
	let arr;
	if (req.app.locals.client.username) {
		arr = req.app.locals.client.username;
	}
	else {
		res.json({message: "Not Logged in"});
	}
	
	console.log("Received New Profile Update for " + arr);
    profile.createUser(
        arr,
        req.body.details.Name,
        req.body.details.mailing_address,
        req.body.details.billing_address,
        req.body.details.diner,
        req.body.details.payment,
		req.body.details.points
    );
}

const getPMInfo = (req,res) => {
	var arr = req.app.locals.client.username;

	profile.getByUsername(arr)
	.then((result) =>{
			if (result == undefined) {
				console.log("Someone tried to access profile without making a profile, setting default empty values now.")
				profile.createUser(arr, "", "", "", "", "", "");
				result = profile.getByUsername(arr)
			}
			res.json({result});
	})
}

export {createPMInfo, getPMInfo};