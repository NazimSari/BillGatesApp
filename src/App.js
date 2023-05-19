import "./App.css";
import Card from "./components/Card";
import Counter from "./components/Counter";
import Header from "./components/Header";
import Total from "./components/Total";

function App() {
  return (
    <div className="App">
      <Header />
      <Counter />
      <Card />
      <Total />
    </div>
  );
}

export default App;
