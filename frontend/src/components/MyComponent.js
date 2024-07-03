// in myfrontend/src/MyComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:8000/api/mymodels/');
            setData(result.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>My Data</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <p>{item.field1}</p>
                        <p>{item.field2}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyComponent;
