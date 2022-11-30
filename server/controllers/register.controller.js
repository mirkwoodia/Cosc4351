import usertable from "../usertable.js";
import bcrypt from 'bcrypt';
const users = new usertable();

const registerInfo = (req, res) => {
    if (req.body.details.username != '' && req.body.details.password != '') {

        users.getByUsername(req.body.details.username)
            .then((result) => {
                if (result == undefined)
                {
                    let password = req.body.details.password;
                    bcrypt.hash(password, 10)
                        .then((hashPassword => {
                            console.log("Hashed password: " + hashPassword);
                            users.createUser(req.body.details.username, hashPassword)
                                .then((answer) => {
                                    res.json(answer);
                                    res.send(answer);
                                })
                        }));
                } else
                    res.send({message: "That username is taken. Try another."});
            });
    }
}

export default registerInfo;