declare namespace LTO {
  export interface Transaction {
    id: string;
    unconfirmed?: boolean;
    sender: string;
    type: number;
    fee: number;
    /**
     * Lease specific field. We need to keep it here because our endpoint
     * returns all transactions mixed
     */
    status?: 'active' | 'canceled';

    [key: string]: any;
  }

  export interface Page<T> {
    total: number;
    items: T[];
  }
}
