import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  selectItem,
  deselectItem,
} from "../redux/counter/counterSlice";
function Card() {
  const items = useSelector((state) => state.counter.items);
  const value = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();
  const [sellButtonStyles, setSellButtonStyles] = useState(
    items.map(() => ({ backgroundColor: "#f1f2f6" }))
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleBuy = (index, fiyat) => {
    if (value >= fiyat) {
      dispatch(decrement({ index, fiyat }));
      dispatch(selectItem({ item: items[index] }));

      const inputElement = document.getElementById(`input-${index}`);
      inputElement.value = parseInt(inputElement.value) + 1;

      const newStyles = [...sellButtonStyles];
      newStyles[index] = {
        background: "linear-gradient(180deg, #f53b82, #f53b57)",
        color: "white",
      };
      setSellButtonStyles(newStyles);
      const selected = {
        name: items[index].name,
        fiyat,
        adet: parseInt(inputElement.value) + 1,
      };
      setSelectedItem(selected);
    }
  };

  const handleSell = (index, fiyat, item) => {
    const decrementValue = Math.min(fiyat, value);
    if (decrementValue > 0 && value !== 100000000000) {
      dispatch(increment({ index, fiyat }));
      dispatch(deselectItem({ item }));

      const inputElement = document.getElementById(`input-${index}`);
      inputElement.value = parseInt(inputElement.value) - 1;
      if (inputElement.value < 0) {
        inputElement.value = 0;
      }

      if (parseInt(inputElement.value) === 0) {
        const newStyles = [...sellButtonStyles];
        newStyles[index] = { backgroundColor: "#f1f2f6" };
        setSellButtonStyles(newStyles);
      }
      setSelectedItem(null);
      const updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem.name !== item.name
      );
      setSelectedItems(updatedItems);
    }
  };
  return (
    <div className="items">
      {items.map((item, index) => (
        <div className="item-wrapper" key={item.name}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <h4>${item.fiyat}</h4>
          <div className="shop">
            <button
              className="sell"
              style={sellButtonStyles[index]}
              onClick={() => handleSell(index, item.fiyat, item)}
            >
              Sell
            </button>
            <input id={`input-${index}`} defaultValue="0" readOnly />
            <button
              className="buy"
              onClick={() => handleBuy(index, item.fiyat)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
