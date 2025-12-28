import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';
import { GraduationCap , Moon , Sun , LogOut} from 'lucide-react';

const Header = ({ isAuthenticated, onLogout }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="logo">
            <span className="logo-icon">
              <GraduationCap color="#4F46E5" size={28} style={{ verticalAlign: 'middle' }} />
            </span>
            <span className="logo-text">Campus Placement Portal</span>
          </div>
        </div>
        
        <div className="header-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' 
              ? <span><Moon color="#4F46E5" size={20} /></span>
              : <span><Sun color="#F59E42" size={20} /></span>
            }
          </button>
          
          {isAuthenticated && (
            <button className="btn btn-secondary btn-sm" onClick={onLogout}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <LogOut color="#4F46E5" size={18} />
                Logout
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;