import React from 'react';
import './App.scss';
import BookPage from './components/book-page/book-page';
import LoginForm from './components/login-form/login-form';




function App() {

  return (
    <div className="App">
      <h1>Тестовая работа Zherka Pavel <a href="https://drive.google.com/file/d/1KYK4q-HbQbbxIzzMcGvzTdqhaTw_McKX/view" target='_blank' rel="noreferrer">CV</a></h1>
      <h1>1. HTML + CSS</h1>
      <BookPage />
      <h1>2. React</h1>
      <LoginForm />
      <h1>3. Решить задачи из файлов - <a href='https://codesandbox.io/s/ts-part-forked-nrk5rv?file=/if.ts' target='_blank' rel="noreferrer">Codesandbox</a></h1>

    </div>
  );
}

export default App;
