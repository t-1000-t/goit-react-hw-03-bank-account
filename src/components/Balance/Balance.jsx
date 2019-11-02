import React from 'react';
import T from 'prop-types';
import styles from './Balance.module.css';

const balances = [styles.balance];

const Balance = ({ balance, income, expenses }) => {
  return (
    <section className={balances}>
      <span role="img" aria-label="high">
        ⬆️ {income}
      </span>
      <span role="img" aria-label="low">
        ⬇️ {expenses}
      </span>
      <span role="img" aria-label="balance">
        Balance: {balance}
      </span>
    </section>
  );
};

Balance.propTypes = {
  balance: T.string.isRequired,
  income: T.string.isRequired,
  expenses: T.string.isRequired,
};

export default Balance;
