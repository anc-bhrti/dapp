import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import NotFound from './components/NotFound.jsx';
import ProductsAll from './components/productsAll.jsx';
import Cart from './components/cart.jsx';
import Order from './components/order.jsx';
import Navbar from './components/Navbar.jsx';
import { contractAddress, contractAbi } from './Constant/constant.js';
function App() {
  const [cart, setCart] = useState([]);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    alert('Welcome to Amazon3!');
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && accounts[0] !== account) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectedToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);

        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        setContract(contractInstance);

        console.log('Metamask Connected : ' + address);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('MetaMask is not detected in the browser.');
    }
  }

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Navbar cartCount={cart.length} connectWallet={connectedToMetamask} account={account} />}
      >
        <Route
          exact
          path="/"
          element={<ProductsAll cart={cart} setCart={setCart} contract={contract} provider={provider} account={account}/>}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/order" element={<Order contract={contract} />} />
        <Route exact path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
