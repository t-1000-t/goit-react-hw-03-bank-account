import React, { Component } from 'react';
import shortid from 'shortid';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Dashboard.module.css';
import newLocStore from '../Service/localStorage';

const dashboard = [styles.dashboard];

class Dashboard extends Component {
  static propTypes = {};

  static defaultProps = {
    balance: '',
  };

  state = {
    balance: '',
    transactions: [],
  };

  componentDidMount() {
    const balance = newLocStore.getStorage('balance');
    const transactions = newLocStore.getStorage('transactions');

    if (balance && transactions) {
      this.setState({ transactions, balance });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;

    if (prevState.transactions !== transactions) {
      newLocStore.saveStorage('transactions', transactions);
    }

    if (prevState.balance !== balance) {
      newLocStore.saveStorage('balance', balance);
    }
  }

  handleBtn = (amount, e) => {
    const note = {
      id: shortid.generate(),
      date: new Date().toLocaleString(),
      amount,
      type: e.currentTarget.name,
    };
    note.type === 'Deposit'
      ? this.setState(state => ({
          transactions: [note, ...state.transactions],
          balance: (Number(state.balance) + Number(amount)).toFixed(2),
        }))
      : this.setState(state => ({
          transactions: [note, ...state.transactions],
          balance: Number(state.balance) - Number(amount),
        }));
  };

  sumType = type => {
    const { transactions } = this.state;
    return transactions
      .filter(e => e.type === type)
      .reduce((acc, e) => Number(acc) + Number(e.amount), 0);
  };

  render() {
    const { transactions, balance } = this.state;
    return (
      <div className={dashboard}>
        <Controls
          onDeposit={this.handleBtn}
          onWithdraw={this.handleBtn}
          onBalance={balance}
        />
        <Balance
          income={this.sumType('Deposit')}
          expenses={this.sumType('Withdraw')}
          balance={balance}
        />
        {transactions.length > 0 && <TransactionHistory items={transactions} />}
      </div>
    );
  }
}

export default Dashboard;
