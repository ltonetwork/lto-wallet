/**
 * In lease transactions recipient located in .lease.recipient field
 * This function normalizes recipient field
 */
export function setRecipient(transactions: any[]) {
  return transactions.map(transaction => {
    let recipient = transaction.recipient;
    const sender = transaction.sender;

    if (transaction.type === 9) {
      recipient = transaction.lease.recipient;
    }

    return {
      ...transaction,
      recipient,
      sender
    };
  });
}
