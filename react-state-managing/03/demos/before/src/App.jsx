import React, {useState, useEffect} from "react";
import "./App.css";
import { getProducts } from "./services/productService"; 
import Footer from "./Footer";
import Header from "./Header";

export default function App() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    getProducts("shoes").then((response)=> setProducts(response)).catch((e) => setError(e));
  }, []);


  function renderProducts(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size? products.filter((p) => p.skus.find((s) => s.size === parseInt(size))) : products;

  if(error) throw error;

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          <section id="products">
            {filteredProducts.map(renderProducts)}


          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
