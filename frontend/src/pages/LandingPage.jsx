import { LayoutTemplate, Menu, X } from 'lucide-react';
import { landingPageStyles } from '../assets/dummystyles.js';
import { useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [MobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={landingPageStyles.container}>
      {/*HEADER*/}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>ResumeExpert</span>
          </div>
          {/*Mobile Menu btn*/}
          <button className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!MobileMenuOpen)}>
            {MobileMenuOpen ?
              <X size={24} className={landingPageStyles.mobileMenuIcon} /> :
              <Menu size={24} className={landingPageStyles.mobileMenuIcon} />}
          </button>
          {/*Desktop Navigation Menu*/}
          <div className='hidden md:flex items-center'>
            {user}
          </div>
        </div>
      </header>
    </div>
  )


};

export default LandingPage;
