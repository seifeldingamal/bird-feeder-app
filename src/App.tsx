import { FC, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import mqtt from 'precompiled-mqtt'
import Stream from './components/Stream'

const App: FC = () => {
    const [message, setMessage] = useState('')
    const [send, setSend] = useState('')

    useEffect(() => {
        const ha = 'mqtt:hafeeder:1884/'

        const option = {
            username: 'mqtt',
            password: '1234',
            keepalive: 60,
            clean: true,
            reconnectPeriod: 300000,
            connectTimeout: 30000,
            rejectUnauthorized: false,
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

        client.subscribe(
            topic,
            {
                qos: 2,
            },
            (error) => {
                if (error) {
                    console.log('MQTT Subscribe to topics error', error.message)
                    return
                }
            }
        )
        const updateMqqt = () => {
            client.on('message', function (topic, message) {
                console.log(topic, message.toString())
                setMessage(message.toString())
            })
        }
        updateMqqt()
    }, [])

    const publish = () => {
        const ha = 'mqtt:hafeeder:1884/'

        const option = {
            username: 'mqtt',
            password: '1234',
            keepalive: 60,
            clean: true,
            reconnectPeriod: 300000,
            connectTimeout: 30000,
            rejectUnauthorized: false,
        }

        const topic = 'birdfeeder'

        const client = mqtt.connect(ha, option)
        client.publish(topic, send, { qos: 2 })
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
                <button onClick={publish}>Feed</button>

                <div className="input">
                    <input
                        type="text"
                        onChange={(e) => setSend(e.target.value)}
                        placeholder="Please enter a message to display."
                    />
                </div>
            </div>
        </>
    )
}

export default App
