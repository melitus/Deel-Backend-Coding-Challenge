const httpStatus = require('http-status');

const ProfileService = require('./profile.service');

const deposit = async (req, res) => {
  try {
    const response = await ProfileService.depositMoney(req);
    if (typeof response === 'string' && response.includes('Maximum deposit amount reached')) {
      res.status(httpStatus.BAD_REQUEST).json({ success: false, message: `${response}` });
    } else if (typeof response === 'string' && response.includes("We can't take your deposit without active jobs")) {
      res.status(httpStatus.NOT_FOUND).json({ success: false, message: `${response}` });
    } else {
      res.status(httpStatus.OK).json({ success: true, message: 'Money deposited successfully', data: response });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while depositing money' });
  }
};

module.exports = {
  deposit,
};
