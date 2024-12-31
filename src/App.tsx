import React from "react";
import { Provider } from "react-redux"; // Import Provider for Redux
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import store from "./store"; // Your redux store
import AppRouter from "@/routes/index"; // Import the AppRouter component

import "./App.css"; // Import any global styles

// App Component
function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap your app with Redux provider */}
      <Router>
        {" "}
        {/* Wrap your routes with Router */}
        <AppRouter /> {/* Use AppRouter to manage routes */}
      </Router>
    </Provider>
  );
}

export default App;
