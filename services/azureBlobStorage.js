const { BlobServiceClient } = require('@azure/storage-blob');
const config = require('../config/config');

const blobServiceClient = BlobServiceClient.fromConnectionString(
  config.AZURE_BLOB_STORAGE.CONNECTION_STRING
);

// Create container
exports.createContainer = async (containerName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log(createContainerResponse);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Upload image using this function
exports.uploadImage = async (containerName, imageName, image) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(imageName);
    const uploadBlobResponse = await blockBlobClient.upload(
      image,
      image.length,
      {
        blobHTTPHeaders: { blobContentType: 'image/jpeg' }
      }
    );
    console.log(uploadBlobResponse);
    return { url: blockBlobClient.url };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
