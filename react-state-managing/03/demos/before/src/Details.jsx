import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useState } from "react";

export default function Detail(props) {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  const Nav = useNavigate();
  const [sku, setSku] = useState("");

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  // TODO: Display these products details
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>
      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            Nav("/cart");
            props.addToCart(id, sku);
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
