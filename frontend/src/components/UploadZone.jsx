import { useRef, useState } from 'react';
import { api } from '../api/client';

export const UploadZone = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);

  const uploadFiles = async (files) => {
    if (!files.length) return;

    const form = new FormData();
    [...files].forEach((f) => form.append('files', f));

    setBusy(true);
    setProgress(0);

    try {
      const res = await api.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => {
          if (evt.total) setProgress(Math.round((evt.loaded * 100) / evt.total));
        }
      });
      onDone?.(res.data.documents);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-indigo-400 p-6 dark:border-indigo-500">
      <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
        Drag & drop files or browse (PDF, DOCX, TXT)
      </p>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple
        accept=".pdf,.docx,.txt"
        onChange={(e) => uploadFiles(e.target.files)}
      />

      <div className="flex gap-3">
        <button
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
          disabled={busy}
        >
          {busy ? 'Uploading...' : 'Select Files'}
        </button>
      </div>

      {busy && (
        <div className="mt-4">
          <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-700">
            <div className="h-2 rounded bg-indigo-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-500">{progress}% uploaded</p>
        </div>
      )}
    </div>
  );
};
