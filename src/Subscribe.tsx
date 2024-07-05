import mqtt from 'mqtt'
import { FC, useState } from 'react'
import { props } from './App'

const Subscribe: FC<props> = ({ broker, options, topic }) => {
    const [message, setMessage] = useState('')

    const client = mqtt.connect(broker, options)

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
            setMessage(message.toString())
        })
    }
    updateMqqt()

    return <span>{message ? message : 'Mo Message'}</span>
}

export default Subscribe
