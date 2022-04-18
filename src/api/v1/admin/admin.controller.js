/* eslint-disable import/no-named-as-default-member */
const httpStatus = require('http-status');

const AdminService = require('./admin.service');

const findBestProfession = async (req, res) => {
  try {
    const foundBestProfession = await AdminService.getBestProfession(req);

    if (!foundBestProfession) {
      res.status(httpStatus.NOT_FOUND).json({ success: false, message: 'No best profession found' });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Highest earning profession record found successfully',
        data: foundBestProfession,
      });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while finding best profession', Error: error });
  }
};

const getBestClients = async (req, res) => {
  try {
    const foundBestClients = await AdminService.findBestClients(req);
    if (!foundBestClients) {
      res.status(httpStatus.NOT_FOUND).json({ success: true, message: 'No best clients found' });
    } else {
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Best clients found successfully', data: foundBestClients });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while finding best clients', Error: error });
  }
};

module.exports = {
  findBestProfession,
  getBestClients,
};
