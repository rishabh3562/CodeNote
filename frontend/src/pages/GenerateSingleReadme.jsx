import React, { useState } from 'react';
import { useGenerateReadme } from '../hooks/useGenerateReadme';
import axios from 'axios';
import { ENDPOINT } from '../utils/constant';
function GenerateReadmeComponent() {
    const [code, setCode] = useState('');
    const { mutate, data, isLoading, isError, error } = useGenerateReadme();

    const handleGenerate = () => {
        mutate(code);
    };
    const handleReadme2 = async()=>{
        try {
            const res = await axios.post(ENDPOINT.GENERATE_README_2,{code});
            console.log(res); 
        } catch (error) {
            
        }
    
    }
const handleTest = async()=>{
    const res = await axios.get(ENDPOINT.TEST);
    console.log(res);
}
    return (<>

        <div>
            <h2>Generate README</h2>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your code here..."
                rows={10}
                cols={50}
            />
            <br />
            <button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate README'}
            </button>
            {isError && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            {data && (
                <div>
                    <h3>Generated README:</h3>
                    <pre>{data.readmeContent}</pre> {/* Adjust based on your response structure */}
                </div>
            )}
            <div>

            </div>
            <button onClick={handleTest}>Test</button>
        </div>
       <div>
        <button onClick={handleReadme2}>
            readme 2 
        </button>
       </div>
        </>);
}

export default GenerateReadmeComponent;