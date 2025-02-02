"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUnauthorisedAccess = void 0;
const sendUnauthorisedAccess = (res) => {
    res.setStatusCode(401);
    res.sendJSONResponse({
        status: "UNAUTHORISED",
        message: "Unauthorised access",
    });
};
exports.sendUnauthorisedAccess = sendUnauthorisedAccess;
