import React from 'react'
import yaron from '../assets/imgs/yaron.jpeg';
import elad from '../assets/imgs/elad.jpeg';
const logo = require('../assets/imgs/opus.png')


export function Home(props) {
    return (
        <div className="main-screen">
            <section className="home">
                <div className="bg">
                    <div className="bg-overlay">
                        <div className="header">
                            <img src={logo} alt="logo" />
                            <h1>Welcome To Opus</h1>
                        </div>
                        <p>Opus is a beautiful Kanban style project managment software prefect for keeping track of teams' progress</p>
                        <div onClick={() => props.history.push('/board')} className="main-screen-cta">See a Demo</div>
                    </div>
                </div>
            </section>
            <section className="team">
                <div className="text">
                    <h2>Work as a team</h2>
                    <p>Use Opus' advanced features to assign and keep track of your team's efforts</p>
                </div>
                <div className="img"></div>
            </section>
            <section className="info">
                <div className="img"></div>
                <div className="text">
                    <h2>Get detailed information</h2>
                    <p>You can use Opus to specify what every task entails, and make sure everyone is synced</p>
                </div>
            </section>
            <section className="data">
                <div className="text">
                    <h2>Better understand your progress</h2>
                    <p>Use Opus' extensive data modeling tools to get a glimpse on how your team is doing</p>
                </div>
                <div className="img"></div>
            </section>
            <section className="last-cta">
                <div className="img"></div>
                <div className="text">
                    <h2>What are you waiting for?</h2>
                    <div onClick={() => props.history.push('/board')} className="cta">View the demo now</div>
                </div>
            </section>
            <section className="about">
                <div className="about-intro">
                    <h2>Meet the Team</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia molestias possimus amet vel facere, quod officiis consequatur commodi quam repudiandae laboriosam, omnis optio quaerat debitis accusantium quae deleniti, esse sed!</p>
                </div>
                <div className="about-cards-container">
                    <div className="about-card">
                        <div className="photo">
                            <img src={yaron} alt="Yaron" />
                        </div>
                        <h3>Yaron Lipshitz</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vitae molestias omnis sapiente ex ducimus maxime nam ipsum at. Impedit neque quae beatae corrupti doloremque adipisci ut quis! Eaque, assumenda.</p>
                    </div>
                    <div className="about-card">
                        <div className="photo">
                            <img src={elad} alt="Elad" />
                        </div>
                        <h3>Elad Becker</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vitae molestias omnis sapiente ex ducimus maxime nam ipsum at. Impedit neque quae beatae corrupti doloremque adipisci ut quis! Eaque, assumenda.</p>
                    </div>
                    <div className="about-card">
                        <div className="photo"></div>
                        <h3>Daniel Dante</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vitae molestias omnis sapiente ex ducimus maxime nam ipsum at. Impedit neque quae beatae corrupti doloremque adipisci ut quis! Eaque, assumenda.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

