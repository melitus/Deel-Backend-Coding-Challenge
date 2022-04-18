/* eslint-disable import/no-named-as-default-member */
const httpStatus = require('http-status');

const ContractService = require('./contract.service');

const getSingleContractById = async (req, res) => {
  try {
    const foundContract = await ContractService.getSingleContractById(req);
    if (!foundContract) {
      res.status(httpStatus.NOT_FOUND).json({ success: true, message: 'No contract found' });
    } else {
      res.status(httpStatus.OK).json({ success: true, message: 'A contract found successfully', data: foundContract });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while fetching a contract', Error: error });
  }
};

const getNonTerminatedUserContracts = async (req, res) => {
  try {
    const foundContract = await ContractService.getNonTerminatedUserContracts(req);
    if (!foundContract) {
      res.status(httpStatus.NOT_FOUND).json({ success: true, message: 'No contract found' });
    } else {
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'A non-terminated contract found successfully', data: foundContract });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while fetching a contract', Error: error });
  }
};

module.exports = {
  getSingleContractById,
  getNonTerminatedUserContracts,
};
