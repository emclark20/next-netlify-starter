import { withAuth } from '../../../middleware/auth';

const handler = (req, res) => {
  // If middleware passes, you're authenticated
  res.status(200).json({ 
    authenticated: true,
    user: req.user 
  });
};

export default withAuth(handler);