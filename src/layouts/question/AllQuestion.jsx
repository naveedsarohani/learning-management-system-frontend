import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import { Link } from "react-router-dom"
import blueprint from "../../uitils/blueprint"
import { formatDate, isNullOrEmpty } from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import question from "../../uitils/api/question"

export default function AllQuestion() {
  const { destroy } = useDelete()
  const { handler } = useHandler()
  const {
    credentials: { user, token },
  } = useAuth()
  const [questions, setQuestions] = useState([blueprint.question])

  useEffect(() => {
    question.all(token, setQuestions, handler)
  }, [handler.navigate, user])

  return (
    <DashboardPageCompement title={"all questions"}>
      <h1>Questions for All Assesments</h1>
      <Table
        ths={
          <>
            <th>Sno.</th>
            <th>Question</th>
            <th>Type</th>
            <th>Assessment</th>
            <th>Created On</th>
            <th>Action</th>
          </>
        }
        tds={
          !isNullOrEmpty(questions) &&
          questions.map((question, index) => (
            <tr key={question.id}>
              <td>{index + 1}</td>
              <td>{question.question_text}</td>
              <td>{question.type}</td>
              <td>{question.assessment.title.slice(0, 10) + "..."}</td>
              <td>{formatDate(question.created_at)}</td>
              <td>
                <Link to={"./" + question.id}>View</Link>
                <Link to={"./edit/" + question.id}>Edit</Link>
                <button
                  onClick={() => destroy("/questions", question.id, "question")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        }
      />
    </DashboardPageCompement>
  )
}
