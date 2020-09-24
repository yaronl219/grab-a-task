import React, { Component } from 'react'
import { useSpring , animated } from 'react-spring'


export function Login () {

    const fade = useSpring({
        from:{ opacity: 0, transform: 'translate3d(100%,0,0)' },
        to:{ opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave:{ opacity: 0, transform: 'translate3d(-50%,0,0)' }
    })

        return (
            <animated.div className="login-container" style={fade}>
                <h1>this is login</h1>
            </animated.div>
        )
}


