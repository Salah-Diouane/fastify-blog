import logger from "../config/logger.js";

export default function errorHandler(err, req, replay) {
    let statusCode = 500;
    let msg = "internal server error";

    if (err.code === "FST_ERR_VALIDATION"){
        statusCode = 404;
        msg = "validation error";
        logger.info(err);
    } else {
        logger.error(err);
    }

    const res = {
        code: statusCode,
        msg,
    };

    replay.code(statusCode).send(res);
}


