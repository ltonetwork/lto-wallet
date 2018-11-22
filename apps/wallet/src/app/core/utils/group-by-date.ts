import * as moment from 'moment';

/**
 * Groups transactions by same date
 * @param transactions - array of transactions
 */
export function groupByDate(transactions: any[]): any[] {
  const grouped = transactions.reduce((group, transaction) => {
    const date = moment(transaction.timestamp).format('MMMM, D, YYYY');
    const dateGroup = group[date] || [];
    dateGroup.push(transaction);
    return {
      ...group,
      [date]: dateGroup
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
