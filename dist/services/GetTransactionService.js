"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetTransactionService = /** @class */ (function () {
    function GetTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    GetTransactionService.prototype.execute = function () {
        var transactions = this.transactionsRepository.all();
        return transactions;
    };
    return GetTransactionService;
}());
exports.default = GetTransactionService;
