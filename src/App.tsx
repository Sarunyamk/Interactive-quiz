import { useState } from "react";
import QuizQuestion from "./components/QuizQuestion";

export default function App() {
  const [quizData] = useState({
    question: `let a = 5;\nlet b = new Number(5);\nlet c = 5;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(a === c);`,
    options: [
      { id: "A", text: "true false false" },
      { id: "B", text: "false true true" },
      { id: "C", text: "true false true" },
      { id: "D", text: "true true false" },
    ],
    correctAnswer: "C",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <QuizQuestion
        question={quizData.question}
        options={quizData.options}
        correctAnswer={quizData.correctAnswer}
      />
    </div>
  );
}
