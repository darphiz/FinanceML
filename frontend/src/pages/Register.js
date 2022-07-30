import { useState } from "react"
import backend from "../api_interface"
import { Navigate } from "react-router-dom"
import toast from "react-hot-toast"

export const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState("")

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const response = await backend.post("api/user/register/", { email, password })
      if (response.status === 201) {
        toast.success("Registration successful", { position: "top-right", autoClose: 5000 })
        setRegistered(true)
      } else {
        setError(response.data.message)
      }
    } catch (e) {
      const message = e.response.data.email[0]
      toast.error(message, { position: "top-right", autoClose: 5000 })
      message ? setError(message) : setError(e.response.statusText)
    }
  }

  if (registered) {
    return <Navigate to="/login" replace={true} />
  }

  return (
    <main className="form-sign-in">
      <form onSubmit={submitForm}>
        <h1 className="mb-3 fw-bold text-center my-3">Sign Up</h1>
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
          <button className="btn text-white fw-bold px-5 py-2 rounded-4 bg-dominant" type="submit">
            Sign up
          </button>
        </center>
      </form>
    </main>
  )
}
