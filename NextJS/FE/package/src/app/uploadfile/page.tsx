'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getAuthToken } from '@/utils/auth';

export default function FileUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clear messages after a timeout
  useEffect(() => {
    if (message && (uploadStatus === 'success' || uploadStatus === 'error')) {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      
      messageTimeoutRef.current = setTimeout(() => {
        setMessage('');
        setUploadStatus('idle');
      }, 5000); // Clear message after 5 seconds
    }
    
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [message, uploadStatus]);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage('');
      setUploadStatus('idle');
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setMessage('');
      setUploadStatus('idle');
    }
  }, []);

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
        resetFileInput();
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

  const handleRemoveFile = () => {
    setFile(null);
    resetFileInput();
    setMessage('');
    setUploadStatus('idle');
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">ファイルアップローダー</h1>
      
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          className={`p-6 border-2 border-dashed rounded-lg transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : file 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <svg 
              className={`w-12 h-12 mx-auto mb-3 ${file ? 'text-green-500' : 'text-gray-400'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">クリック</span>してファイルを選択するか、
              <span className="font-semibold">ドラッグ&ドロップ</span>してください
            </p>
            
            <input
              ref={fileInputRef}
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={uploading}
            >
              ファイルを選択
            </button>
          </div>
        </div>
        
        {file && (
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p className="font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB • {file.type || 'unknown'}</p>
                </div>
              </div>
              <button 
                onClick={handleRemoveFile}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="ファイルを削除"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
        
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full py-2 px-4 rounded-md transition-colors ${
              !file 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : uploading 
                  ? 'bg-blue-400 text-white cursor-wait' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                アップロード中...
              </span>
            ) : 'アップロード'}
          </button>
          
          {message && (
            <div className={`mt-4 p-3 rounded-md transition-opacity ${
              uploadStatus === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
