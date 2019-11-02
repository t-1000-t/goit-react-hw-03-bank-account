import React from 'react';
import T from 'prop-types';
import styles from './Controls.module.css';

const controls = [styles.controls];

const Controls = ({
  inputRef,
  onDeposit,
  onWithdraw,
  onSubmit,
  onChange,
  amount,
}) => {
  return (
    <section className={controls}>
      <form className="Form" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="number"
          name="amount"
          min="0"
          onChange={onChange}
          value={amount}
          placeholder="0"
        />
        <button name="Deposit" type="button" onClick={onDeposit}>
          Deposit
        </button>
        <button name="Withdraw" type="button" onClick={onWithdraw}>
          Withdraw
        </button>
      </form>
    </section>
  );
};

Controls.propTypes = {
  onDeposit: T.string.isRequired,
  onWithdraw: T.func.isRequired,
  onSubmit: T.func.isRequired,
  onChange: T.func.isRequired,
  amount: T.number,
  inputRef: T.func.isRequired,
};

export default Controls;
