import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Syed Ahmed.",
  description: "A basic e-commerce site built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            backgroundColor: "#0077b6",
            color: "white",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>Syed Ahmed.</h1>

          {/* Cart Icon */}
          <Link href="/cart">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {/* Cart Icon (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{
                  width: "30px",
                  height: "30px",
                  color: "white",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l3 9h10l3-9h2M6 9h12l3 9H3l3-9zm0 0L3 3m18 6L21 3"
                />
              </svg>
            </div>
          </Link>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
