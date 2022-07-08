import React from "react"
import connect from "../assets/images/connect.svg"
import question from "../assets/images/questions.svg"
import analytics from "../assets/images/analytics1.svg"
import { LoremIpsum } from "react-lorem-ipsum"
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
            <LoremIpsum avgSentencesPerParagraph={4} />
          </p>
        </div>

        <img className="arrow" src={arrow} alt="forward arrow" />

        <div>
          <img src={question} alt="iki" />
          <p>
            <LoremIpsum avgSentencesPerParagraph={4} />
          </p>
        </div>

        <img className="arrow" src={arrow} alt="forward arrow" />

        <div>
          <img src={analytics} alt="iki" />
          <p>
            <LoremIpsum avgSentencesPerParagraph={4} />
          </p>
        </div>
      </div>
    </div>
  )
}
