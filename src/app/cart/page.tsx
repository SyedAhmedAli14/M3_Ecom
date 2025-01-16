"use client";

import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const removeFromCart = (id: number) => {
    fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(() => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    });
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontSize: "18px",
          color: "#555",
        }}
      >
        Your cart is empty!
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#4a90e2",
          fontSize: "32px",
          marginBottom: "20px",
        }}
      >
        Your Cart
      </h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            marginBottom: "15px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
          }}
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "8px",
              objectFit: "cover",
              marginRight: "15px",
            }}
          />
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                color: "#333",
                margin: "0 0 5px",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#777",
                margin: "0 0 5px",
              }}
            >
              ${item.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              backgroundColor: "#ff4d4f",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "18px",
          color: "#333",
        }}
      >
        <button
          style={{
            backgroundColor: "#4a90e2",
            color: "#fff",
            padding: "15px 30px",
            fontSize: "18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
