"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userApi = exports.UserApi = void 0;
var api_1 = require("./api");
// import { Credentials, Token, User } from "./interfaces";
var UserApi = /** @class */ (function (_super) {
    __extends(UserApi, _super);
    function UserApi(config) {
        var _this = _super.call(this, config) || this;
        // this middleware is been called right before the http request is made.
        _this.interceptors.request.use(function (param) { return (__assign({}, param)); });
        // this middleware is been called right before the response is get it by the method that triggers the request
        _this.interceptors.response.use(function (param) { return (__assign({}, param)); });
        _this.userLogin = _this.userLogin.bind(_this);
        _this.userRegister = _this.userRegister.bind(_this);
        _this.getAllUsers = _this.getAllUsers.bind(_this);
        _this.getById = _this.getById.bind(_this);
        return _this;
    }
    // public userLogin(credentials: Credentials): Promise<Token> {
    //   return this.post<string, Credentials, AxiosResponse<string>>(
    //     "https://www.domain.com/login",
    //     credentials
    //   ).then(this.success);
    // }
    // public userRegister(): Promise<number> {
    //   return this.post<number, User, AxiosResponse<number>>(
    //     "https://www.domain.com/register",
    //     user
    //   )
    //     .then(this.success)
    //     .catch((error: AxiosError<Error>) => {
    //       throw error;
    //     });
    // }
    // public async getAllUsers(): Promise<User[]> {
    //   try {
    //     const res: AxiosResponse<User[]> = await this.get<
    //       User,
    //       AxiosResponse<User[]>
    //     >("https://www.domain.com/register");
    //     return this.success(res);
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    UserApi.prototype.getUser = function () {
        return this.get("https://run.mocky.io/v3/00d500c3-9ff8-4c8d-877b-ac745d7bb2d7").then(this.success);
    };
    return UserApi;
}(api_1.Api));
exports.UserApi = UserApi;
exports.userApi = new UserApi();
