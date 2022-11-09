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
                <span>Copyright © AsyncAPI Project</span>
                <ul className='nav-list'>
                    {/* <li className='meta-text'>Copyright © AsyncAPI Project</li> */}
                    <li><a href='/'>Twitter</a></li>
                    <li><a href='/'>GitHub</a></li>
                    <li><a href='/'>LinkedIn</a></li>
                    <li><a href='/'>YouTube</a></li>
                    <li><a href='/'>Slack</a></li>
                    <li><a href='/'>Twitch</a></li>
                    <li><a href="mailto:press@asyncapi.io">Email Us</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Footer;