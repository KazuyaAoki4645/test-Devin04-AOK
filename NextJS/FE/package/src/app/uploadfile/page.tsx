'use client';

import React, { useState } from 'react';
import { getAuthToken } from '@/utils/auth';

export default function FileUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage('');
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('ファイルを選択してください');
      setUploadStatus('error');
      return;
    }

    try {
      setUploading(true);
      const tokenData = await getAuthToken();
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('http://localhost:8000/api/v1/uploadfile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        setMessage('ファイルがアップロードされました');
        setUploadStatus('success');
        setFile(null);
        if (document.getElementById('fileInput') as HTMLInputElement) {
          (document.getElementById('fileInput') as HTMLInputElement).value = '';
        }
      } else {
        const errorData = await response.json();
        setMessage(`アップロード失敗: ${errorData.detail || '不明なエラー'}`);
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('アップロードエラー:', error);
      setMessage('アップロードエラーが発生しました');
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">ファイルアップローダー</h1>
      <div className="w-full max-w-md p-6 border border-gray-300 rounded-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="fileInput">
            ファイルを選択
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        {file && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">選択されたファイル: {file.name}</p>
            <p className="text-sm text-gray-600">サイズ: {(file.size / 1024).toFixed(2)} KB</p>
            <p className="text-sm text-gray-600">タイプ: {file.type || 'unknown'}</p>
          </div>
        )}
        
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full py-2 px-4 rounded ${
            !file || uploading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {uploading ? 'アップロード中...' : 'アップロード'}
        </button>
        
        {message && (
          <div className={`mt-4 p-3 rounded ${
            uploadStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
