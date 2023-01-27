import './Footer.css';

function Footer() {
    return (
        <>
            <p>
                {/* Made with  ❤️  by the AsyncAPI Initiative. */}
                {/* Copyright © AsyncAPI Project a Series of LF Projects, LLC. For web site terms of use, <br></br>
                    trademark policy and general project policies please see https://lfprojects.org */}
            </p>
            <nav className='footer-nav' aria-label="footer">
                <span>Made with <i>:love:</i> by the AsyncAPI Initiative</span>
                <ul className='nav-list'>
                    {/* <li className='meta-text'>Copyright © AsyncAPI Project</li> */}
                    <li><a href='https://twitter.com/AsyncAPISpec'>Twitter</a></li>
                    <li><a href='https://github.com/asyncapi'>GitHub</a></li>
                    <li><a href='https://www.linkedin.com/company/asyncapi/'>LinkedIn</a></li>
                    <li><a href='https://www.youtube.com/asyncapi'>YouTube</a></li>
                    <li><a href='https://app.slack.com/client/T34F2JRQU/C34F2JV0U'>Slack</a></li>
                    <li><a href='https://www.twitch.tv/asyncapi'>Twitch</a></li>
                    <li><a href="mailto:press@asyncapi.io">Email Us</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Footer;