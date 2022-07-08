import React from "react"
import connect from "../assets/images/connect.svg"
import question from "../assets/images/questions.svg"
import analytics from "../assets/images/analytics1.svg"
import arrow from "../assets/images/arrowforward.svg"

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      <div className="hero-section">
        <h1>We aim to help you save and plan in the easiest way possible</h1>
        <button>Connect</button>
      </div>

      <div className="landing-hiw">How it works</div>

      <div className="landing-features">
        <div>
          <img src={connect} alt="iki" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum
          </p>
        </div>

        <img className="arrow" src={arrow} alt="forward arrow" />

        <div>
          <img src={question} alt="iki" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum
          </p>
        </div>

        <img className="arrow" src={arrow} alt="forward arrow" />

        <div>
          <img src={analytics} alt="iki" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum
          </p>
        </div>
      </div>
    </div>
  )
}
