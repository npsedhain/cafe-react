const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.BUCKET_REGION });
const S3 = new AWS.S3({ apiVersion: '2006-03-01' });

const { MenuItem } = require('../models');

const allMenuItems = async () => {
  try {
    const menuItems = await MenuItem.find();

    return menuItems;
  } catch (error) {
    return error;
  }
};

const createMenuItem = async (_, { type, name, price, file }) => {
  let photo = '';
  const fileData = await file;

  if (fileData) {
    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileData.filename,
      Body: fileData.createReadStream()
    };

    try {
      const data = await S3.upload(s3Params).promise();
      photo = data.Location;
    } catch (err) {
      return err;
    }
  }

  const item = new MenuItem({
    type,
    name,
    price,
    photo
  });

  try {
    const created = await item.save();

    return created;
  } catch (error) {
    return error;
  }
};

const updateMenuItem = async (_, { _id, ...payload }) => {
  let photo = payload.photo || '';
  const update = {};
  const updatable = ['type', 'name', 'price', 'photo'];
  const fileData = await payload.file;

  if (fileData) {
    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileData.filename,
      Body: fileData.createReadStream()
    };

    try {
      const data = await S3.upload(s3Params).promise();
      photo = data.Location;
    } catch (err) {
      return err;
    }
  }

  const updatedPayload = { ...payload, photo };
  updatable.forEach((item) => {
    update[item] = updatedPayload[item];
  });

  try {
    const updated = await MenuItem.findByIdAndUpdate(_id, update, { useFindAndModify: false, new: true });

    return updated;
  } catch (error) {
    return error;
  }
};

const deleteMenuItem = async (_, { _id }) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(_id);

    return deleted;
  } catch (error) {
    return error;
  }
};

const resolvers = {
  Query: { allMenuItems },
  Mutation: {
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
  }
};

module.exports = resolvers;
