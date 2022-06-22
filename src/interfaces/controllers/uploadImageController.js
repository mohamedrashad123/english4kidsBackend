const Controller = require("../../utils/Controller");
const Methods = require("../../utils/endpointMethods");
const {getImgPath} = require("../../utils/imageSaver");

class UploadController extends Controller {
    path = "/upload";
    routes = [
        {
            path: "/",
            method: Methods.POST,
            handler: (req, res) => this.uploadImageHandler(req, res),
            localMiddleware: []
        }
    ];

    constructor(tokenHandler) {
        super();
        this.tokenHandler = tokenHandler;
    }

    uploadImageHandler = async (req, res) => {
        try {
            const {
                files: {image},
                fields: {folder}
            } = req;

            const imageName = getImgPath(image, folder);
            this.sendSuccess(
                res,
                {statusCode: 200, imageName},
                "image has been saved successfully"
            );
        } catch (err) {
            console.log(err);
            this.sendError(res, err.message);
        }
    };
}

module.exports = UploadController;
