import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link, Outlet } from 'react-router-dom';

export default function Navbar({ cartCount ,connectWallet, account}) {

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="opensea-logo-container">
            AMAZON3
          </Link>
          <div className="opensea-text-container"></div>
        </div>
        <div className="middle-section">
          <div className="middle-left">
            <div className="drops">
              Drops
              <div className="drops-op">
                <div>Featured</div>
                <div>Learn More</div>
              </div>
            </div>
            <div className="stats">
              Stats
              <div className="stats-op">
                <div>Rankings</div>
                <div>Activity</div>
              </div>
            </div>
            <div className="create">Create</div>
          </div>
          <div className="middle-right">
            <input className="search-box" placeholder="Search" />
            <div>/</div>
          </div>
        </div>
        <div className="right-section">




        <div className="wallet-container">
            <button 
            className="login-button Sign-Out"
            onClick = {connectWallet}
            >
              Wallet
            </button>

            <h3>{account && <div>Connected as: {account}</div>}</h3>
            

          </div>

          




          <div className="profile-container">Profile</div>
          <div className="cart-container">
            <Link to="/cart" className="cart-text">
              Cart
            </Link>
            <div className="cart-number">{cartCount}</div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
