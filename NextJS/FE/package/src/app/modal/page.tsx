'use client';
import MessageDialog from './components/Modal';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MessageDialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
      />

      <div className="flex flex-col min-h-screen items-center justify-center">
        <button
          className="bg-slate-900 hover:bg-slate-700 text-white text-lg w-60 h-14 py-2 px-4"
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </button>
      </div>
    </>
  );
}
