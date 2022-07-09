import React from "react"
import connect from "../assets/images/connect.svg"
import question from "../assets/images/questions.svg"
import analytics from "../assets/images/analytics1.svg"
import arrow from "../assets/images/arrowforward.svg"
import arrowdown from "../assets/images/arrowdown.svg"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("../login")
  }

  return (
    <div className="landing-wrapper">
      <div className="hero-section">
        <h1>We aim to help you save and plan in the easiest way possible</h1>
        <button className="px-5 my-5" onClick={handleClick}>Connect</button>
      </div>

      <div>
        <img className="arrow-down my-5" src={arrowdown} alt="arrow down" />
      </div>

      <div className="landing-hiw">How it works</div>

      <div className="landing-features">
        <div>
          <img src={connect} alt="iki" />
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          </p>
        </div>

        <img className="arrow" src={arrow} alt="forward arrow" />

        <div>
          <img src={question} alt="iki" />
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          </p>
        </div>

        <img className="arrow" src={arrow} alt="forward arrow" />

        <div>
          <img src={analytics} alt="iki" />
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          </p>
        </div>
      </div>
    </div>
  )
}
