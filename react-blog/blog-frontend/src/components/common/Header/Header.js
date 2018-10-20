import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Header = () => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <Link to="/">reactblog</Link>
    </div>
    <div className={cx('right')}>
      <Button theme="outline" to="/editor">새 포스트</Button>
    </div>
  </header>
  /** <Header>
   *  <header> 를 주의할 것!!!!!!!!!!!
   */
);

export default Header;