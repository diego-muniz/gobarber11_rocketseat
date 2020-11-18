import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const maxIncome = transactions
      .filter(x => x.type === 'income')
      .map(x => x.value)
      .reduce((x, y) => x + y, 0);

    const maxOutcome = transactions
      .filter(x => x.type === 'outcome')
      .map(x => x.value)
      .reduce((x, y) => x + y, 0);

    const balance = new Balance({
      income: maxIncome,
      outcome: maxOutcome,
      total: maxIncome - maxOutcome,
    });

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (type === 'outcome') {
      const balance = this.getBalance();
      if (value > balance.total) {
        throw Error(
          'should not be able to create outcome transaction without a valid balance',
        );
      }
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
