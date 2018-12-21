declare namespace LTO {
  export interface Transaction {
    unconfirmed?: boolean;
    sender: string;
    type: number;
    fee: number;

    [key: string]: any;
  }

  export interface Page<T> {
    total: number;
    items: T[];
  }
}
