const { MenuItem } = require('../models');

const allMenuItems = async () => {
  const menuItems = await MenuItem.find();
  return menuItems;
};

const createMenuItem = async ({ type, name, price, photo }, _) => {
  const item = new MenuItem({
    type,
    name,
    price,
    photo
  });

  const created = await item.save();

  return created;
};

const resolvers = {
  allMenuItems,
  createMenuItem
};

module.exports = resolvers;
