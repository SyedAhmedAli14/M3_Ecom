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

export default function ProductDetails({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const resolvedParams = await params;
      const res = await fetch(`https://dummyjson.com/products/${resolvedParams.product_id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [params]);

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
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.title}</h2>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
