import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Place from "./components/places";
import PlacesList from "./components/places-list";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/places" className="navbar-brand">
        <i class="fab fa-typo3"></i> Tourist Place Reviews 
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/places"} className="nav-link">
              Tourist Places
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/places"]} component={PlacesList} />
          <Route 
            path="/places/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/places/:id"
            render={(props) => (
              <Place {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
