import { NextResponse } from "next/server";

let cart: any[] = []; // In-memory cart (use a database for production apps)

export async function GET() {
  return NextResponse.json(cart);
}

export async function POST(req: Request) {
  const item = await req.json();
  cart.push(item);
  return NextResponse.json({ message: "Item added to cart", cart });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  cart = cart.filter((item) => item.id !== id);
  return NextResponse.json({ message: "Item removed from cart", cart });
}