import { useState } from "react"
import { backend } from "../api_interface"
import { Navigate } from "react-router-dom"
import { useAuth } from "../stores"
import shallow from "zustand/shallow"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"

export const Login = () => {
  const [cookies, setCookie] = useCookies(["jwt"])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const setUserMail = useAuth((state) => state.setUserMail)
  const [is_authenticated, setIsAuthenticated] = useAuth(
    (state) => [state.is_authenticated, state.setIsAuthenticated],
    shallow
  )
  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const response = await backend.post("api/user/login/", { email, password })
      if (response.status === 200) {
        toast.success("Hello, there!")
        setIsAuthenticated(true)
        setUserMail(response.data.email)

        let expires = new Date()
        expires.setTime(expires.getTime() + Number(response.data.exp) * 1000)
        setCookie("jwt", response.data.token, { path: "/", expires })
        localStorage.setItem("jwt", response.data.token)
      }
    } catch (e) {
      const message = e.response.data.detail
      toast.error(message, { position: "top-right", autoClose: 5000 })
      message ? setError(message) : setError(e.response.statusText)
    }
  }

  if (is_authenticated) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <main className="form-sign-in">
      <form onSubmit={submitForm}>
        <h1 className="mb-3 fw-bold text-center my-3">Log In</h1>
        <div className="mb-3">
          <input
            type="email"
            className="form-control p-3 rounded-4"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            value={email}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control p-3 rounded-4"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {error && <p className="text-danger text-center">{error}</p>}
        <center className="my-2">
          <p>
            New here? <Link to="/register">Sign Up</Link>
          </p>

          <button className="btn text-white fw-bold px-5 py-2 rounded-4 bg-dominant" type="submit">
            Go
          </button>
        </center>
      </form>
    </main>
  )
}
