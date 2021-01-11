const { MenuItem } = require('../models');

const allMenuItems = async () => {
  try {
    const menuItems = await MenuItem.find();

    return menuItems;
  } catch (error) {
    return error;
  }
};

const createMenuItem = async ({ type, name, price, photo }) => {
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

const updateMenuItem = async ({ _id, ...payload }) => {
  const updatable = ['type', 'name', 'price', 'photo'];
  const update = {};

  updatable.forEach((item) => {
    if (payload[item]) update[item] = payload[item];
  });

  try {
    const updated = await MenuItem.findByIdAndUpdate(_id, update, { useFindAndModify: false, new: true });

    return updated;
  } catch (error) {
    return error;
  }
};

const deleteMenuItem = async ({ _id }) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(_id);

    return deleted;
  } catch (error) {
    return error;
  }
};

const resolvers = {
  allMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};

module.exports = resolvers;
