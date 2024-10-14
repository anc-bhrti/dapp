import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function Cart({cart,setCart}) {


  const removeClick = (k) => {
    const newCart = [];
    for(let i=0;i<cart.length;i++){
        if(i === k)continue;
        newCart.push(cart[i]);
    }
    setCart(newCart);
  }

  const checkClick =(index) => {
     console.log(index);
  }


const cartBox = () => {
return  cart.map((item,index) => {
    return (
        <div key={index} className="notablecollections-nft md1">
      <div className="image-container">
        <img alt="pro" src='https://picsum.photos/300/150'/>
      </div>
      <div className="nft-description">
         <p className="FIFA">{item[0].name} </p>                
        <div className="nft-stats">
          <div className="nft-floor" >
            <p className="Floor">Remove</p>
            <p className="MATIC"><button className="after-css" style={{backgroundColor: "red",marginTop: "2px"}} onClick={() => removeClick(index)}>Remove</button></p>
          </div>
          <div className="nft-volume ">
            <p className="Total-Volume">
              Buy Now
            </p>
            <p className="ETH">
               <button className="after-css">Checkout</button>
            </p>
          </div>
        </div>           
      </div>
      <button  className="addbuttonhome js-add-1">{item[0].price} ETH</button>
    </div>
    )
     })
}


useEffect(() => {
   cartBox();
},[cart.length])
  return (
    <div>
      <h1 className="check">PLease check once before Checkout</h1>
       <div className="order-details"><Link className="order-details-link" to={'/order'}>Go to Checkout Page</Link></div>
       {cartBox()}
    </div>
  )
}
