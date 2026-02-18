import { useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
    const payload = mode === 'login' ? { email, password } : { name, email, password };
    const res = await api.post(endpoint, payload);
    login(res.data.token);
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h1 className="mb-4 text-2xl font-bold dark:text-slate-100">AI Quiz Generator</h1>
      <form onSubmit={submit} className="space-y-3">
        {mode === 'register' && (
          <input className="w-full rounded border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <input className="w-full rounded border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full rounded border p-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded bg-indigo-600 py-2 text-white">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={() => setMode((m) => (m === 'login' ? 'register' : 'login'))} className="mt-3 text-sm text-indigo-600">
        Switch to {mode === 'login' ? 'register' : 'login'}
      </button>
    </div>
  );
};
