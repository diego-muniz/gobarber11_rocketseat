"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var Balance_1 = __importDefault(require("../models/Balance"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var transactions = this.transactions;
        var maxIncome = transactions
            .filter(function (x) { return x.type === 'income'; })
            .map(function (x) { return x.value; })
            .reduce(function (x, y) { return x + y; }, 0);
        var maxOutcome = transactions
            .filter(function (x) { return x.type === 'outcome'; })
            .map(function (x) { return x.value; })
            .reduce(function (x, y) { return x + y; }, 0);
        var balance = new Balance_1.default({
            income: maxIncome,
            outcome: maxOutcome,
            total: maxIncome - maxOutcome,
        });
        return balance;
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1.default({ title: title, value: value, type: type });
        if (type === 'outcome') {
            var balance = this.getBalance();
            if (value > balance.total) {
                throw Error('should not be able to create outcome transaction without a valid balance');
            }
        }
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
