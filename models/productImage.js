const Sequelize = require('sequelize');

const ProductImage = DATABASE.define(
  'product_images',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    product_name: {
      type: Sequelize.STRING(255)
    },
    product_url: {
      type: Sequelize.TEXT
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    indexes: [
      {
        name: 'unique_product_name',
        unique: true,
        fields: ['product_name']
      }
    ]
  }
);
module.exports = ProductImage;
