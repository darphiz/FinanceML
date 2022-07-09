import { Login } from "./pages/Login"
import { Route, Routes, Link, Navigate } from "react-router-dom"
import { Register } from "./pages/Register"
import { useAuth } from "./stores"
import { Dashboard } from "./pages/Dashboard"
import shallow from "zustand/shallow"
import { backend } from "./api_interface"
import toast from "react-hot-toast"
import { useEffect } from "react"
import { AuthSuspense } from "./AuthSuspense"
import LandingPage from "./pages/LandingPage"
import { useLocation } from "react-router-dom"

const Navbar = () => {
  const [is_authenticated, setIsAuthenticated] = useAuth(
    (state) => [state.is_authenticated, state.setIsAuthenticated],
    shallow
  )

  const location = useLocation()

  const logout = async () => {
    try {
      const response = await backend.post("api/user/logout/")
      if (response.status === 200) {
        setIsAuthenticated(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <nav className="navbar navbar-expand-md  bg-none text-black mb-4">
      <div className="container">
        <a className="navbar-brand fw-bold fw-size-2" href=".">
          Calmmoney
        </a>
        {location.pathname !== "/landing" && (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {location.pathname !== "/landing" && (
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto d-grid gap-fix mb-2 mb-md-0">
              {!is_authenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link nav-btn px-4">
                      Log in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link nav-btn px-4">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                <li className="nav-item">
                  <button type="button" className="nav-link nav-btn px-4 bg-none">
                    Connect Bank
                  </button>
                </li>

                <li className="nav-item">
                  <button type="button" onClick={logout} className="nav-link nav-btn px-4 bg-none">
                    Logout
                  </button>
                </li>
              </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

const App = () => {
  const [is_authenticated, setIsAuthenticated] = useAuth(
    (state) => [state.is_authenticated, state.setIsAuthenticated],
    shallow
  )

  const setUserMail = useAuth((state) => state.setUserMail)
  useEffect(() => {
    ;(async () => {
      try {
        const response = await backend.get("api/user/")
        const { email } = response.data
        if (email) {
          setIsAuthenticated(true)
          setUserMail(email)
        }
      } catch (e) {
        setUserMail("")
        setIsAuthenticated(false)
        console.log(e)
      }
    })()
  }, [setIsAuthenticated, setUserMail])

  const ProtectedRoute = ({ auth, children }) => {
    if (!auth) {
      toast.error("You are not authorized to view this page")
      return <Navigate to="/login" replace />
    }

    return children
  }
  return (
    <div className="main-app">
      <Navbar />
      <Routes>
        <Route index element={<LandingPage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute auth={is_authenticated}>
              <AuthSuspense is_auth={is_authenticated}>
                <Dashboard />
              </AuthSuspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <center>
              <p className="fw-bold">Oops! seems like a dead end..</p>
            </center>
          }
        />
      </Routes>
    </div>
  )
}

export default App
