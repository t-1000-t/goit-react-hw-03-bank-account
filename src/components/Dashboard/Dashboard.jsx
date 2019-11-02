import React, { Component, createRef } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Dashboard.module.css';

const dashboard = [styles.dashboard];

class Dashboard extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    amount: '0',
    balance: '0',
    transactions: [],
    income: '0',
    expenses: '0',
  };

  inputRef = createRef();

  componentDidMount() {
    const conserveTransaction = localStorage.getItem('transactions');
    const conserveBalance = localStorage.getItem('balance');
    const conserveIncome = localStorage.getItem('income');
    const conserveExpenses = localStorage.getItem('expenses');

    if (conserveTransaction) {
      this.setState({
        transactions: JSON.parse(conserveTransaction),
        balance: JSON.parse(conserveBalance),
        income: JSON.parse(conserveIncome),
        expenses: JSON.parse(conserveExpenses),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance, income, expenses } = this.state;

    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('balance', JSON.stringify(balance));
      localStorage.setItem('income', JSON.stringify(income));
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }

  saveNote = (amount, transactionType) => {
    const note = {
      id: shortid.generate(),
      date: new Date().toLocaleString(),
      amount,
      transactionType,
    };

    this.setState(state => ({
      transactions: [...state.transactions, note],
    }));
  };

  getSumDeposit = transactions => {
    const { amount } = this.state;
    const result = [
      ...transactions.filter(e => e.transactionType === 'Deposit'),
    ].reduce((acc, e) => {
      return Number(acc) + Number(e.amount);
    }, Number(amount));
    this.setState({
      income: result,
    });
  };

  getSumWithdraw = transactions => {
    const { amount } = this.state;
    const result = [
      ...transactions.filter(e => e.transactionType === 'Withdraw'),
    ].reduce((acc, e) => {
      return Number(acc) + Number(e.amount);
    }, Number(amount));
    console.log(result);
    this.setState({
      expenses: result,
    });
  };

  hendleChange = e => {
    if (e.currentTarget.value.match(/^\d+$/, '')) {
      this.setState({
        amount: e.currentTarget.value,
      });
    }
  };

  hendleSubmit = e => {
    e.preventDefault();
    this.reset();
  };

  reset = () => {
    this.setState({
      amount: '0',
    });
  };

  hendleButtonWithdraw = e => {
    const { amount, balance, transactions } = this.state;
    if (amount === '0') {
      toast.error('Введите сумму для проведения операции!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    const transactionType = e.currentTarget.name;
    if (Number(amount) > Number(balance) && Number(balance) !== 0) {
      toast.error('На счету недостаточно средств для проведения операции!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    this.setState({
      balance: Number(balance) - Number(amount),
    });
    this.saveNote(amount, transactionType);
    this.getSumWithdraw(transactions);
  };

  hendleButtonDeposit = e => {
    const { amount, balance, transactions } = this.state;
    if (amount === '0') {
      toast.error('Введите сумму для проведения операции!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    const transactionType = e.currentTarget.name;
    this.saveNote(amount, transactionType);
    if (Number(amount) > 0) {
      this.setState({
        balance: Number(balance) + Number(amount),
      });
    }
    this.getSumDeposit(transactions);
  };

  render() {
    const { balance, transactions, amount, expenses, income } = this.state;

    return (
      <div className={dashboard}>
        <Controls
          onDeposit={this.hendleButtonDeposit}
          onWithdraw={this.hendleButtonWithdraw}
          onSubmit={this.hendleSubmit}
          onChange={this.hendleChange}
          numValueInput={amount}
          inputRef={this.inputRef}
        />
        <Balance balance={balance} expenses={expenses} income={income} />
        <TransactionHistory items={transactions} />
        <ToastContainer autoClose={2500} transition={Zoom} />
      </div>
    );
  }
}

export default Dashboard;
