import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 100000000000,
    items: [
      {
        id: 1,
        fiyat: 2,
        name: "Big Mac",
        image: "https://neal.fun/spend/images/big-mac.jpg",
      },
      {
        id: 2,
        fiyat: 3,
        name: "Flip Flops",
        image: "https://neal.fun/spend/images/flip-flops.jpg",
      },
      {
        id: 3,
        fiyat: 5,
        name: "Coca-Cola",
        image: "https://neal.fun/spend/images/coca-cola-pack.jpg",
      },
      {
        id: 4,
        fiyat: 12,
        name: "Movie Ticket",
        image: "https://neal.fun/spend/images/movie-ticket.jpg",
      },
      {
        id: 5,
        fiyat: 15,
        name: "Book",
        image: "https://neal.fun/spend/images/book.jpg",
      },
      {
        id: 6,
        fiyat: 45,
        name: "Lobster Dinner",
        image: "https://neal.fun/spend/images/lobster-dinner.jpg",
      },
    ],
    selectedItems: [],
  },
  reducers: {
    increment: (state, action) => {
      const { index } = action.payload;
      if (index >= 0 && index < state.items.length) {
        const item = state.items[index];
        state.value += item.fiyat;
      }
    },
    decrement: (state, action) => {
      const { index } = action.payload;
      if (index >= 0 && index < state.items.length) {
        const item = state.items[index];
        state.value -= item.fiyat;
      }
    },
    selectItem: (state, action) => {
      const { item } = action.payload;
      const existingIndex = state.selectedItems.findIndex(
        (selectedItem) => selectedItem.name === item.name
      );

      if (existingIndex !== -1) {
        state.selectedItems[existingIndex].adet += 1; // Adet değerini 1 artır
      } else {
        const newItem = { ...item, adet: 1 }; // Yeni öğeye adet özelliğini ekle
        state.selectedItems.push(newItem);
      }
    },

    deselectItem: (state, action) => {
      const { item } = action.payload;
      const existingIndex = state.selectedItems.findIndex(
        (selectedItem) => selectedItem.name === item.name
      );

      if (existingIndex !== -1) {
        if (state.selectedItems[existingIndex].adet > 1) {
          state.selectedItems[existingIndex].adet -= 1; // Adet değerini 1 azalt
        } else {
          state.selectedItems.splice(existingIndex, 1); // Öğeyi tamamen kaldır
        }
      }
    },
  },
});

export const { increment, decrement, selectItem, deselectItem } =
  counterSlice.actions;
export default counterSlice.reducer;
