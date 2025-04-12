import { Injectable, Inject } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ADDRESS_VALIDATOR } from '.';
import { IBalance } from './wallet.service';

/**
 * Service to the creation of a new transaction
 */
@Injectable({ providedIn: 'root' })
export class MakeTransactionService {

    sendForm: UntypedFormGroup | null = null;
    maxTransactionValue: any;
    minTransactionValue: any;

    balance!: IBalance
    transferFee!: number
    massTransferFee!: number

    transfersCount$ = new Subject<number>();

    constructor (
        @Inject(ADDRESS_VALIDATOR) private _addressValidator: ValidatorFn
        ) {
        }

    /**
     * Build a new form
     * @param balance user balance
     * @param transferFee fee for a transfer
     * @param massTransferFee additionnal fee for each recipient in a mass transaction
     */
    initForm (balance: IBalance, transferFee: number, massTransferFee: number) {
        this.balance = balance;
        this.transferFee = transferFee;
        this.massTransferFee = massTransferFee;

        this.maxTransactionValue = balance.available / balance.amountDivider;
        this.minTransactionValue = 1 / balance.amountDivider;

        this.sendForm = new UntypedFormGroup({
            transfers: new UntypedFormArray([this.getTransferControl()]),
            attachment: new UntypedFormControl('', []),
            fee: new UntypedFormControl({ value: this.fee, disabled: true }, [
                Validators.required,
                Validators.min(this.minTransactionValue),
            ]),
        });

        this.updateFee();

        return this.sendForm;
    }

    addTransfer () {
        this.transfers.push(this.getTransferControl());
        this.updateFee();
        this.updateAmountsValidators();
        this.transfersCount$.next(this.transfers.length);
    }

    delTransfer (position: number) {
        this.transfers.removeAt(position);
        this.updateFee();
        this.updateAmountsValidators();
        this.transfersCount$.next(this.transfers.length);
    }

    /**
     * Build and return a FormGroup for a new transfer
     */
    private getTransferControl () {
        return new UntypedFormGroup({
            recipient: new UntypedFormControl('', [Validators.required, this._addressValidator]),
            amount: new UntypedFormControl(0, this.getAmountValidators()),
        })
    }

    private getAmountValidators (controllerAmount = 0) {
        return [
            Validators.required,
            Validators.min(this.minTransactionValue),
            Validators.max(this.getTransferMaxAmount(controllerAmount)),
        ];
    }

    public getTransferMaxAmount (transferAmount = 0) {
        return Math.max(this.maxTransactionValue - this.totalAmount + transferAmount - this.fee, 0);
    }

    /**
     * Update the transaction fee in the form
     */
    public updateFee () {
        this.sendForm?.get('fee')?.setValue(this.fee);
    }

    /**
     * Retrieve the fee depending of the number of transfers in the form
     */
    get fee () {
        let fee = this.transferFee;
        if (this.transfers?.length > 1) {
            // More than one transfer, using mass transaction
            fee += this.transfers.length * this.massTransferFee;
        }
        return fee / this.balance.amountDivider;
    }

    /**
     * Update all the amount controls' validators
     * Mainly to update the max value
     */
    public updateAmountsValidators () {
        this.transfers.controls.forEach(transfer => {
            let amountControl = (<UntypedFormGroup> transfer).controls.amount;
            amountControl.setValidators(this.getAmountValidators(amountControl.value));
        });
    }

    get transfers () { return <UntypedFormArray> this.sendForm?.get('transfers'); }

    /**
     * Total amount to be sent to all recipients
     */
    get totalAmount () {
        return this.transfers?.controls.reduce(
            (sum, transfer) => sum + transfer.value.amount, 0) ?? 0;
    }
}
