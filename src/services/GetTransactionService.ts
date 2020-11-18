import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class GetTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Transaction[] {
    const transactions = this.transactionsRepository.all();

    return transactions;
  }
}

export default GetTransactionService;
