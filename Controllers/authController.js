require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
  login: async (req, res) => {
    const userLogin = req.body;

    try {
      const user = await User.findOne({ email: userLogin.email });
      if (!user) throw new Error('invalid user');

      console.log(user.password, userLogin.password);
      if (user.password !== userLogin.password) throw new Error('invalid user');

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);

      res.json({
        message: 'login successfull',
        userId: user._id,
        token,
      });
    } catch (error) {
      res.json(error.message);
    }
  },
  regis: async (req, res) => {
    try {
      const { name, email, password, address, phone, kodepos } = req.body;
      if (!(name && email && password && address && phone && kodepos)) {
        res.status(400).send('semuanya harus diisi');
      }

      const existUser = await User.findOne({ email });
      if (existUser) {
        res.status(400).send('user sudah ada');
      }

      const encryptPw = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: encryptPw,
      });

      const token = jwt.sign({ id: user.id, email }, process.env.JWT_KEY, { expiresIn: '2h' });
      user.token = token;
      user.password = undefined;

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  },
};
