import mqtt from 'mqtt'
import { FC } from 'react'
import { props } from './App'

const Publish: FC<props> = ({ broker, options, topic }) => {
    const publish = () => {
        try {
            const client = mqtt.connect(broker, options)
            client.on('connect', () => {
                console.log('CONNECTED to broker')
            })

            client.on('error', () => {
                console.log('ERROR to connect')
            })

            client.on('disconnect', () => {
                console.log('DISCONNECTED from broker')
            })
            client.publishAsync(topic, 'React App')
            client.end()
        } catch (error) {
            console.log(error)
        }
    }

    return <button onClick={publish}>Feed</button>
}

export default Publish
