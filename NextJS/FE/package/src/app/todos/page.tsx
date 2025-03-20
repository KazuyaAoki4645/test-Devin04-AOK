"use client";
import React, { useEffect, useState } from "react";
import { getAuthToken } from '@/utils/auth';

export default function TodosPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loginAndGetTodos = async () => {
      try {
        // 1) 認証トークンをユーティリティ関数から取得
        const tokenData = await getAuthToken("http://localhost:8000/token", "product_super", "superuser");

        // 2) 取得したトークンをヘッダに付けて /api/v1/todos を取得
        const res2 = await fetch("http://localhost:8000/todos", {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });
        const todosData = await res2.json();

        // 3) useState で todos を更新
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    loginAndGetTodos();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {Array.isArray(todos) && todos.map((todo) => (
          <li key={todo.id}>
            <p>
              {todo.title} - {todo.completed ? "Done" : "Not done"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
