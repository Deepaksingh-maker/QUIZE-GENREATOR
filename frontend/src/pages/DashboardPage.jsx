import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { UploadZone } from '../components/UploadZone';
import { QuizCard } from '../components/QuizCard';
import { ThemeToggle } from '../components/ThemeToggle';

export const DashboardPage = () => {
  const [uploads, setUploads] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [topic, setTopic] = useState('General');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);
  const [randomized, setRandomized] = useState(true);
  const [selectedDocIds, setSelectedDocIds] = useState([]);

  const load = async () => {
    const [u, q] = await Promise.all([api.get('/upload'), api.get('/quiz')]);
    setUploads(u.data.documents);
    setQuizzes(q.data.quizzes);
  };

  useEffect(() => {
    load();
  }, []);

  const generateQuiz = async () => {
    await api.post('/quiz/generate', {
      documentIds: selectedDocIds,
      questionCount,
      difficulty,
      topic,
      timeLimitMinutes,
      randomized,
      types: ['mcq', 'true_false']
    });
    load();
  };

  return (
    <main className="mx-auto max-w-6xl p-4">
      <header className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-slate-100">Dashboard</h1>
        <ThemeToggle />
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-semibold dark:text-slate-100">1) Upload Study Material</h2>
          <UploadZone onDone={load} />
        </div>

        <div className="space-y-3 rounded-xl border bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-semibold dark:text-slate-100">2) Generate Quiz</h2>
          <input className="w-full rounded border p-2" placeholder="Topic (optional)" value={topic} onChange={(e) => setTopic(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <input type="number" min={1} max={40} className="rounded border p-2" value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} />
            <select className="rounded border p-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" min={1} max={120} className="rounded border p-2" value={timeLimitMinutes} onChange={(e) => setTimeLimitMinutes(Number(e.target.value))} />
            <label className="flex items-center gap-2 text-sm dark:text-slate-100">
              <input type="checkbox" checked={randomized} onChange={(e) => setRandomized(e.target.checked)} />
              Randomize
            </label>
          </div>

          <div className="max-h-36 overflow-auto rounded border p-2 text-sm dark:text-slate-100">
            {uploads.map((doc) => (
              <label key={doc._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedDocIds.includes(doc._id)}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedDocIds((p) => [...p, doc._id]);
                    else setSelectedDocIds((p) => p.filter((id) => id !== doc._id));
                  }}
                />
                {doc.originalName}
              </label>
            ))}
          </div>

          <button onClick={generateQuiz} className="rounded bg-indigo-600 px-4 py-2 text-white">
            Generate Quiz with AI
          </button>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-xl font-semibold dark:text-slate-100">Generated Quizzes</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} onAttempt={() => alert('Wire up attempt page here')} />
          ))}
        </div>
      </section>
    </main>
  );
};
