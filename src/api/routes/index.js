const { Router } = require( 'express');

const contractRoutes = require( '../v1/contract');
const profileRoutes = require( '../v1/profile');
const jobRoutes = require( '../v1/job');
const adminRoutes = require( '../v1/admin');

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Deel coding challenge api is live!' });
});

apiRouter.use('/contracts', contractRoutes);
apiRouter.use('/balances', profileRoutes);
apiRouter.use('/jobs', jobRoutes);
apiRouter.use('/admin', adminRoutes);

module.exports = apiRouter;
