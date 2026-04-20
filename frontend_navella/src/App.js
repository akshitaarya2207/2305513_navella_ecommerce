import React, { useEffect, useState } from "react";
import Login from "./Login";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
const getImage = (category) => {
  const c = category.toLowerCase();

  if (c === "casual")
    return "[images.pexels.com](https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg)";

  if (c === "partywear")
    return "[images.pexels.com](https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg)";

  if (c === "formal")
    return "[images.pexels.com](https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg)";

  if (c === "sportswear")
    return "[images.pexels.com](https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg)";

  return "[images.pexels.com](https://images.pexels.com/photos/19090/pexels-photo.jpg)";
};
const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user"))
);
const cardStyle = {
  padding: "30px",
  borderRadius: "20px",
  background: "#f9f5f1",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  cursor: "pointer",
  fontWeight: "bold"
};

  // LOAD PRODUCTS
  const loadProducts = () => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ADD PRODUCT
  const addProduct = () => {
    if (!name || !price || !category) {
  alert("All fields are required");
  return;
}
  const method = editId ? "PUT" : "POST";
  const url = editId
    ? `http://localhost:8080/products/${editId}`
    : "http://localhost:8080/products";

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      price: Number(price),
      category,
      subCategory: "test",
      tag: "test",
      imageUrl: imageUrl
    })
    
  }).then(() => {
    setName("");
    setPrice("");
    setCategory("");
    setEditId(null); // reset edit mode
    loadProducts();
    setImageUrl("");
  });
};

  // DELETE PRODUCT
  const deleteProduct = (id) => {

  if (!window.confirm("Delete this product?")) return;

  fetch(`http://localhost:8080/products/${id}`, {
    method: "DELETE"
  }).then(() => loadProducts());
};
const [cart, setCart] = useState({});
const addToCart = (product) => {
  setCart((prev) => ({
    ...prev,
    [product.id]: (prev[product.id] || 0) + 1
  }));
};
const removeFromCart = (product) => {
  setCart((prev) => {
    const qty = prev[product.id] || 0;

    if (qty <= 1) {
      const newCart = { ...prev };
      delete newCart[product.id];
      return newCart;
    }

    return {
      ...prev,
      [product.id]: qty - 1
    };
  });
};

const handleCheckout = () => {
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty!");
    return;
  }

  setShowSuccess(true);   // 👈 show popup
  setCart({});
  setShowCart(false);
  setTimeout(() => setShowSuccess(false), 2000);
};


  if (!user) {
  return <Login setUser={setUser} />;
}
 const filtered = products
      .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) =>
        filterCategory === "" || p.category === filterCategory
      );
return (
  <div style={{
    background: "#fff5f5",
    minHeight: "100vh",
    padding: "20px"
  }}>

    <div style={{ textAlign: "center", marginBottom: "25px" }}>
       {/* LEFT: LOGO */}
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <img src="https://i.ibb.co/9mhYyNwV/Screenshot-2026-04-19-185431.png" alt="logo" style={{ width: "100px" }} />
    <h1 style={{ margin: 0 }}>Navella</h1>
  </div>
      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}
      onMouseOver={(e) => e.target.style.color = "#b85a72"}
onMouseOut={(e) => e.target.style.color = "black"}>
  <span style={{ fontSize: "20px", fontWeight: "Bold",fontFamily: "'Poppins', sans-serif", cursor: "pointer" }}
  onMouseOver={(e) => e.target.style.color = "#b85a72"}
onMouseOut={(e) => e.target.style.color = "black"}>Home</span>
<span style={{ fontSize: "20px", fontWeight: "Bold",fontFamily: "'Poppins', sans-serif", cursor: "pointer" }}
onMouseOver={(e) => e.target.style.color = "#b85a72"}
onMouseOut={(e) => e.target.style.color = "black"}>Contact</span>
<span style={{ fontSize: "20px", fontWeight: "Bold",fontFamily: "'Poppins', sans-serif", cursor: "pointer" }}
onMouseOver={(e) => e.target.style.color = "#b85a72"}
onMouseOut={(e) => e.target.style.color = "black"}>Profile</span>
<span
onClick={() => setShowCart(true)}
style={{fontSize: "20px",fontWeight: "bold",fontFamily: "'Poppins', sans-serif",cursor: "pointer",color: "black"}}
onMouseOver={(e) => (e.currentTarget.style.color = "#b85a72")}
onMouseOut={(e) => (e.currentTarget.style.color = "black")}
>Cart ({Object.values(cart).reduce((a, b) => a + b, 0)})
</span>

    <button
      onClick={() => {
        setUser(null);
        localStorage.removeItem("user");
      }}
      style={{
        fontSize:"20px",
        fontWeight:"Bold",
        padding: "8px 16px",
        borderRadius: "20px",
        border: "none",
        background: "#e8cfcf",
        fontFamily: "'Poppins', sans-serif",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  </div>


      <p style={{
        fontSize: "30px",
        fontWeight: "600",
        fontStyle:"Calibri-Bold",
        color: "#332727"
      }}>
        Your Fashion, Organised ✨
      </p>
    </div>

    <div style={{
      maxWidth: "900px",
      margin: "0 auto 25px auto",
      background: "#ffffff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
      border: "1px solid #ffd6d2"
    }}>

      <div style={{ textAlign: "center" }}>
        <input
          placeholder="Search: dress, shoes, shorts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ffd6d2",
            backgroundColor: "#fff",
            fontFamily: "'Bookman Old Style', Georgia, serif",
            fontWeight: "bold",
            fontSize: "15px",
            color: "#545353"
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ffd6d2",
            backgroundColor: "#fff",
            fontFamily: "'Bookman Old Style', Georgia, serif",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          <option value="">All Categories</option>
          <option value="Partywear">Partywear</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Sportswear">Sportswear</option>
        </select>
      </div>
    </div>

   
    <div style={{ textAlign: "center", marginBottom: "25px" }}>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #ffd6d2",
          backgroundColor: "#fff",
          fontFamily: "'Bookman Old Style', Georgia, serif",
          fontWeight: "bold",
          fontSize: "15px"
        }}
      >
        <option value="">No Sorting</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>

   
    <div style={{
      maxWidth: "900px",
      margin: "0 auto 30px auto",
      background: "#ffffff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
      border: "1px solid #ffd6d2",
      textAlign: "center"
    }}>
     <div style={{  padding: "10px",
    textAlign: "center",
    borderRadius: "10px",
    border: "1px solid #ffd6d2",
    backgroundColor: "#f8e6e6",
    fontFamily: "'Calibri Bold', Georgia, serif", 
    fontWeight: "bold",
    fontSize: "14px",
    color: "#444",
    boxShadow: "0 2px 6px rgba(255, 182, 193, 0.2)",
    cursor: "pointer" }}>
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px",
    textAlign: "center",
    borderRadius: "10px",
    border: "1px solid #3d2725",
    backgroundColor: "#fff",
    fontFamily: "'Calibri Bold', Georgia, serif",  // 👈 FONT HERE
    fontWeight: "bold",
    fontSize: "14px",
    color: "#444",
    boxShadow: "0 2px 6px rgba(255, 182, 193, 0.2)",
    cursor: "pointer"}}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: "10px",
    textAlign: "center",
    borderRadius: "10px",
    border: "1px solid #3d2725",
    backgroundColor: "#fff",
    fontFamily: "'Calibri Bold', Georgia, serif",  
    fontWeight: "bold",
    fontSize: "14px",
    color: "#262525",
    boxShadow: "0 2px 6px rgba(255, 182, 193, 0.2)",
    cursor: "pointer" }}
      />
      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{padding: "10px",
    textAlign: "center",
    borderRadius: "10px",
    border: "1px solid #3d2725",
    backgroundColor: "#fff",
    fontFamily: "'Calibri Bold', Georgia, serif",  // 👈 FONT HERE
    fontWeight: "bold",
    fontSize: "14px",
    color: "#262525",
    boxShadow: "0 2px 6px rgba(255, 182, 193, 0.2)",
    cursor: "pointer" }}
>
  <option value="">Select Category</option>
  <option value="Partywear">Partywear</option>
  <option value="Casual">Casual</option>
  <option value="Formal">Formal</option>
  <option value="Sportswear">Sportswear</option>
</select>
<input
  placeholder="Image URL"
  value={imageUrl}
  onChange={(e) => setImageUrl(e.target.value)}
  style={{
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ffd6d2",
    margin: "6px",
    backgroundColor: "#fff"
  }}
/>
{imageUrl && (
  <img
    src={imageUrl}
    alt="preview"
    style={{
      width: "120px",
      height: "120px",
      objectFit: "cover",
      borderRadius: "10px",
      marginTop: "10px"
    }}
  />
)}
      <button
        onClick={addProduct}
        style={{
          padding: "8px 15px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Add
      </button>
    </div>
    </div>

{/* PRODUCT GRID */}
{/* SHOP BY CATEGORY */}
<h2 style={{ marginTop: "40px", textAlign: "center" }}>
  Shop by Category
</h2>

<div
  style={{
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
    flexWrap: "wrap"
  }}
>
  <div style={cardStyle} onClick={() => setFilterCategory("Partywear")}>
    👗 Dresses
  </div>

  <div style={cardStyle} onClick={() => setFilterCategory("Casual")}>
    👟 Footwear
  </div>

  <div style={cardStyle} onClick={() => setFilterCategory("Formal")}>
    🧥 Jackets
  </div>

  <div style={cardStyle} onClick={() => setFilterCategory("Sportswear")}>
    🏃 Sportswear
  </div>
</div>

<div
  style={{
    display: "flex",
    border: "1px solid #ffe0dc",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center"
  }}
>
    {filtered.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No products found
        </p>
      ) : (
        filtered
          .sort((a, b) => {
            if (sortOrder === "low") return a.price - b.price;
            if (sortOrder === "high") return b.price - a.price;
            return 0;
          })
          .map((p) => (
            <div
              key={p.id}
              style={{
                width: "260px",
                borderRadius: "18px",
                background: "#fff",
                boxShadow: "0 8px 20px rgba(255, 182, 193, 0.25)",
                border: "1px solid #ffd6d2",
                padding: "12px",
                transition: "0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={
                  p.imageUrl && p.imageUrl.trim() !== ""
                    ? p.imageUrl
                    : getImage(p.category)
                }
                alt={p.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  marginBottom: "10px"
                }}
              />

              <h3 style={{ margin: "6px 0", color: "#262525" }}>
                {p.name}
              </h3>

              <p style={{ fontSize: "13px", color: "#262525" }}>
                Price
              </p>

              <p style={{ fontWeight: "bold", color: "#4c0b05" }}>
                ₹{p.price}
              </p>

              <p
                style={{
                  fontSize: "12px",
                  color: "#4b211e",
                  background: "#ffeaea",
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "10px",
                  marginBottom: "10px"
                }}
              >
                {p.category}
              </p>

              <button
                onClick={() => deleteProduct(p.id)}
                onMouseEnter={(e) => {
                e.target.style.background = "#ff3b2f";
                e.target.style.transform = "scale(1.08)";
               }}
               onMouseLeave={(e) => {
               e.target.style.background = "#ff6f61";
               e.target.style.transform = "scale(1)";
               }}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "12px",
                  border: "none",
                  marginBottom: "8px",
                  background: "#ff6f61",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>

              <button
              onClick={() => {
                setName(p.name);
                setPrice(p.price);
                setCategory(p.category);
                setImageUrl(p.imageUrl || "");
                setEditId(p.id);
              }}
               onMouseEnter={(e) => {
    e.target.style.background = "#4a6cff";
    e.target.style.transform = "scale(1.08)";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "#6f8cff";
    e.target.style.transform = "scale(1)";
  }}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#6f8cff",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              >
                Edit
                </button>


            {cart[p.id] ? (
            <div
            style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "6px"
            }}
  >
    <button
      onClick={() => removeFromCart(p)}
      style={{
        padding: "5px 12px",
        borderRadius: "8px",
        border: "none",
        background: "#ff6f61",
        color: "white",
        cursor: "pointer"
      }}
    >
      -
    </button>

    <span style={{ fontWeight: "bold" }}>
      {cart[p.id]}
    </span>

    <button
      onClick={() => addToCart(p)}
      style={{
        padding: "5px 12px",
        borderRadius: "8px",
        border: "none",
        background: "#4caf50",
        color: "white",
        cursor: "pointer"
      }}
    >
      +
    </button>
  </div>
) : (
  <button
    onClick={() => addToCart(p)}
    onMouseEnter={(e) => {
    e.target.style.background = "#3d8b40";
    e.target.style.transform = "scale(1.08)";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "#4caf50";
    e.target.style.transform = "scale(1)";
  }}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "12px",
      border: "none",
      marginTop: "6px",
      background: "#4caf50",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    Add to Cart
  </button>
)}
            </div>
          ))
      )}
</div>

  <div
    style={{
      marginTop: "50px",
      padding: "30px",
      background: "#b58a72",
      color: "white",
      textAlign: "center",
      borderRadius: "20px"
    }}
  >
    <div>
      <p>Home | Contact | Cart | Wishlist | Orders</p>
      <p style={{ marginTop: "20px" }}>© 2026 Navella</p>
      <h2 style={{ marginTop: "40px" }}>Trending Now</h2>
    </div>
  </div>
  {showCart && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "400px",
        maxHeight: "80vh",
        overflowY: "auto"
      }}
    >
      <h2>🛒 Your Cart</h2>

      {Object.keys(cart).length === 0 ? (
        <p>No items in cart</p>
      ) : (
        Object.keys(cart).map((id) => {
          const product = products.find(p => p.id === Number(id));
          return (
            <div
              key={id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px"
              }}
            >
              <span>{product?.name}</span>
              <span>x{cart[id]}</span>

              <button onClick={() => removeFromCart(product)}>
                Remove
              </button>
            </div>
          );
        })
      )}

      <hr />

      <p>
        Total: ₹
        {Object.keys(cart).reduce((total, id) => {
          const product = products.find(p => p.id === Number(id));
          return total + (product?.price || 0) * cart[id];
        }, 0)}
      </p>

      <button
  onClick={handleCheckout}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Checkout
</button>

      <button
        onClick={() => setShowCart(false)}
        style={{
          marginTop: "10px",
          padding: "8px 15px",
          background: "#ff6f61",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
{showSuccess && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        textAlign: "center",
        width: "350px"
      }}
    >
      <h2 style={{ color: "#4caf50" }}>🎉 Order Placed!</h2>

      <p style={{ marginTop: "10px" }}>
        Your order has been placed successfully.
      </p>

      <button
        onClick={() => setShowSuccess(false)}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        OK
      </button>
    </div>
  </div>
)}
</div>
);
}

export default App;
