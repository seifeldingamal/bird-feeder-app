import { FC, useState } from 'react'

const Stream: FC = () => {
    const [link, setLink] = useState('')
    return (
        <div className="card">
            <iframe
                width="560"
                height="315"
                src={`${link}`}
                allowFullScreen
            ></iframe>
            <div className="input">
                <input
                    type="text"
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Please enter a link to display."
                />
            </div>
        </div>
    )
}

export default Stream
