import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';

dotenv.config();

// setting up cloudinary config for photos
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const getAllProperties = async (req, res) => {
  const { _end, _order, _start, _sort, title_like = '', propertyType= '' } = req.query;

  const query = {};

  if(propertyType !== '') {
    query.propertyType = propertyType;
  }

  if(title_like) {
    query.title = { $regex: title_like, $option: 'i' }
  }

  try {
    const count = await Property.countDocuments({ query });

    // Get all properties of current user or how many they filter
    const properties = await Property
      .find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order })

    res.header('x-total-count', count);
    res.header('Access-Control-Expose-Headers', 'x-total-count')

    //return a success status and properties
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const getPropertyDetail = async (req, res) => {
  const { id } = req.params;
  const propertyExists = await Property.findOne({ _id: id }).populate('creator');

  if(propertyExists) {
    res.status(200).json(propertyExists)
  } else {
    res.status(404).json({ message: 'Property not found' })
  }
};

const createProperty = async (req, res) => {
  try {
    // destructure all data passed from the client
    const { title, description, propertyType, location, price, photo, email } = req.body;

    // create this session to make sure everything works in this logic or doesn't so it won't become stuck
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if(!user) throw new Error('User not found');

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({ 
      title, 
      description, 
      propertyType, 
      location, 
      price, 
      photo: photoUrl.url, 
      creator: user._id 
    });

    // add new property to user's existing properties
    user.allProperties.push(newProperty._id);
    await user.save({ session });

    // ending the session
    await session.commitTransaction();

    res.status(200).json({ message: 'Property created successfully' })
  }catch(error) {
    res.status(500).json({ message: error.message })
    console.log(error)
  }
};

const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params
    const propertyToDelete = await Property.findById({ _id: id }).populate('creator');

    if(!propertyToDelete) throw new Error('Property not found');

    const session = await mongoose.startSession();
    session.startTransaction();

    propertyToDelete.remove({session});
    propertyToDelete.creator.allProperties.pull(propertyToDelete);

    await propertyToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};