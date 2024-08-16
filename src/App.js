import { useEffect } from "react";
import { useState } from "react";
import './App.css'

function App() {

    const [serial, setSerial] = useState({
        actors: []
    })

    useEffect(() => {
        loadSerial()
    }, [])

    async function loadSerial() {
        let res = await fetch('http://localhost:2000/api/serial')
        let resJson = await res.json()
        setSerial(resJson);
    }

    async function onChange(paramName, value) {
        let newSerial = { ...serial }
        newSerial[paramName] = value
        setSerial(newSerial)
    }

    return (
        <div className="max-width-500 flex-direction-column">
            {/* HEADER */}
            <div>
                <input className="font-size-x-large text-align-center width-100pct"
                    value={serial.name}
                    onChange={(e) => {
                        let value = e.target.value
                        onChange('name', value)
                    }} />
            </div>

            {/* IMAGE */}
            <div className="flex-direction-column">
                <img className="width-100pct" src={serial.poster} />
                <input className="text-align-center width-100pct"
                    value={serial.poster}
                    onChange={(e) => {
                        let value = e.target.value
                        onChange('poster', value)
                    }} />
            </div>

            {/* ACTORS */}
            <div className="flex-direction-column">{
                serial.actors.map((actor, index) => {
                    return (
                        <div>
                            <input value={actor}
                                key={index}
                                onChange={(e) => {
                                    let value = e.target.value
                                    let newSerial = { ...serial }
                                    newSerial.actors[index] = value
                                    setSerial(newSerial)
                                }} />

                            <div className="color-red"
                                onClick={() => {
                                    let newSerial = { ...serial }
                                    newSerial.actors.splice(index, 1)
                                    setSerial(newSerial)
                                }}
                            >Удалить</div>
                        </div>
                    )
                }

                )
            }
                <div className="color-blue" onClick={(e) => {
                    let newSerial = { ...serial }
                    newSerial.actors.push('NewName')
                    setSerial(newSerial)
                }}>Добавить актёра</div>
            </div>

            {/* DESCRIPTION */}
            <textarea value={serial.description} rows="6"
                onChange={(e) => {
                    let value = e.target.value
                    onChange('description', value)
                }}
            >
            </textarea>

        </div >
    );
}

export default App;