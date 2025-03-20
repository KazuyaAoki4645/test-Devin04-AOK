'use client';

import React, { useState } from 'react';

export default function TextEditPage() {
  const [text, setText] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<string>('');
  const lines = text.split('\n');
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('テキストがコピーされました');
      })
      .catch(err => {
        console.error('コピーに失敗しました:', err);
      });
  };
  
  const handleSaveDraft = async () => {
    try {
      // First authenticate to get token - credentials should be set in environment variables
      const res1 = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: process.env.NEXT_PUBLIC_API_USERNAME || "",
          password: process.env.NEXT_PUBLIC_API_PASSWORD || "",
        }),
      });
      const tokenData = await res1.json();

      // Send text to backend with token
      const res2 = await fetch("http://localhost:8000/api/v1/textbox_draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          content: text
        }),
      });
      
      if (res2.ok) {
        setSaveStatus('下書きが保存されました');
        setTimeout(() => setSaveStatus(''), 3000); // Clear status after 3 seconds
      } else {
        setSaveStatus('保存に失敗しました');
      }
    } catch (error) {
      console.error('下書き保存に失敗しました:', error);
      setSaveStatus('保存に失敗しました');
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">リッチテキストエディタ</h1>
      <div className="relative flex flex-row flex-grow border border-gray-300 rounded-md overflow-hidden">
        <button 
          onClick={handleCopy}
          className="absolute top-2 right-2 px-3 py-1 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200 transition-colors flex items-center z-10"
        >
          <span className="mr-1">Copy</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>
        
        {/* Add Save Draft button */}
        <button 
          onClick={handleSaveDraft}
          className="absolute top-2 right-24 px-3 py-1 bg-blue-100 text-blue-700 rounded border border-blue-300 hover:bg-blue-200 transition-colors flex items-center z-10"
        >
          <span className="mr-1">下書き保存</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>
        
        {/* Add save status indicator */}
        {saveStatus && (
          <div className="absolute top-2 right-48 px-3 py-1 bg-green-100 text-green-700 rounded border border-green-300 z-10">
            {saveStatus}
          </div>
        )}
        <div className="line-numbers bg-gray-100 py-2 px-2 text-right text-gray-500 select-none">
          {lines.map((_, i) => (
            <div key={i} className="line-number">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          className="flex-grow p-2 outline-none resize-none font-mono"
          value={text}
          onChange={handleTextChange}
          placeholder="ここにテキストを入力してください..."
        />
      </div>
    </div>
  );
}
