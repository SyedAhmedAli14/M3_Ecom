"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function ProductDetails({ params }: { params: { product_id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  // Convert useEffect to async function to handle async behavior of params
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${params.product_id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [params.product_id]); // Dependency array to re-run when product_id changes

  const addToCart = () => {
    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: product?.id,
        title: product?.title,
        price: product?.price,
        thumbnail: product?.thumbnail,
      }),
    }).then(() => router.push("/cart"));
  };

  if (!product) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <img
        src={product.thumbnail}
        alt={product.title}
      />
      <p>{product.description}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
