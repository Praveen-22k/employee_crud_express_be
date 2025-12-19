const user = require("../model/model");
const Apperror = require("../utils/Apperror");

const getdata = async (req, res, next) => {
  try {
    const getdata = await user.find();
    if (!getdata || getdata.length === 0) {
      return next(new Apperror("userdetails not found", 400));
    }
    return res.status(200).json({
      status: true,
      message: getdata,
    });
  } catch (err) {
    return next(new Apperror("something went wrong!", 400));
  }
};

const createdata = async (req, res, next) => {
  try {
    const { name, id, gender, department, shift, employeetype } = req.body;
    console.log(
      "messsage ----",
      name,
      id,
      gender,
      department,
      shift,
      employeetype
    );
    if (!name || !id || !gender || !department || !shift || !employeetype) {
      return next(new Apperror("All fields are mandiatory", 400));
    }

    const alreadyexits = await user.findOne({ id });
    console.log("already exit-----------", alreadyexits);
    if (alreadyexits) {
      return next(new Apperror("User already exits", 400));
    }
    console.log("message existing data", alreadyexits);
    const create = await user.create({
      name,
      id,
      gender,
      department,
      shift,
      employeetype,
    });
    return res.status(201).json({
      message: "data created",
      data: create,
    });
  } catch (err) {
    return next(new Apperror("something went wrong in createdata", 400));
  }
};

const updatedata = async (req, res, next) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      { runValidators: true }
    );
    if (!updatedUser) {
      return next(new Apperror("Data not found", 400));
    }
    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return next(new Apperror("something went wrong in updateuser", 400));
  }
};

const deletedata = async (req, res, next) => {
  try {
    const deleteuser = await user.findByIdAndDelete(req.params.id);
    if (!deleteuser) {
      return next(new Apperror(" Data not found", 404));
    }
    return res
      .status(200)
      .json({ success: true, message: "data deleted successfully" });
  } catch (err) {
    return next(new Apperror("something wnt wrong in deletedata", 400));
  }
};

module.exports = { getdata, createdata, updatedata, deletedata };
