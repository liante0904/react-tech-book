import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './App.scss';
import Button from './components/Button';
import StyledButton from './components/StyledButton';
const cx = classNames.bind(styles);

class App extends Component {
  render() {
    const isBlue = true;

    return (
      /*
      <div className={cx('box', {
        blue: isBlue
      })}>
        <div className={cx('box-inside')}/>
      </div>
      */
        <StyledButton big>버튼</StyledButton>
    );
  }
}

export default App;