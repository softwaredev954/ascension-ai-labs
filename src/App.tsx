import { useState } from 'react'

type IconName = 'grid' | 'chat' | 'book' | 'users' | 'settings' | 'search' | 'bell' | 'arrow' | 'spark' | 'clock' | 'check' | 'menu' | 'close'
type IconProps = { name: IconName; size?: number }

const paths: Record<IconName, React.ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></>,
  chat: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7-.2.1a7.8 7.8 0 0 1-1.5.9l-.2.1-.3 1.8h-2.8l-.3-1.8-.2-.1a7.8 7.8 0 0 1-1.5-.9l-.2-.1-1.7.7-1.4-2.4 1.4-1.1.1-.2a7.5 7.5 0 0 1 0-1.8l-.1-.2-1.4-1.1 1.4-2.4 1.7.7.2-.1a7.8 7.8 0 0 1 1.5-.9l.2-.1.3-1.8h2.8l.3 1.8.2.1a7.8 7.8 0 0 1 1.5.9l.2.1 1.7-.7 1.4 2.4-1.4 1.1-.1.2a7.5 7.5 0 0 1 0 1.8Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  arrow: <><path d="M7 17 17 7M7 7h10v10"/></>,
  spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1 2.5 2.5 1-2.5 1L19 21l-1-2.5-2.5-1 2.5-1L19 14Z"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  close: <><path d="m18 6-12 12M6 6l12 12"/></>,
}

function Icon({ name, size = 18 }: IconProps) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

const navItems: { label: string; icon: IconName }[] = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Conversations', icon: 'chat' },
  { label: 'Knowledge base', icon: 'book' },
  { label: 'Customers', icon: 'users' },
]

const conversations = [
  { initials: 'MC', name: 'Maria Clara', message: 'Do you ship to Cebu City?', time: '2 min ago', state: 'AI replied', color: 'blue' },
  { initials: 'JD', name: 'Juan Dela Cruz', message: 'Can I get more details about the Starter Kit?', time: '18 min ago', state: 'Needs review', color: 'amber' },
  { initials: 'AS', name: 'Andrea Santos', message: 'Thank you, that answered my question!', time: '42 min ago', state: 'Resolved', color: 'green' },
  { initials: 'RL', name: 'Rico Lim', message: 'What payment methods do you accept?', time: '1 hr ago', state: 'AI replied', color: 'blue' },
]

interface AppProps {
  email: string
  fullName: string
  workspaceName: string
  onSignOut: () => void
}

function App({ email, fullName, workspaceName, onSignOut }: AppProps) {
  const [active, setActive] = useState('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const shownConversations = conversations.filter((item) => `${item.name} ${item.message}`.toLowerCase().includes(search.toLowerCase()))
  const displayName = fullName || email
  const initials = displayName.split(/[.\s@_-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'U'

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Icon name="spark" size={21}/></div><div><strong>ASCENSION</strong><span>AI LABS</span></div><button className="mobile-close icon-button" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><Icon name="close"/></button></div>
        <div className="workspace-label">WORKSPACE</div>
        <button className="workspace-switch"><span className="workspace-avatar">{workspaceName.charAt(0).toUpperCase() || 'A'}</span><span className="workspace-name"><strong>{workspaceName || 'My workspace'}</strong><small>Free plan</small></span><span className="chevron">⌄</span></button>
        <nav className="main-nav" aria-label="Main navigation">
          <div className="nav-group-label">MANAGE</div>
          {navItems.map((item) => <button key={item.label} className={`nav-item ${active === item.label ? 'nav-active' : ''}`} onClick={() => { setActive(item.label); setMobileOpen(false) }}><Icon name={item.icon}/><span>{item.label}</span>{item.label === 'Conversations' && <span className="nav-count">8</span>}</button>)}
          <div className="nav-group-label tools-label">PREFERENCES</div>
          <button className={`nav-item ${active === 'Settings' ? 'nav-active' : ''}`} onClick={() => { setActive('Settings'); setMobileOpen(false) }}><Icon name="settings"/><span>Settings</span></button>
        </nav>
        <div className="sidebar-bottom"><div className="usage-card"><div className="usage-title"><span>Monthly usage</span><span>68%</span></div><div className="usage-track"><span/></div><p>680 of 1,000 AI responses</p><button onClick={() => setActive('Settings')}>View plan details <Icon name="arrow" size={14}/></button></div><button className="profile" onClick={onSignOut} aria-label={`Sign out ${displayName}`}><span className="profile-avatar">{initials}</span><span className="profile-text"><strong>{displayName}</strong><small>Owner · Sign out</small></span><span className="chevron">↗</span></button></div>
      </aside>
      {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)}/>}

      <main className="main-area">
        <header className="topbar"><button className="mobile-menu icon-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Icon name="menu"/></button><div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div><div className="topbar-actions"><label className="search-box"><Icon name="search" size={17}/><input aria-label="Search conversations" placeholder="Search conversations..." value={search} onChange={(event) => setSearch(event.target.value)}/><kbd>⌘ K</kbd></label><button className="notification icon-button" aria-label="Notifications"><Icon name="bell"/><i/></button><div className="top-avatar">{initials}</div></div></header>
        <div className="page-content">
          <section className="welcome-row"><div><div className="eyebrow"><span className="live-dot"/> YOUR BUSINESS, IN GOOD HANDS</div><h1>{active === 'Overview' ? `Good morning, ${fullName.split(' ')[0] || 'there'}` : active}</h1><p className="page-subtitle">Here’s what’s happening with your assistant today.</p></div><button className="date-button"><Icon name="clock" size={16}/> Last 30 days <span>⌄</span></button></section>

          <section className="stats-grid" aria-label="Business statistics">
            <article className="stat-card"><div className="stat-top"><span>Total conversations</span><span className="stat-icon blue-icon"><Icon name="chat" size={17}/></span></div><div className="stat-value">1,284</div><div className="stat-foot"><span className="trend-up">↗ 12.8%</span><span>vs. last month</span></div><div className="sparkline spark-blue"><svg viewBox="0 0 130 34" preserveAspectRatio="none"><path d="M1 27 C12 25 14 13 25 18 S42 28 51 18 S68 16 77 19 S91 6 100 12 S117 7 129 2"/></svg></div></article>
            <article className="stat-card"><div className="stat-top"><span>AI responses</span><span className="stat-icon cyan-icon"><Icon name="spark" size={17}/></span></div><div className="stat-value">936</div><div className="stat-foot"><span className="trend-up">↗ 8.2%</span><span>vs. last month</span></div><div className="sparkline spark-cyan"><svg viewBox="0 0 130 34" preserveAspectRatio="none"><path d="M1 29 C13 24 15 26 26 16 S42 22 52 15 S69 19 77 11 S91 15 100 8 S115 12 129 3"/></svg></div></article>
            <article className="stat-card"><div className="stat-top"><span>Needs your attention</span><span className="stat-icon amber-icon"><Icon name="clock" size={17}/></span></div><div className="stat-value">12</div><div className="stat-foot"><span className="attention-copy">4 waiting over 1 hour</span></div><div className="stat-mini-bar"><span/></div></article>
            <article className="stat-card"><div className="stat-top"><span>Leads captured</span><span className="stat-icon green-icon"><Icon name="users" size={17}/></span></div><div className="stat-value">48</div><div className="stat-foot"><span className="trend-up">↗ 16.4%</span><span>vs. last month</span></div><div className="sparkline spark-green"><svg viewBox="0 0 130 34" preserveAspectRatio="none"><path d="M1 28 C12 23 19 29 28 22 S43 26 53 13 S68 21 78 14 S91 15 102 7 S116 14 129 3"/></svg></div></article>
          </section>

          <section className="content-grid"><article className="panel activity-panel"><div className="panel-heading"><div><h2>Conversation activity</h2><p>Volume and assistant performance</p></div><button className="select-button">Last 30 days <span>⌄</span></button></div><div className="chart-legend"><span><i className="legend-blue"/> Conversations</span><span><i className="legend-cyan"/> AI resolved</span></div><div className="chart-wrap"><div className="y-labels"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div><div className="chart"><div className="grid-line line-1"/><div className="grid-line line-2"/><div className="grid-line line-3"/><div className="grid-line line-4"/><svg viewBox="0 0 720 190" preserveAspectRatio="none" role="img" aria-label="Line chart showing conversations and AI resolved trending upward over 30 days"><defs><linearGradient id="areaBlue" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#48a9ff" stopOpacity=".18"/><stop offset="1" stopColor="#48a9ff" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d="M0 151 C35 143 45 132 75 140 S120 125 150 131 S195 107 225 119 S270 94 300 108 S345 91 375 97 S420 73 450 85 S495 63 525 75 S570 55 600 66 S645 38 675 49 S700 34 720 24 L720 190 L0 190Z"/><path className="chart-line chart-line-blue" d="M0 151 C35 143 45 132 75 140 S120 125 150 131 S195 107 225 119 S270 94 300 108 S345 91 375 97 S420 73 450 85 S495 63 525 75 S570 55 600 66 S645 38 675 49 S700 34 720 24"/><path className="chart-line chart-line-cyan" d="M0 171 C35 164 45 153 75 160 S120 149 150 153 S195 134 225 141 S270 120 300 130 S345 116 375 121 S420 101 450 110 S495 92 525 100 S570 83 600 92 S645 72 675 79 S700 66 720 59"/></svg><div className="x-labels"><span>May 01</span><span>May 07</span><span>May 14</span><span>May 21</span><span>May 30</span></div></div></div></article>
            <article className="panel assistant-panel"><div className="panel-heading"><div><h2>Assistant health</h2><p>Knowledge-backed responses</p></div><span className="health-status"><i/> Active</span></div><div className="assistant-visual"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="assistant-core"><Icon name="spark" size={28}/></div><span className="orbit-dot dot-one"/><span className="orbit-dot dot-two"/></div><div className="resolution-number">84.6<span>%</span></div><p className="resolution-label">resolved without your help</p><div className="assistant-divider"/><div className="health-row"><span><i className="check-dot"><Icon name="check" size={11}/></i>Knowledge base</span><strong>42 articles</strong></div><div className="health-row"><span><i className="check-dot"><Icon name="check" size={11}/></i>Response time</span><strong>1.2 sec avg.</strong></div></article></section>

          <section className="panel conversations-panel"><div className="panel-heading conversation-heading"><div><h2>Recent conversations</h2><p>Keep track of your latest customer interactions</p></div><button className="text-action" onClick={() => setActive('Conversations')}>View all conversations <Icon name="arrow" size={15}/></button></div><div className="conversation-list">{shownConversations.length ? shownConversations.map((item) => <div className="conversation-row" key={item.name}><div className={`customer-avatar avatar-${item.color}`}>{item.initials}</div><div className="conversation-copy"><strong>{item.name}</strong><span>{item.message}</span></div><span className={`status-pill status-${item.color}`}>{item.state}</span><time>{item.time}</time><button className="row-more" aria-label={`More options for ${item.name}`}>···</button></div>) : <div className="empty-search">No conversations match “{search}”.</div>}</div><div className="table-footer"><span>Showing {shownConversations.length} of 1,284 conversations</span><button onClick={() => setActive('Conversations')}>Open inbox <span>→</span></button></div></section>

          <footer className="page-footer"><span>© 2025 Ascension AI Labs</span><span><i className="secure-dot"/> All systems operational</span><a href="mailto:support@ascensionailabs.com">Need help?</a></footer>
        </div>
      </main>
    </div>
  )
}

export default App
