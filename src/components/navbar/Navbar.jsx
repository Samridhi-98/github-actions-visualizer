import './Navbar.css'
import AsyncAPILogo from '../../images/AsyncAPILogoLight';

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className='logo'>
                    <a href='https://www.asyncapi.com/' target='_blank' rel='noreferrer'>
                        <AsyncAPILogo />
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Navbar;