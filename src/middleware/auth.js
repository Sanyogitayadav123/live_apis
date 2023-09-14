import jwt from 'jsonwebtoken';
import UserModal from '../model/userModel';


const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '').trim();
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModal.findById(decoded.userId);
    if (!user) {
      throw new Error();
    }
  } catch (e) {
    console.log('ERR>', e);
    res.status(401).json({ success: false, error: 'Please authenticate!' });
  }
};

export default auth;
