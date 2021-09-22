/**
 * In case of masstransaction we need to calculate ammount for one particular address.
 * @param address - address for which ammount will be calculated
 */
export function replaceAmountFor(address: string) {
  return function(transactions: any[]) {
    return transactions.map((transaction: any) => {
      return {
        ...transaction,
        amount: transactionAmount(transaction, address)
      };
    });
  };
}

function transactionAmount(transaction: any, address: string): number {
  if (transaction.type === 11) {
    // Mass transaction
    const amount = transaction.transfers.reduce((sum: number, transfer: any) => {
      return transaction.sender === address || transfer.recipient === address
        ? transfer.amount + sum
        : sum;
    }, 0);

    return amount;
  } else if (transaction.type === 9) {
    return transaction.lease.amount;
  }

  return transaction.amount;
}
