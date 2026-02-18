export const QuizCard = ({ quiz, onAttempt }) => {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="font-semibold dark:text-slate-100">{quiz.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-300">
        {quiz.questions.length} questions • {quiz.difficulty} • {quiz.timeLimitMinutes} min
      </p>
      <button onClick={() => onAttempt(quiz)} className="mt-3 rounded-lg bg-emerald-600 px-3 py-2 text-white">
        Attempt / Retake
      </button>
    </article>
  );
};
