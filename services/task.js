const fs = require('fs');
const path = require('path');
const azureBlobStorage = require('./azureBlobStorage');
const ProductImage = require('../models/productImage');
const config = require('../config/config');
const PRODUCT_IMAGES_PATH = '/../productImages';

exports.uploadImages = async () => {
  try {
    // Reading file names from productImages folder
    const productImageNames = fs.readdirSync(
      path.join(__dirname, PRODUCT_IMAGES_PATH)
    );
    const productImageData = [];
    for (let i = 0; i < productImageNames.length; i++) {
      // Reading file
      const productImage = fs.readFileSync(
        path.join(__dirname, PRODUCT_IMAGES_PATH, productImageNames[i])
      );
      console.log(productImage);

      // Uploading to azure blob storage
      const uploadResponse = await azureBlobStorage.uploadImage(
        config.AZURE_BLOB_STORAGE.CONTAINER,
        productImageNames[i],
        productImage
      );
      console.log(uploadResponse);

      productImageData.push({
        product_name: productImageNames[i],
        product_url: uploadResponse.url
      });
    }
    // Saving response to database
    const productImageRecords = await ProductImage.bulkCreate(
      productImageData,
      {
        updateOnDuplicate: ['product_url']
      }
    );
    console.log(productImageRecords);
  } catch (error) {
    console.log(error);
  }
};
