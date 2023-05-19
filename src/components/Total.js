import React from "react";
import { useSelector } from "react-redux";
function Total() {
  const selectedItems = useSelector((state) => state.counter.selectedItems);

  const totalPrice = selectedItems.reduce((total, item) => {
    const itemPrice = item.fiyat * (item.adet || 0); // item.adet değeri tanımlıysa kullan, değilse 0 olarak kabul et
    return isNaN(itemPrice) ? total : total + itemPrice;
  }, 0);

  return (
    <div className="total">
      <h2>Your Receipt</h2>
      <ul>
        {selectedItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.fiyat} x {item.adet} = $
            {item.fiyat * (item.adet || 0)}
          </li>
        ))}
      </ul>
      <hr />
      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );
}

export default Total;
