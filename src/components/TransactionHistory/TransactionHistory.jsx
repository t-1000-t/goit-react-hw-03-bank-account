import React from 'react';
import T from 'prop-types';
import styles from './TransactionHistory.module.css';

const history = [styles.history];

const TransactionHistory = ({ items }) => {
  return (
    <table className={history}>
      <thead>
        <tr>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr>
            <td>{item.transactionType}</td>
            <td>{item.amount}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TransactionHistory.propTypes = {
  items: T.arrayOf(
    T.shape({
      transactionType: T.string.isRequired,
      amount: T.number.isRequired,
      date: T.number.isRequired,
    }),
  ),
};

export default TransactionHistory;
