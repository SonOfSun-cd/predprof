import React, { useState, useEffect, use } from 'react'
import axios from 'axios'

export default function Index() {

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const data1 = await axios.get("/api/get_data");
            console.log(data1.data);
            setData(data1.data);
        }
        catch (error) {
            console.log('error getting data from backend:', error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(()=> {
        console.log(data);
    }, [data])



    return (
        <>
            <div>{data.map((point, index) => (
                <p>{point.id} - {point.distant} - {point.SH}</p>
            ))}</div>
        </>
    )
}