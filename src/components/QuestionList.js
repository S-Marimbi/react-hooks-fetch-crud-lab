import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  };

  const handleCorrectAnswerChange = (id, correctIndex) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === id) {
        return { ...question, correctIndex };
      }
      return question;
    });
    
    setQuestions(updatedQuestions);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correctIndex })
    })
      .catch(error => console.error('Error updating correct answer:', error));
  };

  return (
    <div className="App">
      <button onClick={fetchQuestions}>View Questions</button>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            {question.text}
            <select value={question.correctIndex} onChange={(e) => handleCorrectAnswerChange(question.id, parseInt(e.target.value))}>
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>{answer}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;