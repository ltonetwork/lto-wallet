import * as moment from 'moment';

export interface TransactionsGroup {
  date: string;
  transactions: any[];
}

/**
 * Groups transactions by same date
 * @param transactions - array of transactions
 */
export function groupByDate(transactions: any[]): TransactionsGroup[] {
  const grouped = transactions.reduce((group, transaction) => {
    const date = moment(transaction.timestamp).format('MMMM, D, YYYY');
    const dateGroup: any[] = group[date] || [];
    dateGroup.push(transaction);
    // Transactions come in random order, so we need to sort them by timestamp
    const sortedDateGroup = dateGroup.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
    return {
      ...group,
      [date]: sortedDateGroup
    };
  }, {});

  // After transaction have been grouped by date we need to ordrer them
  return Object.keys(grouped)
    .reduce(
      (flattened, date) => {
        return [
          ...flattened,
          {
            date,
            transactions: grouped[date]
          }
        ];
      },
      [] as any[]
    )
    .sort((a, b) => {
      return moment(a.date, 'MMMM, D, YYYY').isBefore(moment(b.date, 'MMMM, D, YYYY')) ? 1 : -1;
    });
}
