import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Index() {
    const [data, setData] = useState([]);
    const [selectedDay, setSelectedDay] = useState(0);
    const [maxDay, setMaxDay] = useState(30); // Максимальный день (можно изменить)

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

    useEffect(() => {
        console.log(data);
    }, [data])

    // Вычисляем общую длину для масштабирования
    const totalDistance = data.reduce((sum, point) => sum + (point.distant || 0), 0);
    const scaleFactor = totalDistance > 0 ? 1000 / totalDistance : 1; // Масштаб для отображения
    const lineLength = Math.max(totalDistance * scaleFactor, 1000);

    // Фильтрация данных по выбранному дню (если в данных есть поле day)
    const filteredData = data.filter(point => 
        point.day === undefined || point.day === selectedDay
    );

    return (
        <div style={{ 
            padding: '40px', 
            width: '100%', 
            overflowX: 'auto',
            minHeight: '300px'
        }}>
            {/* Слайдер выбора дня */}
            <div style={{ 
                marginBottom: '30px',
                maxWidth: `${lineLength}px`
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    fontSize: '14px',
                    color: '#666'
                }}>
                    <span>День: {selectedDay}</span>
                    <span>0 — {maxDay}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max={maxDay}
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                    style={{
                        width: '100%',
                        height: '8px',
                        borderRadius: '4px',
                        background: 'linear-gradient(to right, #4CAF50 0%, #4CAF50 50%, #ccc 50%, #ccc 100%)',
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#999',
                    marginTop: '5px'
                }}>
                    <span>День 0</span>
                    <span>День {maxDay}</span>
                </div>
            </div>

            {/* Визуализация линии с точками */}
            <div style={{ 
                position: 'relative', 
                width: `${lineLength}px`,
                minHeight: '150px'
            }}>
                {/* Горизонтальная линия */}
                <div style={{
                    position: 'absolute',
                    top: '75px',
                    left: '0',
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#333',
                    borderRadius: '2px'
                }} />

                {/* Точки с данными */}
                {/* Точки и отрезки */}
                {filteredData.map((point, index) => {
                    // Позиция текущей точки (накопительная)
                    const currentPosition = filteredData
                        .slice(0, index + 1)
                        .reduce((sum, p) => sum + (p.distant || 0), 0) * scaleFactor;
                    
                    // Позиция предыдущей точки (или 0 для первой)
                    const prevPosition = index === 0 
                        ? 0 
                        : filteredData
                            .slice(0, index)
                            .reduce((sum, p) => sum + (p.distant || 0), 0) * scaleFactor;
                    
                    // Середина отрезка для подписи дистанции
                    const segmentMidpoint = (prevPosition + currentPosition) / 2;

                    return (
                        <React.Fragment key={point.id || index}>
                            {/* Подпись дистанции НАД ОТРЕЗКОМ */}
                            <div style={{
                                position: 'absolute',
                                left: `${segmentMidpoint}px`,
                                top: '55px', // чуть выше линии
                                transform: 'translateX(-50%)',
                                fontSize: '11px',
                                color: '#888',
                                whiteSpace: 'nowrap',
                                backgroundColor: '#fff',
                                padding: '1px 4px',
                                borderRadius: '3px',
                                border: '1px dashed #ccc'
                            }}>
                                {point.distant}
                            </div>

                            {/* Сама точка */}
                            <div 
                                style={{
                                    position: 'absolute',
                                    left: `${currentPosition}px`,
                                    top: '75px',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center'
                                }}
                            >
                                {/* SH над точкой */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '25px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#0066cc',
                                    whiteSpace: 'nowrap',
                                    backgroundColor: '#f0f0f0',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc'
                                }}>
                                    SH: {point.SH}
                                </div>

                                {/* Жирная точка */}
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    backgroundColor: '#ff4444',
                                    border: '3px solid #cc0000',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    position: 'relative',
                                    zIndex: 1
                                }} />

                                {/* ID под точкой */}
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '12px',
                                    color: '#666',
                                    whiteSpace: 'nowrap'
                                }}>
                                    ID: {point.id}
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Легенда */}
            <div style={{ 
                marginTop: '20px', 
                fontSize: '14px', 
                color: '#666',
                maxWidth: `${lineLength}px`
            }}>
                <p>📍 Всего точек: {filteredData.length} (из {data.length})</p>
                <p>📏 Общая дистанция: {totalDistance}</p>
                <p>📅 Выбранный день: {selectedDay} из {maxDay}</p>
            </div>
        </div>
    )
}