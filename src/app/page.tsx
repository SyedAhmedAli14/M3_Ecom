"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} className="card">
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <Link href={`/products/${product.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}