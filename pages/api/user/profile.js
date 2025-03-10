// pages/api/user/profile.js
import { withAuth } from '../../../middleware/auth';

const handler = async (req, res) => {
  // This route is protected by withAuth middleware
  // req.user is already available
  
  return res.status(200).json({ 
    message: 'Profile retrieved successfully', 
    user: req.user 
  });
};

export default withAuth(handler);