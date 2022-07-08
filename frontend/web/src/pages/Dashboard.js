export const Dashboard = () => {
  const questions = [
    { qusetion: "question1", name: "question1" },
    { qusetion: "question2", name: "question2" },
    { qusetion: "question3", name: "question3" },
    { qusetion: "question4", name: "question4" },
    { qusetion: "question5", name: "question5" },
    { qusetion: "question6", name: "question6" },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const questionsExcerpt = questions.map((q) => {
    return (
      <input
        type="text"
        className="form-control p-3 rounded-4"
        placeholder={q.qusetion}
        name={q.name}
        // onChange={}
        // value={password}
        required
      />
    )
  })

  return (
    <div className="row">
      <div className="mx-auto col-sm-12 col-md-6 pb-5">
        <h4 className="text-center mb-3">
          Answer these fw questions let our AI do the prediction.
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="questions-wrapper rounded-4 px-3">{questionsExcerpt}</div>
          <center className="my-2">
            <button
              className="btn text-white fw-bold px-5 py-2 mt-3 rounded-4 bg-dominant"
              type="submit"
            >
              Predict
            </button>
          </center>
        </form>
      </div>
    </div>
  )
}
