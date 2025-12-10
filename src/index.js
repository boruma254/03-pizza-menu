import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { pizzaData, customerDatabase, orderStatuses } from "./data.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [showOrderHistory, setShowOrderHistory] = React.useState(false);
  const [database, setDatabase] = React.useState(customerDatabase);
  const [showSignUp, setShowSignUp] = React.useState(false);

  const handleLogin = (email, name) => {
    setCurrentUser({ email, name });
    setShowOrderHistory(false);
  };

  const handleSignUp = (email, name, password) => {
    if (database[email]) {
      alert("Email already exists!");
      return false;
    }
    
    const newDatabase = {
      ...database,
      [email]: { password, name, orders: [] },
    };
    setDatabase(newDatabase);
    handleLogin(email, name);
    setShowSignUp(false);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setShowOrderHistory(false);
  };

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total: cart.reduce((sum, pizza) => sum + pizza.price, 0),
      date: new Date().toLocaleString(),
      currentStatus: 0,
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    alert("Order placed successfully! Track your order in the order history.");
  };

  const updateOrderStatus = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId && order.currentStatus < 5
          ? { ...order, currentStatus: order.currentStatus + 1 }
          : order
      )
    );
  };

  return (
    <div className="container">
      <Header
        cartCount={cart.length}
        user={currentUser}
        onLogout={handleLogout}
        onShowOrderHistory={() => setShowOrderHistory(!showOrderHistory)}
        hasOrders={orders.length > 0}
      />

      {!currentUser ? (
        showSignUp ? (
          <SignUpPage
            onSignUp={handleSignUp}
            onToggleSignUp={() => setShowSignUp(false)}
            database={database}
          />
        ) : (
          <LoginPage
            onLogin={handleLogin}
            onToggleSignUp={() => setShowSignUp(true)}
            database={database}
          />
        )
      ) : showOrderHistory ? (
        <OrderHistory orders={orders} updateOrderStatus={updateOrderStatus} />
      ) : (
        <>
          <Menu addToCart={addToCart} />
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onPlaceOrder={placeOrder}
          />
        </>
      )}

      <Footer />
    </div>
  );
}

function Header({ cartCount, user, onLogout, onShowOrderHistory, hasOrders }) {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};

  return (
    <header className="header">
      <div className="header-content">
        <h1 style={style}>Fast React Pizza Co.</h1>
        <div className="header-right">
          {user && (
            <>
              <span className="user-name">Welcome, {user.name}!</span>
              {hasOrders && (
                <button className="order-history-btn" onClick={onShowOrderHistory}>
                  📦 Order History
                </button>
              )}
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </header>
  );
}

function Menu({ addToCart }) {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;

  return (
    <main id="menu" className="menu">
      <h2>Our menu</h2>

      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} addToCart={addToCart} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushrooms"
        price={12}
        photoName="pizzas/funghi.jpg"
      /> */}
    </main>
  );
}

function Pizza({ pizzaObj, addToCart }) {
  console.log(pizzaObj);

  // if (pizzaObj.soldOut) return null;

  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img
        src={process.env.PUBLIC_URL + "/" + (pizzaObj.photoName || "pizzas/focaccia.jpg")}
        alt={pizzaObj.name}
      />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>

        {/* {pizzaObj.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{pizzaObj.price}</span>
        )} */}

        <span>{pizzaObj.soldOut ? "SOLD OUT" : `$${pizzaObj.price}`}</span>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(pizzaObj)}
        disabled={pizzaObj.soldOut}
      >
        {pizzaObj.soldOut ? "Sold Out" : "Add to Cart"}
      </button>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // else alert("Sorry we're closed");

  // if (!isOpen) return <p>CLOSED</p>;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );

  // return React.createElement("footer", null, "We're currently open!");
}

function Cart({ cart, removeFromCart, clearCart, onPlaceOrder }) {
  if (cart.length === 0) return null;

  const total = cart.reduce((sum, pizza) => sum + pizza.price, 0);

  return (
    <aside className="cart">
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {cart.map((pizza, index) => (
          <li key={index} className="cart-item">
            <span>{pizza.name}</span>
            <span>${pizza.price}</span>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total: ${total}</p>
      </div>
      <button className="order-btn" onClick={onPlaceOrder}>
        Place Order
      </button>
      <button className="clear-btn" onClick={clearCart}>
        Clear Cart
      </button>
    </aside>
  );
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button
        className="btn"
        onClick={() => {
          const el = document.getElementById("menu");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        Order
      </button>
    </div>
  );
}

function LoginPage({ onLogin, onToggleSignUp, database }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loginMethod, setLoginMethod] = React.useState("email"); // "email", "phone", "google"
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [googleEmail, setGoogleEmail] = React.useState("");

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = database[email];
    if (user && user.password === password) {
      onLogin(email, user.name);
    } else {
      setError("Invalid email or password.");
    }
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber.trim()) {
      setError("Please enter a phone number");
      return;
    }

    // Simulate phone number authentication
    // In production, you'd integrate with Twilio or similar service
    const phoneUser = Object.values(database).find(
      (user) => user.phone === phoneNumber
    );

    if (phoneUser) {
      onLogin(phoneUser.email, phoneUser.name);
    } else {
      // Create a lightweight account placeholder for phone login (not persisted)
      const userName = "Phone User";
      const userEmail = `phone_${phoneNumber}@pizza.local`;

      onLogin(userEmail, userName);
      alert("Welcome! An account has been created for this session.");
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!googleEmail.trim()) {
      setError("Please enter a Google email");
      return;
    }

    // Simulate Google OAuth login
    // In production, integrate with Firebase or Google OAuth API
    const user = database[googleEmail];

    if (user) {
      onLogin(googleEmail, user.name);
    } else {
      // Create a lightweight account placeholder for Google login (not persisted)
      const googleName = googleEmail.split("@")[0].replace(/\./g, " ");
      const userName =
        googleName.charAt(0).toUpperCase() +
        googleName.slice(1).toLowerCase();

      onLogin(googleEmail, userName);
      alert("Welcome! Your Google account is being used for this session.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🍕 Fast React Pizza Co.</h1>
        <h2>Sign In</h2>

        {/* Login Method Tabs */}
        <div className="login-method-tabs">
          <button
            className={`tab-btn ${loginMethod === "email" ? "active" : ""}`}
            onClick={() => {
              setLoginMethod("email");
              setError("");
            }}
          >
            📧 Email
          </button>
          <button
            className={`tab-btn ${loginMethod === "phone" ? "active" : ""}`}
            onClick={() => {
              setLoginMethod("phone");
              setError("");
            }}
          >
            📱 Phone
          </button>
          <button
            className={`tab-btn ${loginMethod === "google" ? "active" : ""}`}
            onClick={() => {
              setLoginMethod("google");
              setError("");
            }}
          >
            🔐 Google
          </button>
        </div>

        {/* Email Login Form */}
        {loginMethod === "email" && (
          <form onSubmit={handleEmailLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn">
              Sign In with Email
            </button>
          </form>
        )}

        {/* Phone Login Form */}
        {loginMethod === "phone" && (
          <form onSubmit={handlePhoneLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 123-4567"
                pattern="[+]?[0-9\s\-()]{10,}"
              />
            </div>
            <p className="form-hint">
              ℹ️ Enter your phone number. You'll receive an OTP.
            </p>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn">
              Sign In with Phone
            </button>
          </form>
        )}

        {/* Google Login Form */}
        {loginMethod === "google" && (
          <form onSubmit={handleGoogleLogin} className="login-form">
            <div className="form-hint">
              <p>🔐 Continue with your Google account</p>
            </div>
            <div className="form-group">
              <label htmlFor="googleEmail">Google Email:</label>
              <input
                type="email"
                id="googleEmail"
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
                placeholder="your.email@gmail.com"
                required
              />
            </div>
            <p className="form-hint">
              💡 In production, this would redirect to Google's login page.
            </p>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn google-btn">
              Continue with Google
            </button>
          </form>
        )}

        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <button className="toggle-btn" onClick={onToggleSignUp}>
              Sign Up Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function SignUpPage({ onSignUp, onToggleSignUp, database }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [signupMethod, setSignupMethod] = React.useState("email"); // "email" or "phone"

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (signupMethod === "email") {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      if (onSignUp(email, name, password)) {
        setSuccess("Account created successfully! Logging you in...");
        setTimeout(() => {
          // The onSignUp function already logged the user in
        }, 1000);
      }
    } else if (signupMethod === "phone") {
      if (!phoneNumber.trim()) {
        setError("Phone number is required");
        return;
      }

      // In production, you'd send an OTP to the phone number
      const tempEmail = `phone_${phoneNumber}@pizza.local`;
      const tempPassword = Math.random().toString(36).slice(-8);

      if (onSignUp(tempEmail, name, tempPassword)) {
        setSuccess("Account created with phone number! Logging you in...");
        setTimeout(() => {
          // The onSignUp function already logged the user in
        }, 1000);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box signup-box">
        <h1>🍕 Fast React Pizza Co.</h1>
        <h2>Create Account</h2>

        {/* Signup Method Tabs */}
        <div className="login-method-tabs">
          <button
            className={`tab-btn ${signupMethod === "email" ? "active" : ""}`}
            onClick={() => {
              setSignupMethod("email");
              setError("");
            }}
          >
            📧 Email
          </button>
          <button
            className={`tab-btn ${signupMethod === "phone" ? "active" : ""}`}
            onClick={() => {
              setSignupMethod("phone");
              setError("");
            }}
          >
            📱 Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email Signup Method */}
          {signupMethod === "email" && (
            <>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </>
          )}

          {/* Phone Signup Method */}
          {signupMethod === "phone" && (
            <>
              <div className="form-group">
                <label htmlFor="signupPhone">Phone Number:</label>
                <input
                  type="tel"
                  id="signupPhone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  pattern="[+]?[0-9\s\-()]{10,}"
                  required
                />
              </div>
              <p className="form-hint">
                ℹ️ We'll send you an OTP to verify your phone number.
              </p>
            </>
          )}

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="login-btn">
            Create Account
          </button>
        </form>

        <div className="signup-link">
          <p>
            Already have an account?{" "}
            <button className="toggle-btn" onClick={onToggleSignUp}>
              Sign In Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function OrderHistory({ orders, updateOrderStatus }) {
  if (orders.length === 0) {
    return <div className="no-orders">No orders yet.</div>;
  }

  return (
    <div className="order-history">
      <h2>📦 Order History & Tracking</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <span className="order-date">{order.date}</span>
            </div>
            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
              <p className="order-total">Total: ${order.total}</p>
            </div>

            <div className="order-timeline">
              <h4>Order Status:</h4>
              <div className="timeline">
                {orderStatuses.map((status, idx) => (
                  <div
                    key={status.id}
                    className={`timeline-item ${
                      idx <= order.currentStatus ? "active" : ""
                    }`}
                  >
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <p className="status-name">{status.name}</p>
                      <p className="status-description">{status.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

                    {order.currentStatus < 5 && (
                      <button
                        className="update-status-btn"
                        onClick={() => updateOrderStatus(order.id)}
                      >
                        Advance Order Status
                      </button>
                    )}
            {order.currentStatus === 5 && (
              <p className="delivered-message">✓ Order Delivered!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React before 18
// ReactDOM.render(<App />, document.getElementById("root"));
