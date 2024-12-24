import { useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import assessmentapi from "../../uitils/api/assessment";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { capitalize, formatDate, isNullOrEmpty, where } from "../../uitils/functions/global";
import ActionButton from "../../components/global/ActionButton";
import question from "../../uitils/api/question";
import Accordion from "../../components/accordion/Accordion";
import AccordionContent from "../../components/accordion/AccordionContent";
import answer from "../../uitils/api/answer";
import { populateOptions } from "../question/ShowQuestion";

export default function ShowAssessment() {
  const { assessmentId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [assessment, setAssessment] = useState(blueprint.assessment);
  const [questions, setQuestions] = useState([blueprint.question]);
  const [answers, setAnswers] = useState([blueprint.answer]);

  useEffect(() => {
    assessmentapi.show(assessmentId, token, setAssessment, handler);
    question.all(token, setQuestions, handler, { assessment_id: assessmentId });
    answer.all(token, setAnswers, handler);
  }, [assessmentId]);

  function getQuestionAnswer(answers, questionId) {
    return where(answers, { question_id: questionId })[0]
  }

  return (
    <DashboardPageCompement title={"specified assessment"}>
      <ActionButton name={'Add a new question'} route={'./add-question'} />

      <div>
        <h1>{assessment.title}</h1>
        <p>{assessment.type}</p>
        <p>{assessment.time_limit}</p>
        <p>{assessment.retakes_allowed}</p>
        <p>{formatDate(assessment.updated_at)}</p>
      </div>

      {/* all it's questions */}
      <Accordion title={'all questions'}>
        {!isNullOrEmpty(questions) && questions.map(question => <AccordionContent key={question.id}
          tabTitle={question.question_text}
          itemId={question.id}
          identity={'question'}
          noEdit={true}
        >
          <h1>{capitalize(question.question_text)}</h1>
          <p>type: {question.type}</p>
          <p>Add at: {formatDate(question.created_at)}</p>

          <div>
            <h1>Options</h1>
            {(() => {
              const currentAnswer = getQuestionAnswer(answers, question.id);
              if (!isNullOrEmpty(currentAnswer)) {
                return currentAnswer.question.type == 'MCQ' ? <ol>
                  {populateOptions(currentAnswer.answer_text)}
                  <li>The correct option is: {currentAnswer.is_correct}</li>
                </ol> : <ol>
                  <li>This is true or false optionary question</li>
                  <li>The correct option is: {currentAnswer.is_correct}</li>
                </ol>
              }
            })()}
          </div>
        </AccordionContent>)
        }
      </Accordion >

    </DashboardPageCompement >
  );
}
