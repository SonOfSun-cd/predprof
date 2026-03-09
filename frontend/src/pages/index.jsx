import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Index() {

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const data = axios.get("/api/get_data");
            setData(data)
        }  
        catch (error) {
            console.log('error getting data from backend:', error);
        }
    }



    return (
        <>
            <div></div>
        </>
    )
}