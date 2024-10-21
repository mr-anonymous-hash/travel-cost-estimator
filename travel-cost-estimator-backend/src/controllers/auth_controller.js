const auth_crud = require('./../crud/auth_crud')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Admin} = require('./../models')

const signup = async(req, res) => {
    const {name,email,phone,password} = req.body
    
    if(!name) res.send('please enter name')
    if(!email) res.send('please enter email')
    if(!phone) res.send('please enter phone number')
    if(!password) res.send('please enter password')
    // if(!role) res.send('please select your role')

    const hashPass = await bcrypt.hash(password,10)
    const data = {name,email,phone,password: hashPass}
    const user = await auth_crud.signup(data)
    if(user){
        const token = jwt.sign({id: user.user_id, email: user.email,},
            process.env.SECRET_KEY,
            {expiresIn: '2h'}
        ) 
        res.status(201).send({user,token})
    }
    else{
        res.status(400).send('Unable to create user')
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await auth_crud.login(email)
    if(!user || !(await bcrypt.compare(password, user.password))){
        res.status(401).send('Invalid email or Password');
    }else{
    const token = jwt.sign({id: user.user_id}, process.env.SECRET_KEY, {expiresIn: '2h'})
    res.send({user:{name: user.name, user_id:user.user_id},token})
    }
}

const adminlogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await Admin.findOne({ where: { username } });

    if (!user || user.password !== password) {
        res.status(401).send('Invalid username or Password');
    } else {
        const token = jwt.sign({ id: user.admin_id }, process.env.SECRET_KEY, { expiresIn: '2h' });
        res.send({ user: { name: user.username, admin_id: user.admin_id }, token });
    }
};


module.exports = {signup,login,adminlogin}