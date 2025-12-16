import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

export default function ProfilePage() {
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const email = user ? `${user.username}@insurfox.demo` : '--'
  const initials = user?.displayName
    ? user.displayName
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'IN'

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="page profile">
      <h2>{t('profile.title', 'My Profile')}</h2>
      <div className="profile-hero card">
        <div className="avatar-badge">{initials}</div>
        <div>
          <div className="profile-name">{user?.displayName || user?.username}</div>
          <div className="profile-roles">{user ? user.roles.join(' · ') : '—'}</div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="card profile-card">
          <div className="card-title">{t('profile.contact', 'Contact')}</div>
          <div className="card-field">
            <span>{t('profile.email', 'Email')}</span>
            <span>{email}</span>
          </div>
          <div className="card-field">
            <span>{t('profile.phone', 'Phone')}</span>
            <span>+43 1 234 567</span>
          </div>
          <div className="card-field">
            <span>{t('profile.language', 'Interface language')}</span>
            <div className="language-toggle">
              <button onClick={() => i18n.changeLanguage('en')}>EN</button>
              <button onClick={() => i18n.changeLanguage('de')}>DE</button>
            </div>
          </div>
        </div>
        <div className="card profile-card">
          <div className="card-title">{t('profile.shortcuts', 'Quick shortcuts')}</div>
          <ul className="profile-links">
            <li>
              <span>{t('profile.manageCompany', 'Manage company data')}</span>
            </li>
            <li>
              <span>{t('profile.manageFleet', 'Manage fleet')}</span>
            </li>
            <li>
              <span>{t('profile.updateInsurance', 'Update insurance')}</span>
            </li>
          </ul>
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        {t('profile.logout', 'Logout')}
      </button>
    </div>
  )
}
