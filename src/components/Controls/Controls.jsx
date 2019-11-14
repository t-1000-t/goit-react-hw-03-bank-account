import React, { Component } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import T from 'prop-types';
import styles from './Controls.module.css';

const controls = [styles.controls];

class Controls extends Component {
  static propTypes = {
    onBalance: T.string.isRequired,
    onDeposit: T.func.isRequired,
    onWithdraw: T.func.isRequired,
  };

  state = {
    amount: '',
  };

  hendleChange = e => {
    this.setState({
      amount: Number(e.currentTarget.value).toFixed(2),
    });
  };

  hendleSubmit = e => {
    e.preventDefault();
    this.setState({
      amount: '',
    });
  };

  reset = () => {
    this.setState({
      amount: '',
    });
  };

  handleBtnDeposit = e => {
    const { amount } = this.state;

    if (Number(amount === '0.00' || amount === '')) {
      toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (Number(amount) > 0) {
      this.props.onDeposit(amount, e);
      this.reset();
    } else {
      toast.error('На счету недостаточно средств для проведения операции!', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  handleBtnWithdraw = e => {
    const { amount } = this.state;
    if (Number(amount) > 0 && Number(amount) <= this.props.onBalance) {
      if (Number(amount) > 0) {
        this.props.onWithdraw(amount, e);
        this.reset();
      }
    } else {
      toast.error('На счету недостаточно средств для проведения операции!', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  render() {
    const { amount } = this.state;

    return (
      <section className={controls}>
        <form id="form" className="Form" onSubmit={this.hendleSubmit}>
          <input
            type="number"
            name="amount"
            min="0.00"
            step="0.01"
            onChange={this.hendleChange}
            value={amount}
            placeholder="введите сумму"
          />
          <button name="Deposit" type="button" onClick={this.handleBtnDeposit}>
            Deposit
          </button>

          <button
            name="Withdraw"
            type="button"
            onClick={this.handleBtnWithdraw}
          >
            Withdraw
          </button>
          <ToastContainer autoClose={2500} transition={Zoom} />
        </form>
      </section>
    );
  }
}

export default Controls;
