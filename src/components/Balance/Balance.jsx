import React from 'react';
import styles from './Balance.module.css';

const balances = [styles.balance];

const Balance = ({ balance, income, expenses }) => (
  <section className={balances}>
    <span role="img" aria-label="high">
      ⬆️ {Number(income).toFixed(2)}$
    </span>
    <span role="img" aria-label="low">
      ⬇️ {Number(expenses).toFixed(2)}$
    </span>
    <span role="img" aria-label="balance">
      Balance: {Number(balance).toFixed(2)}$
    </span>
  </section>
);

export default Balance;
