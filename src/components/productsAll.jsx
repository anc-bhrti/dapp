import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './productsAll.module.css';

function ProductsAll({ cart, setCart, contract, provider, account }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      if (contract) {
        try {
          const productIds = [1, 2, 3, 4, 5, 6, 7]; 
          const productPromises = productIds.map(async (id) => {
            const item = await contract.items(id);
            return {
              id: item.id.toNumber(),
              name: item.name,
              category: item.category,
              image: item.image,
              cost: ethers.utils.formatEther(item.cost),
              rating: item.rating.toNumber(),
              stock: item.stock.toNumber(),
            };
          });

          const productsList = await Promise.all(productPromises);
          setProducts(productsList);
        } catch (err) {
          console.error('Failed to fetch products:', err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchProducts();
  }, [contract]);

  async function buyProduct(id) {
    if (!contract || !provider || !account) {
      console.error('Contract, provider, or account not available');
      return;
    }

    try {
      const item = await contract.items(id);
      const itemCost = ethers.utils.parseEther(item.cost.toString()); // Ensure the cost is in Wei

      // Check wallet balance
      const balance = await provider.getBalance(account);
      const gasEstimate = await contract.estimateGas.buy(id, { value: itemCost });
      const gasPrice = await provider.getGasPrice();
      const totalCost = itemCost.add(gasEstimate.mul(gasPrice));

      if (balance.lt(totalCost)) {
        throw new Error('Insufficient funds to cover transaction and gas fees');
      }

      // Proceed with the transaction
      const tx = await contract.buy(id, { value: itemCost, gasLimit: gasEstimate });
      await tx.wait(); // Wait for the transaction to be mined

      console.log('Product bought successfully');
      // Update the cart or state after successful purchase
      setCart([...cart, id]); // Example: add product ID to cart

    } catch (err) {
      console.error('Failed to buy product:', err);
      setError('Transaction failed. Please check your funds and try again.');
    }
  }

  return (
    <div>
      <h1>Products</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <h2>{product.name}</h2>
              <img src={product.image} alt={product.name} width="200" />
              <p>Category: {product.category}</p>
              <p>Cost: {product.cost} ETH</p>
              <p>Rating: {product.rating}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => buyProduct(product.id)}>Buy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsAll;
