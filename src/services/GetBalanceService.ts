import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

class GetBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Balance {
    const balance = this.transactionsRepository.getBalance();

    return balance;
  }
}

export default GetBalanceService;
