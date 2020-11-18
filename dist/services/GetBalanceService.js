"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetBalanceService = /** @class */ (function () {
    function GetBalanceService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    GetBalanceService.prototype.execute = function () {
        var balance = this.transactionsRepository.getBalance();
        return balance;
    };
    return GetBalanceService;
}());
exports.default = GetBalanceService;
