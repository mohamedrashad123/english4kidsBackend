const fs = require("fs");
const path = require("path");

exports.getImgPath = (img, folder) => {
    try {
        // get upload image name
        const uploadImgName = img.path.slice(img.path.lastIndexOf("/") + 1);

        // get img full name
        const imgFullName = img.name;

        // get image extention
        const extention = imgFullName.slice(imgFullName.indexOf("."));

        // create new image name
        const newImgName = `${
            Math.floor(Math.random() * Date.now()) + extention
        }`;

        // save image to new path
        const newPath = path.resolve(
            __dirname,
            `../../../cdn-english4kids/${folder}/${newImgName}`
        );

        // get uploaded image data
        fs.readFile(img.path, (err, data) => {
            // create new image
            fs.writeFile(newPath, data, (err) => {});

            // delete uploaded image
            fs.unlink(
                path.resolve(__dirname, `../public/${uploadImgName}`),
                (err) => {
                    if (err) console.log(err);
                    console.log("file has been deleted");
                }
            );
        });

        return newImgName;
    } catch (err) {
        throw err;
    }
};
