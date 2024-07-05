import { FC, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import mqtt from 'precompiled-mqtt'
import Stream from './Stream'

const App: FC = () => {
    const [message, setMessage] = useState('')

    useEffect(() => {
        const ha = 'mqtt:homeassistant:1884/'

        const option = {
            username: 'mqtt',
            password: '1234',
        }

        const topic = 'birdfeeder'

        const client = mqtt.connect(ha, option)

        client.on('connect', () => {
            console.log('CONNECTED to broker')

            client.subscribe(topic)
        })

        client.on('error', () => {
            console.log('ERROR to connect')
        })

        client.on('disconnect', () => {
            console.log('DISCONNECTED from broker')
        })

        client.subscribe(topic)
        const updateMqqt = () => {
            client.on('message', function (_topic, message) {
                console.log(message.toString())
                setMessage(message.toString())
            })
        }
        updateMqqt()
        client.end()
    }, [])

    const publish = () => {
        const ha = 'mqtt:homeassistant:1884/'

        const option = {
            username: 'mqtt',
            password: '1234',
        }

        const topic = 'birdfeeder'

        const client = mqtt.connect(ha, option)
        client.publish(topic, 'React App')
    }

    return (
        <>
            <div className="logos">
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <Stream />
            <div className="card">
                <span>{message ? message : 'No Message'}</span>
                {/* <button onClick={connect}>Connect</button> */}
                <button onClick={publish}>Feed</button>
                {/* <button onClick={end}>End Connection</button> */}
            </div>
        </>
    )
}

export default App
