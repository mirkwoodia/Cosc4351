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
        req.body.details.FullName,
        req.body.details.Address1,
        req.body.details.Address2,
        req.body.details.City,
        req.body.details.State,
		req.body.details.ZipCode
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