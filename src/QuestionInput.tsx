// src/components/QuestionInput.tsx
import React, { useState } from 'react';

interface QuestionInputProps {
    onQuestionSubmit: (question: string) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ onQuestionSubmit }) => {
    const [question, setQuestion] = useState<string>('');

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onQuestionSubmit(question);
    };

    const styless: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '0 auto',
    };
    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            margin: '0 auto',
        },
        label: {
            marginBottom: '10px',
            fontSize: '1.2em',
            color: '#333',
        },
        input: {
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            width: '100%',
            fontSize: '1em',
        },
        button: {
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontSize: '1em',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
    };

    return (
        <form style={styless} onSubmit={handleSubmit}>
            <label style={styles.label}>
                Ask a question:
                <input
                    type="text"
                    value={question}
                    onChange={handleQuestionChange}
                    style={styles.input}
                    placeholder="Type your question here..."
                />
            </label>
            <button
                type="submit"
                style={styles.button}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
            >
                Submit
            </button>
        </form>
    );
};

export default QuestionInput;