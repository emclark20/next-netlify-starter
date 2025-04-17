// pages/api/user/profile.js
const handler = async (req, res) => {
  // Add detailed logging
  console.log('User profile request', {
    userId: req.user.user_id,
    username: req.user.username,
    requestTime: new Date().toISOString()
  });
  
  return res.status(200).json({ 
    message: 'Profile retrieved successfully', 
    user: req.user 
  });
};

export default withAuth(handler);