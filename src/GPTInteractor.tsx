// src/components/GPTInteractor.tsx
// src/components/GPTInteractor.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface GPTInteractorProps {
    data: any[];
    question: string;
}

const GPTInteractor: React.FC<GPTInteractorProps> = ({ data, question }) => {
    const [prediction, setPrediction] = useState<string>('');

    const handlePrediction = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/davinci-codex/completions',
                {
                    prompt: `Analyze the following data and answer the question: ${question}\n\nData: ${JSON.stringify(data)}`,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                    },
                }
            );
            setPrediction(response.data.choices[0].text.trim());
        } catch (error) {
            console.error(error);
            setPrediction('Error fetching GPT response');
        }
    };

    return (
        <div>
         
            <button onClick={handlePrediction}>Get Prediction</button>
            <p>Prediction: {prediction}</p>
        </div>
    );
};

export default GPTInteractor;
