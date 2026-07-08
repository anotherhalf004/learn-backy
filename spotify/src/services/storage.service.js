const { ImageKit } = require('@imagekit/nodejs');

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || process.env.IMAGEKI_PRIVATE_KEY;
const ImageKitClient = privateKey ? new ImageKit({ privateKey }) : null;

async function uploadFile(file) {
    if (!ImageKitClient) {
        throw new Error('ImageKit credentials are not configured');
    }

    const result = await ImageKitClient.files.upload({
        file,
        fileName: 'music_' + Date.now(),
        folder: 'spotify/music'
    });
    return result;
}

module.exports = { uploadFile };