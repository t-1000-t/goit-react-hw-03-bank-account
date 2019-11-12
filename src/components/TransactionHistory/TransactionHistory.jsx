import React from 'react';
import T from 'prop-types';
import shortid from 'shortid';
import styles from './TransactionHistory.module.css';

const history = [styles.history];

const ids = {
  id: shortid.generate(),
};

const TransactionHistory = ({ items }) => (
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
        <tr key={ids.id}>
          <td>{item.type}</td>
          <td>{item.amount}$</td>
          <td>{item.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  items: T.arrayOf(
    T.shape({
      type: T.string.isRequired,
      amount: T.number.isRequired,
      date: T.number.isRequired,
    }),
  ),
};

export default TransactionHistory;
