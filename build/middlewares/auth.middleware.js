"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = async (req, res, next) => {
    //   try {
    //     const cookies = req.cookies;
    //     if (cookies && cookies.Authorization) {
    //       const secret = process.env.JWT_SECRET;
    //       const verificationResponse = (await jwt.verify(cookies.Authorization, secret)) as DataStoredInToken;
    //       const userId = verificationResponse.id;
    //       const findUser = userModel.find(user => user.id === userId);
    //       if (findUser) {
    //         req.user = findUser;
    //         next();
    //       } else {
    //         next(new HttpException(401, 'Wrong authentication token'));
    //       }
    //     } else {
    //       next(new HttpException(404, 'Authentication token missing'));
    //     }
    //   } catch (error) {
    //     next(new HttpException(401, 'Wrong authentication token'));
    //   }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map