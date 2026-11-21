import React, { useState, useMemo, useEffect, useRef } from "react";
import './App.css';
import { 
  CalendarDays, Camera, Check, ChevronRight, Heart, Menu, Sparkles, 
  Wallet, X, Trash2, Plus, Search, RefreshCw, LayoutDashboard, ExternalLink,
  ShieldCheck, AlertCircle, CheckCircle2, Tag, DollarSign, Layers, ArrowRight,
  Star, Clock, Award, Users
} from 'lucide-react';
import { designs, poses } from './data.js';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const ADMIN_KEY = 'change-this-demo-key';

// ==================== NATIVE VECTOR ARTWORK (100% RELIABLE) ====================
function ThemeIllustration({ iconType = 'wedding', title = 'Event Celebration', tag = 'Luxury', gradient }) {
  const bgGrad = gradient || 'linear-gradient(135deg, #2b1d14 0%, #140e0a 100%)';

  return (
    <div className="event-art-wrap" style={{ background: bgGrad }}>
      <svg className="event-art-svg" viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c89b53" />
            <stop offset="50%" stopColor="#f5d796" />
            <stop offset="100%" stopColor="#c89b53" />
          </linearGradient>
          <radialGradient id="softGlow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#softGlow)" />
        <rect x="20" y="20" width="560" height="340" rx="12" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="28" y="28" width="544" height="324" rx="8" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        
        <circle cx="20" cy="20" r="4" fill="#d4af37" />
        <circle cx="580" cy="20" r="4" fill="#d4af37" />
        <circle cx="20" cy="360" r="4" fill="#d4af37" />
        <circle cx="580" cy="360" r="4" fill="#d4af37" />

        <g transform="translate(300, 160)">
          {iconType === 'wedding' && (
            <>
              <circle cx="0" cy="-10" r="65" fill="rgba(255,255,255,0.06)" stroke="url(#goldGrad)" strokeWidth="2" />
              <path d="M-30,-20 C-30,-50 30,-50 30,-20 C30,15 -30,15 -30,-20 Z" fill="none" stroke="#f3d599" strokeWidth="2.5" />
              <path d="M-12,-5 C-24,-15 -40,8 -24,24 C-6,40 0,50 0,50 C0,50 6,40 24,24 C40,8 24,-15 12,-5 C8,-2 4,1 0,4 C-4,1 -8,-2 -12,-5 Z" fill="#d4af37" opacity="0.9" />
            </>
          )}

          {iconType === 'reception' && (
            <>
              <line x1="0" y1="-80" x2="0" y2="-40" stroke="#d4af37" strokeWidth="2" />
              <path d="M-50,-40 Q0,-25 50,-40 Q0,25 -50,-40 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="2" />
              <circle cx="-35" cy="-30" r="5" fill="#fbe5ab" />
              <circle cx="0" cy="-12" r="8" fill="#ffffff" />
              <circle cx="35" cy="-30" r="5" fill="#fbe5ab" />
              <path d="M-80,40 Q0,-45 80,40" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />
              <path d="M-60,40 Q0,-30 60,40" fill="none" stroke="#e5c278" strokeWidth="1.5" strokeDasharray="3,3" />
            </>
          )}

          {iconType === 'engagement' && (
            <>
              <circle cx="-20" cy="-10" r="42" fill="none" stroke="url(#goldGrad)" strokeWidth="4.5" />
              <circle cx="20" cy="-10" r="42" fill="none" stroke="#e0d5c1" strokeWidth="4.5" />
              <polygon points="-20,-60 -10,-45 -30,-45" fill="#ffffff" stroke="#d4af37" strokeWidth="2" />
              <circle cx="-20" cy="-52" r="3" fill="#d4af37" />
            </>
          )}

          {iconType === 'birthday' && (
            <>
              <rect x="-50" y="10" width="100" height="40" rx="6" fill="#d4af37" />
              <rect x="-35" y="-20" width="70" height="30" rx="5" fill="#f4dfb2" />
              <rect x="-20" y="-46" width="40" height="26" rx="4" fill="#d4af37" />
              <rect x="-3" y="-62" width="6" height="16" fill="#ffffff" />
              <ellipse cx="0" cy="-68" rx="5" ry="8" fill="#ff9f43" />
              <circle cx="-55" cy="-40" r="4" fill="#ffffff" />
              <circle cx="55" cy="-35" r="4" fill="#f4dfb2" />
            </>
          )}

          {iconType === 'baby' && (
            <>
              <ellipse cx="0" cy="-25" rx="48" ry="56" fill="url(#goldGrad)" opacity="0.9" />
              <rect x="-18" y="45" width="36" height="25" rx="4" fill="#6c5ce7" />
              <line x1="-12" y1="30" x2="-8" y2="45" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="12" y1="30" x2="8" y2="45" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="-50" cy="20" r="22" fill="#ffffff" opacity="0.85" />
              <circle cx="45" cy="24" r="20" fill="#ffffff" opacity="0.85" />
            </>
          )}

          {iconType === 'corporate' && (
            <>
              <polygon points="-80,-55 -25,35 25,35 80,-55" fill="rgba(255,255,255,0.08)" />
              <rect x="-50" y="-15" width="100" height="55" rx="6" fill="#2d3436" stroke="url(#goldGrad)" strokeWidth="1.8" />
              <circle cx="0" cy="-38" r="14" fill="#d4af37" />
              <path d="M-20,10 Q0,-8 20,10" fill="none" stroke="#f5d796" strokeWidth="2.5" />
            </>
          )}
        </g>

        <g transform="translate(300, 275)">
          <rect x="-70" y="-13" width="140" height="26" rx="13" fill="rgba(0,0,0,0.45)" stroke="url(#goldGrad)" strokeWidth="1" />
          <text x="0" y="4" fill="#f1d59b" fontFamily="'DM Sans', sans-serif" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">{tag.toUpperCase()}</text>
        </g>

        <text x="300" y="325" fill="#ffffff" fontFamily="'Playfair Display', Georgia, serif" fontSize="24" fontWeight="600" textAnchor="middle">{title}</text>
      </svg>
    </div>
  );
}

export default function App() {
  // Page Navigation State: 'home' | 'themes' | 'designs' | 'photography' | 'budget' | 'book' | 'admin'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#/', '');
    const validPages = ['home', 'themes', 'designs', 'photography', 'budget', 'book', 'admin'];
    return validPages.includes(hash) ? hash : 'home';
  });

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '');
      const validPages = ['home', 'themes', 'designs', 'photography', 'budget', 'book', 'admin'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const [adminTab, setAdminTab] = useState('bookings'); // 'bookings' | 'themes'
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [saved, setSaved] = useState(() => {
    try {
      const stored = localStorage.getItem('eventora_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Event Themes from MongoDB
  const [themes, setThemes] = useState([]);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const [showAddThemeModal, setShowAddThemeModal] = useState(false);

  // New Theme Form
  const [newTheme, setNewTheme] = useState({
    title: '',
    category: 'Wedding',
    tag: '',
    price: 50000,
    text: '',
    iconType: 'wedding',
    gradient: 'linear-gradient(135deg, #2b1d14 0%, #140e0a 100%)'
  });

  const [showMoodboard, setShowMoodboard] = useState(false);
  const [dbStatus, setDbStatus] = useState({ connected: false, checked: false });

  // Budget Planner State
  const [budget, setBudget] = useState(100000);
  const [costs, setCosts] = useState([
    { id: '1', label: 'Decoration & Stage', amount: 30000 },
    { id: '2', label: 'Food & Catering', amount: 40000 },
    { id: '3', label: 'Photography & Video', amount: 15000 },
    { id: '4', label: 'Venue Booking', amount: 10000 }
  ]);
  const [newExpenseLabel, setNewExpenseLabel] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  // Booking Form State
  const [bookingType, setBookingType] = useState('');
  const [bookingNote, setBookingNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const bookingFormRef = useRef(null);

  // Admin Dashboard State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [adminStatusFilter, setAdminStatusFilter] = useState('All');
  const [adminSearch, setAdminSearch] = useState('');
  const [adminNotification, setAdminNotification] = useState('');

  // Save to localStorage when saved items change
  useEffect(() => {
    try {
      localStorage.setItem('eventora_saved', JSON.stringify(saved));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [saved]);

  // Check Database & API Health
  const checkHealth = async () => {
    try {
      const res = await fetch(`${API}/api/health`);
      const data = await res.json();
      setDbStatus({
        connected: data.database === 'connected',
        checked: true
      });
    } catch (err) {
      setDbStatus({ connected: false, checked: true });
    }
  };

  // Fetch Event Themes from MongoDB
  const fetchThemes = async () => {
    setLoadingThemes(true);
    try {
      const res = await fetch(`${API}/api/themes`);
      const data = await res.json();
      setThemes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching themes:', err);
    } finally {
      setLoadingThemes(false);
    }
  };

  // Fetch Bookings for Admin
  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch(`${API}/api/bookings`, {
        headers: { 'x-admin-key': ADMIN_KEY }
      });
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    checkHealth();
    fetchThemes();
    fetchBookings();
    const interval = setInterval(checkHealth, 20000);
    return () => clearInterval(interval);
  }, []);

  // Update Booking Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API}/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Status update failed');
      const updated = await res.json();
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: updated.status } : b));
      setAdminNotification(`Booking status updated to ${newStatus}`);
      setTimeout(() => setAdminNotification(''), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this booking record?')) return;
    try {
      const res = await fetch(`${API}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': ADMIN_KEY }
      });
      if (!res.ok) throw new Error('Failed to delete');
      setBookings(prev => prev.filter(b => b._id !== id));
      setAdminNotification('Booking deleted successfully.');
      setTimeout(() => setAdminNotification(''), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Create New Theme
  const handleCreateTheme = async (e) => {
    e.preventDefault();
    if (!newTheme.title || !newTheme.text) return;
    try {
      const res = await fetch(`${API}/api/themes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTheme)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create theme');
      
      setThemes(prev => [data.theme, ...prev]);
      setShowAddThemeModal(false);
      setNewTheme({
        title: '',
        category: 'Wedding',
        tag: '',
        price: 50000,
        text: '',
        iconType: 'wedding',
        gradient: 'linear-gradient(135deg, #2b1d14 0%, #140e0a 100%)'
      });
      setAdminNotification('New event theme created and published to MongoDB!');
      setTimeout(() => setAdminNotification(''), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete Theme
  const handleDeleteTheme = async (id) => {
    if (!window.confirm('Delete this event theme?')) return;
    try {
      const res = await fetch(`${API}/api/themes/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete theme');
      setThemes(prev => prev.filter(t => t._id !== id));
      setAdminNotification('Theme deleted.');
      setTimeout(() => setAdminNotification(''), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Quick Fill Demo Data
  const handleQuickFill = () => {
    const nameInput = document.getElementById('client-name');
    if (nameInput) nameInput.value = 'Abishek B';
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) emailInput.value = 'abishek@example.com';
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) phoneInput.value = '+91 98765 43210';
    setBookingType(themes[0]?.title || 'Royal Wedding Celebration');
    const locationInput = document.querySelector('input[name="location"]');
    if (locationInput) locationInput.value = 'Taj Grand Ballroom, Chennai';
    setBookingNote('Grand royal stage, floral decorations, and luxury ambient lighting.');
    const dateInput = document.querySelector('input[name="eventDate"]');
    if (dateInput) {
      const future = new Date();
      future.setDate(future.getDate() + 30);
      dateInput.value = future.toISOString().split('T')[0];
    }
  };

  // Filtered Themes
  const filteredThemes = useMemo(() => {
    return themes.filter(t => {
      const matchesCategory = category === 'All' || t.category === category;
      const matchesSearch = searchQuery === '' || 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.text.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [themes, category, searchQuery]);

  // Toggle Save Design
  const toggleSave = (title) => {
    setSaved(old => old.includes(title) ? old.filter(x => x !== title) : [...old, title]);
  };

  // Budget calculations
  const totalSpent = costs.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const remainingBudget = budget - totalSpent;
  const progressPercent = budget > 0 ? Math.min(100, (totalSpent / budget) * 100) : 100;

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpenseLabel.trim() || !newExpenseAmount) return;
    setCosts([
      ...costs,
      {
        id: Date.now().toString(),
        label: newExpenseLabel.trim(),
        amount: Math.max(0, Number(newExpenseAmount))
      }
    ]);
    setNewExpenseLabel('');
    setNewExpenseAmount('');
  };

  const handleDeleteExpense = (id) => {
    setCosts(costs.filter(c => c.id !== id));
  };

  const handleUpdateCost = (id, newAmount) => {
    setCosts(costs.map(c => c.id === id ? { ...c, amount: Math.max(0, Number(newAmount)) } : c));
  };

  // Book Theme Shortcut
  const handleSelectThemeToBook = (themeTitle) => {
    setBookingType(themeTitle);
    navigateTo('book');
  };

  // Handle Form Submission
  async function submitBooking(e) {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    
    setSubmitting(true);
    setBookingError('');
    setSubmittedBooking(null);

    try {
      const response = await fetch(`${API}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Please try again.');
      
      setSubmittedBooking(data.booking);
      fetchBookings();
      formElement.reset();
      setBookingType('');
      setBookingNote('');
    } catch (err) {
      setBookingError(err.message || 'Make sure the backend and MongoDB are running.');
    } finally {
      setSubmitting(false);
    }
  }

  // Admin filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesStatus = adminStatusFilter === 'All' || b.status === adminStatusFilter;
      const searchLower = adminSearch.toLowerCase();
      const matchesSearch = !adminSearch || 
        (b.name && b.name.toLowerCase().includes(searchLower)) ||
        (b.email && b.email.toLowerCase().includes(searchLower)) ||
        (b.eventType && b.eventType.toLowerCase().includes(searchLower)) ||
        (b.location && b.location.toLowerCase().includes(searchLower));
      return matchesStatus && matchesSearch;
    });
  }, [bookings, adminStatusFilter, adminSearch]);

  const bookingCounts = useMemo(() => {
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'Pending').length,
      confirmed: bookings.filter(b => b.status === 'Confirmed').length,
      contacted: bookings.filter(b => b.status === 'Contacted').length,
    };
  }, [bookings]);

  return (
    <>
      {/* ==================== GLOBAL NAVBAR ==================== */}
      <header className="header">
        <a className="logo" href="#/home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
          eventora<span>.</span>
        </a>

        {/* Database Status Pill */}
        <div className={`status-badge ${dbStatus.connected ? '' : 'offline'}`} title="MongoDB connection status">
          <span className="status-dot"></span>
          <span>{dbStatus.connected ? 'MongoDB Online' : 'DB Offline'}</span>
        </div>

        <nav className="nav">
          <button 
            className={`nav-link-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Home
          </button>

          <button 
            className={`nav-link-btn ${currentPage === 'themes' ? 'active' : ''}`}
            onClick={() => navigateTo('themes')}
          >
            Event Themes ({themes.length})
          </button>

          <button 
            className={`nav-link-btn ${currentPage === 'designs' ? 'active' : ''}`}
            onClick={() => navigateTo('designs')}
          >
            Inspirations
          </button>

          <button 
            className={`nav-link-btn ${currentPage === 'photography' ? 'active' : ''}`}
            onClick={() => navigateTo('photography')}
          >
            Photography
          </button>

          <button 
            className={`nav-link-btn ${currentPage === 'budget' ? 'active' : ''}`}
            onClick={() => navigateTo('budget')}
          >
            Budget Planner
          </button>

          <button 
            className="saved-pill-btn"
            onClick={() => setShowMoodboard(true)}
            aria-label="View saved moodboard"
          >
            <Heart size={14} fill={saved.length > 0 ? '#b18a50' : 'none'} color="#b18a50" />
            <span>Saved ({saved.length})</span>
          </button>

          <button 
            className={`admin-nav-btn ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => navigateTo('admin')}
          >
            <LayoutDashboard size={14} /> Admin Portal ({bookings.length || 0})
          </button>

          <button 
            className="button button-gold"
            style={{ padding: '9px 18px', borderRadius: '4px' }}
            onClick={() => navigateTo('book')}
          >
            Book an Event <ChevronRight size={15}/>
          </button>
        </nav>
      </header>

      {/* ==================== PAGE 1: HOME PAGE ==================== */}
      {currentPage === 'home' && (
        <div className="page-fade-in">
          {/* Hero Banner */}
          <section className="hero">
            <div className="hero-shade"></div>
            <div className="hero-content">
              <span className="eyebrow light"><Sparkles size={15}/> CREATE MOMENTS THAT LAST</span>
              <h1>Every celebration<br/><em>deserves a story.</em></h1>
              <p>Explore luxury event themes, manage your event finances, and submit bookings directly into your MongoDB database.</p>
              
              <div className="hero-actions">
                <button className="button button-gold" onClick={() => navigateTo('themes')}>
                  Explore Event Themes <ChevronRight size={17}/>
                </button>
                <button className="button button-dark" onClick={() => navigateTo('book')}>
                  Book an Event Now
                </button>
                <button 
                  onClick={() => setShowAddThemeModal(true)}
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '12px 18px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', borderRadius: '4px' }}
                >
                  <Plus size={15} /> + Add Event Theme
                </button>
              </div>
            </div>
            <div className="hero-note">THOUGHTFULLY PLANNED · LIVE MERN STACK</div>
          </section>

          {/* Stats Bar */}
          <div className="wrap">
            <div className="stats-strip">
              <div className="stat-item">
                <strong>1,200+</strong>
                <span>Events Planned</span>
              </div>
              <div className="stat-item">
                <strong>{themes.length}+</strong>
                <span>Custom Themes</span>
              </div>
              <div className="stat-item">
                <strong>99.8%</strong>
                <span>Client Satisfaction</span>
              </div>
              <div className="stat-item">
                <strong>{bookings.length}</strong>
                <span>MongoDB Reservations</span>
              </div>
            </div>
          </div>

          {/* Intro Section */}
          <section className="intro wrap">
            <div>
              <span className="eyebrow">WELCOME TO EVENTORA</span>
              <h2>From the first idea<br/>to the final <em>celebration.</em></h2>
            </div>
            <p>
              Eventora brings every stage of event planning together. Browse event themes, build private moodboards, calculate event budgets, and manage customer bookings in real-time.
            </p>
          </section>

          {/* Featured Themes Preview Section */}
          <section className="section wrap" style={{ paddingTop: 0 }}>
            <div className="section-title">
              <span>FEATURED OCCASIONS</span>
              <h2>Popular Celebration Themes</h2>
              <p>Explore our most loved celebration settings, fully customizable for your special day.</p>
            </div>

            <div className="event-grid">
              {themes.slice(0, 3).map((theme) => (
                <article className="event-card" key={theme._id || theme.title}>
                  <ThemeIllustration 
                    iconType={theme.iconType || 'wedding'} 
                    title={theme.title} 
                    tag={theme.tag || theme.category}
                    gradient={theme.gradient}
                  />
                  <div className="card-copy">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#a17b43', fontWeight: '700' }}>
                        {theme.category}
                      </span>
                      <strong className="theme-price-tag">
                        ₹{Number(theme.price || 50000).toLocaleString('en-IN')}
                      </strong>
                    </div>
                    <h3>{theme.title}</h3>
                    <p>{theme.text}</p>
                    <button 
                      className="card-cta-btn"
                      onClick={() => handleSelectThemeToBook(theme.title)}
                    >
                      Book This Theme <ChevronRight size={15}/>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <button 
                className="button button-dark" 
                style={{ padding: '14px 28px' }}
                onClick={() => navigateTo('themes')}
              >
                View All {themes.length} Event Themes <ArrowRight size={16}/>
              </button>
            </div>
          </section>

          {/* How It Works (3 Steps) */}
          <section style={{ background: '#f5f1ea', padding: '75px 0' }}>
            <div className="wrap">
              <div className="section-title">
                <span>SEAMLESS PLANNING</span>
                <h2>How Eventora Works</h2>
                <p>Three effortless steps to bring your vision to life.</p>
              </div>

              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-num">01</div>
                  <h3>Select or Create a Theme</h3>
                  <p>Browse our curated occasion catalog or publish custom themes directly to the database.</p>
                </div>
                <div className="step-card">
                  <div className="step-num">02</div>
                  <h3>Plan Budget & Style</h3>
                  <p>Estimate costs, customize line items, and curate private moodboards for your decor.</p>
                </div>
                <div className="step-card">
                  <div className="step-num">03</div>
                  <h3>Instant Reservation</h3>
                  <p>Submit your booking directly to MongoDB and manage requests live in the Admin Portal.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick CTA Banner */}
          <section style={{ background: '#241c16', color: 'white', padding: '70px 0', textAlign: 'center' }}>
            <div className="wrap">
              <span className="eyebrow light"><Sparkles size={14}/> READY TO BEGIN?</span>
              <h2 style={{ fontFamily: 'Playfair Display', fontSize: '38px', margin: '12px 0 16px' }}>
                Let's plan an unforgettable event together.
              </h2>
              <p style={{ color: '#c7bfb3', maxWidth: '500px', margin: '0 auto 28px', fontSize: '14px' }}>
                Send your requirements in seconds. Submissions are saved live to your MongoDB Atlas database.
              </p>
              <button 
                className="button button-gold" 
                style={{ padding: '15px 32px' }}
                onClick={() => navigateTo('book')}
              >
                Reserve Your Event Date <ChevronRight size={16}/>
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ==================== PAGE 2: EVENT THEMES PAGE ==================== */}
      {currentPage === 'themes' && (
        <div className="page-fade-in">
          <div className="page-banner">
            <span className="eyebrow"><Tag size={14} /> CURATED THEMES & PACKAGES</span>
            <h1>Explore Event <em>Themes</em></h1>
            <p>Select a setting or add your own custom theme to craft your celebration.</p>
          </div>

          <section className="section wrap">
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '30px' }}>
              <div className="search-box" style={{ margin: 0, minWidth: '300px' }}>
                <Search className="search-icon" size={16} />
                <input 
                  type="text" 
                  placeholder="Search event themes by name or description..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <button 
                className="button button-gold" 
                onClick={() => setShowAddThemeModal(true)}
                style={{ padding: '12px 20px', borderRadius: '4px' }}
              >
                <Plus size={16} /> + Add New Event Theme
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="filters">
              {['All', 'Wedding', 'Celebration', 'Professional'].map(c => (
                <button 
                  className={category === c ? 'filter active' : 'filter'} 
                  key={c} 
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Themes Grid */}
            <div className="event-grid">
              {filteredThemes.map((theme) => (
                <article className="event-card" key={theme._id || theme.title}>
                  <ThemeIllustration 
                    iconType={theme.iconType || 'wedding'} 
                    title={theme.title} 
                    tag={theme.tag || theme.category}
                    gradient={theme.gradient}
                  />

                  <div className="card-copy">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#a17b43', fontWeight: '700' }}>
                        {theme.category}
                      </span>
                      <strong className="theme-price-tag">
                        ₹{Number(theme.price || 50000).toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <h3>{theme.title}</h3>
                    <p>{theme.text}</p>
                    
                    <button 
                      className="card-cta-btn"
                      onClick={() => handleSelectThemeToBook(theme.title)}
                    >
                      Book This Theme <ChevronRight size={15}/>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ==================== PAGE 3: INSPIRATIONS PAGE ==================== */}
      {currentPage === 'designs' && (
        <div className="page-fade-in">
          <div className="page-banner">
            <span className="eyebrow"><Heart size={14} /> THE INSPIRATION EDIT</span>
            <h1>Atmosphere & <em>Aesthetics</em></h1>
            <p>Save looks to your private moodboard and attach them directly to your event enquiry.</p>
          </div>

          <section className="section wrap">
            <div className="design-grid">
              {designs.map((d) => (
                <article className="design-card" key={d.title}>
                  <ThemeIllustration 
                    iconType={d.tag === 'Wedding' ? 'wedding' : d.tag === 'Reception' ? 'reception' : 'engagement'}
                    title={d.title}
                    tag={d.tag}
                    gradient="linear-gradient(135deg, #221812 0%, #0e0906 100%)"
                  />
                  <button 
                    className={saved.includes(d.title) ? 'save saved' : 'save'} 
                    onClick={() => toggleSave(d.title)} 
                    aria-label="Save design"
                    title={saved.includes(d.title) ? 'Remove from moodboard' : 'Save to moodboard'}
                  >
                    <Heart size={18} fill={saved.includes(d.title) ? 'currentColor' : 'none'}/>
                  </button>
                  <div className="design-caption">
                    <span>{d.tag}</span>
                    <h3>{d.title}</h3>
                  </div>
                </article>
              ))}
            </div>

            {saved.length > 0 && (
              <div style={{ marginTop: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '18px 24px', borderRadius: '6px', border: '1px solid #ded8cd' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#4a4239', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={18} color="#27ae60" /> 
                  <strong>{saved.length} inspiration{saved.length > 1 ? 's' : ''} saved in your moodboard</strong>
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-small" onClick={() => setShowMoodboard(true)}>
                    View Moodboard
                  </button>
                  <button 
                    className="button button-gold"
                    style={{ padding: '8px 18px', fontSize: '12px' }}
                    onClick={() => {
                      setBookingNote(`Interested in designs: ${saved.join(', ')}`);
                      navigateTo('book');
                    }}
                  >
                    Book with these ideas
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ==================== PAGE 4: PHOTOGRAPHY PAGE ==================== */}
      {currentPage === 'photography' && (
        <div className="page-fade-in">
          <div className="page-banner">
            <span className="eyebrow"><Camera size={14} /> PHOTO GUIDE & POSES</span>
            <h1>Feel Confident in <em>Every Frame</em></h1>
            <p>Practical pose inspirations and guidance for couples, families, and candid moments.</p>
          </div>

          <section className="section wrap">
            <div className="pose-grid">
              {poses.map((p, idx) => (
                <article className="pose-card" key={p.title}>
                  <ThemeIllustration 
                    iconType={idx === 0 ? 'wedding' : idx === 1 ? 'engagement' : 'reception'}
                    title={p.title}
                    tag="Photo Guide"
                    gradient="linear-gradient(135deg, #1d1b24 0%, #0b0910 100%)"
                  />
                  <div>
                    <span>PHOTO GUIDE</span>
                    <h3>{p.title}</h3>
                    <p>{p.tip}</p>
                  </div>
                </article>
              ))}
            </div>

            <div style={{ background: '#f5f1ea', padding: '40px', borderRadius: '6px', marginTop: '40px' }}>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '12px' }}>
                Pro Photography Tips for Your Day
              </h3>
              <ul style={{ fontSize: '13px', color: '#655e55', lineHeight: '2', paddingLeft: '20px' }}>
                <li><strong>Golden Hour:</strong> Schedule 20 minutes right before sunset for warm, natural portraits.</li>
                <li><strong>Continuous Movement:</strong> Gentle walking, looking away, and natural laughter always produce more organic photos than static standing.</li>
                <li><strong>Atmospheric Lighting:</strong> Ambient fairy lights and candles add depth and warmth to night reception photos.</li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {/* ==================== PAGE 5: BUDGET PLANNER PAGE ==================== */}
      {currentPage === 'budget' && (
        <div className="page-fade-in">
          <div className="page-banner">
            <span className="eyebrow"><Wallet size={14} /> FINANCIAL PLANNER</span>
            <h1>Your Event Budget, <em>Under Control</em></h1>
            <p>Adjust your estimated costs, add custom line items, and see how much remains.</p>
          </div>

          <section className="section wrap" style={{ maxWidth: '850px' }}>
            <div className="budget-card" style={{ border: '1px solid #ded8cd', borderRadius: '6px', padding: '36px' }}>
              <label className="budget-label">
                Total event budget (₹)
                <input 
                  type="number" 
                  min="0" 
                  value={budget} 
                  onChange={e => setBudget(Math.max(0, Number(e.target.value)))}
                />
              </label>

              {/* Expense List */}
              {costs.map(item => (
                <div className="cost-row" key={item.id}>
                  <span style={{ fontSize: '13px', fontWeight: '500' }}>{item.label}</span>
                  <div className="cost-row-controls">
                    <input 
                      type="number" 
                      min="0" 
                      value={item.amount} 
                      onChange={e => handleUpdateCost(item.id, e.target.value)}
                    />
                    <button 
                      className="btn-icon-danger"
                      title="Delete expense"
                      onClick={() => handleDeleteExpense(item.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Custom Expense */}
              <form className="budget-add-row" onSubmit={handleAddExpense}>
                <input 
                  placeholder="Add expense (e.g. DJ, Bridal Makeup, Gifts)" 
                  value={newExpenseLabel}
                  onChange={e => setNewExpenseLabel(e.target.value)}
                />
                <input 
                  type="number"
                  min="0"
                  placeholder="Amount (₹)"
                  value={newExpenseAmount}
                  onChange={e => setNewExpenseAmount(e.target.value)}
                />
                <button type="submit" className="btn-small">
                  <Plus size={14} /> Add
                </button>
              </form>

              {/* Totals */}
              <div className="budget-total" style={{ marginTop: '28px' }}>
                <span>Estimated total expenses</span>
                <strong>₹{totalSpent.toLocaleString('en-IN')}</strong>
              </div>

              <div className="progress" style={{ height: '9px', borderRadius: '4px' }}>
                <span 
                  style={{
                    width: `${progressPercent}%`,
                    background: totalSpent > budget ? '#c0392b' : '#b18a50'
                  }}
                />
              </div>

              <div className="budget-remaining">
                <span>{totalSpent > budget ? 'Over budget by' : 'Remaining budget'}</span>
                <strong style={{ color: totalSpent > budget ? '#c0392b' : '#27ae60' }}>
                  ₹{Math.abs(remainingBudget).toLocaleString('en-IN')}
                </strong>
              </div>

              <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #eee8df', paddingTop: '24px' }}>
                <button 
                  className="button button-gold"
                  onClick={() => navigateTo('book')}
                >
                  Proceed to Book Event with this Budget <ChevronRight size={16}/>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ==================== PAGE 6: BOOKING PAGE ==================== */}
      {currentPage === 'book' && (
        <div className="page-fade-in">
          <div className="page-banner">
            <span className="eyebrow"><CalendarDays size={14} /> DIRECT RESERVATION</span>
            <h1>Book Your <em>Event Date</em></h1>
            <p>Tell us about your occasion. Submissions are saved directly into your live MongoDB database.</p>
          </div>

          <section className="section wrap booking-section" style={{ maxWidth: '850px' }}>
            <form className="booking-form" onSubmit={submitBooking} ref={bookingFormRef}>
              <label>
                Your full name *
                <input 
                  id="client-name" 
                  name="name" 
                  required 
                  placeholder="e.g. Abishek B" 
                />
              </label>

              <label>
                Email address *
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="abishek@example.com" 
                />
              </label>

              <label>
                Phone number
                <input 
                  name="phone" 
                  placeholder="+91 98765 43210" 
                />
              </label>

              <label>
                Selected Event / Theme *
                <select 
                  name="eventType" 
                  required 
                  value={bookingType}
                  onChange={e => setBookingType(e.target.value)}
                >
                  <option value="" disabled>Select event theme</option>
                  {themes.map(t => (
                    <option key={t._id || t.title} value={t.title}>
                      {t.title} ({t.category}) — ₹{Number(t.price || 50000).toLocaleString('en-IN')}
                    </option>
                  ))}
                  <option value="Custom Event">Custom Event</option>
                </select>
              </label>

              <label>
                Event date *
                <input 
                  name="eventDate" 
                  type="date" 
                  required 
                  min={new Date().toISOString().split('T')[0]}
                />
              </label>

              <label>
                Location / City
                <input 
                  name="location" 
                  placeholder="e.g. Taj Palace, Chennai" 
                />
              </label>

              <label className="full">
                Special requirements, theme preferences & ideas
                <textarea 
                  name="message" 
                  rows="4" 
                  value={bookingNote}
                  onChange={e => setBookingNote(e.target.value)}
                  placeholder="Theme customisations, guest count, reference ideas..."
                />
              </label>

              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="button button-gold" type="submit" disabled={submitting}>
                  {submitting ? 'Submitting to database...' : <>Confirm & Book Event <ChevronRight size={17}/></>}
                </button>
                <button 
                  type="button" 
                  className="button"
                  style={{ background: '#eee8df', color: '#4a4237' }}
                  onClick={handleQuickFill}
                  title="Click to instantly fill sample booking data"
                >
                  ✨ Auto-fill Sample Data
                </button>
              </div>

              {/* Error Message */}
              {bookingError && (
                <div style={{ gridColumn: '1 / -1', background: '#fff5f5', color: '#c53030', padding: '14px', borderRadius: '4px', border: '1px solid #feb2b2', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={18} />
                  <span>{bookingError}</span>
                </div>
              )}

              {/* Success Receipt Card */}
              {submittedBooking && (
                <div className="booking-success-card">
                  <CheckCircle2 size={36} color="#27ae60" style={{ margin: '0 auto 10px' }} />
                  <h3>Booking Successfully Saved to MongoDB!</h3>
                  <p>
                    Thank you, <strong>{submittedBooking.name}</strong>. Your event reservation for <strong>{submittedBooking.eventType}</strong> has been stored in your live database.
                  </p>
                  <div>
                    <span className="booking-ref-badge">
                      MongoDB Reference ID: {submittedBooking._id}
                    </span>
                  </div>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button 
                      type="button"
                      className="button button-gold"
                      onClick={() => navigateTo('admin')}
                    >
                      <LayoutDashboard size={16} /> View in Live Admin Portal
                    </button>
                    <button 
                      type="button"
                      className="button button-dark"
                      onClick={() => setSubmittedBooking(null)}
                    >
                      Book Another Event
                    </button>
                  </div>
                </div>
              )}
            </form>
          </section>
        </div>
      )}

      {/* ==================== PAGE 7: ADMIN PORTAL PAGE ==================== */}
      {currentPage === 'admin' && (
        <div className="page-fade-in admin-section">
          <div className="wrap">
            <div className="admin-header">
              <div className="admin-title-wrap">
                <span className="eyebrow">ADMINISTRATION CONSOLE</span>
                <h2>Live Bookings & Event Themes</h2>
                <p>Manage customer reservations and customize event themes directly in MongoDB.</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button 
                  className="button button-gold"
                  onClick={() => setShowAddThemeModal(true)}
                >
                  <Plus size={15} /> + Add Event Theme
                </button>
                <button 
                  className="button button-dark" 
                  onClick={() => { fetchBookings(); fetchThemes(); }} 
                  disabled={loadingBookings}
                >
                  <RefreshCw size={14} className={loadingBookings ? 'spin' : ''} />
                  {loadingBookings ? 'Refreshing...' : 'Refresh'}
                </button>
                <button 
                  className="button"
                  style={{ background: '#eee8df', color: '#29241f' }}
                  onClick={() => navigateTo('home')}
                >
                  Back to Website
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {adminNotification && (
              <div style={{ background: '#eef7ee', color: '#276727', padding: '12px 18px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #c7e6c7' }}>
                {adminNotification}
              </div>
            )}

            {/* Statistics Cards */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <span>Total Bookings</span>
                <strong>{bookingCounts.total}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Pending Review</span>
                <strong style={{ color: '#b7791f' }}>{bookingCounts.pending}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Confirmed Bookings</span>
                <strong style={{ color: '#27ae60' }}>{bookingCounts.confirmed}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Active Event Themes</span>
                <strong style={{ color: '#a17b43' }}>{themes.length}</strong>
              </div>
            </div>

            {/* Admin Tabs */}
            <div className="admin-tab-bar">
              <button 
                className={`admin-tab-btn ${adminTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setAdminTab('bookings')}
              >
                Customer Bookings ({bookings.length})
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'themes' ? 'active' : ''}`}
                onClick={() => setAdminTab('themes')}
              >
                Event Themes Manager ({themes.length})
              </button>
            </div>

            {/* TAB 1: BOOKINGS TABLE */}
            {adminTab === 'bookings' ? (
              <>
                {/* Filter Bar */}
                <div className="admin-filter-bar">
                  <div className="admin-filters-left">
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginRight: '6px' }}>Status:</span>
                    {['All', 'Pending', 'Contacted', 'Confirmed', 'Cancelled'].map(st => (
                      <button 
                        key={st}
                        className={adminStatusFilter === st ? 'filter active' : 'filter'}
                        onClick={() => setAdminStatusFilter(st)}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div style={{ minWidth: '260px' }}>
                    <input 
                      type="text"
                      placeholder="Search by client, email or city..."
                      value={adminSearch}
                      onChange={e => setAdminSearch(e.target.value)}
                      style={{ width: '100%', padding: '8px 14px', border: '1px solid #ded8cd', borderRadius: '20px', fontSize: '12px', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Bookings Table */}
                <div className="table-responsive">
                  <table className="bookings-table">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Contact Details</th>
                        <th>Occasion / Theme</th>
                        <th>Event Date</th>
                        <th>Location</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map(b => (
                          <tr key={b._id}>
                            <td>
                              <strong>{b.name}</strong>
                              <div style={{ fontSize: '11px', color: '#888' }}>ID: {b._id.slice(-6)}</div>
                            </td>
                            <td>
                              <div>{b.email}</div>
                              {b.phone && <div style={{ fontSize: '11px', color: '#777' }}>{b.phone}</div>}
                            </td>
                            <td>
                              <span style={{ fontWeight: '600', color: '#a17b43' }}>{b.eventType}</span>
                            </td>
                            <td>
                              {b.eventDate ? new Date(b.eventDate).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              }) : '—'}
                            </td>
                            <td>{b.location || '—'}</td>
                            <td style={{ maxWidth: '180px', fontSize: '12px', color: '#666' }}>
                              {b.message || '—'}
                            </td>
                            <td>
                              <select 
                                className={`status-select ${b.status}`}
                                value={b.status}
                                onChange={(e) => handleStatusChange(b._id, e.target.value)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td>
                              <button 
                                className="btn-icon-danger"
                                title="Delete booking"
                                onClick={() => handleDeleteBooking(b._id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8">
                            <div className="empty-bookings-box">
                              <h4>No bookings found</h4>
                              <p>Use the booking form on the website to submit an event reservation!</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              /* TAB 2: THEMES MANAGER */
              <div className="theme-admin-grid">
                {themes.map(t => (
                  <div className="theme-admin-card" key={t._id}>
                    <ThemeIllustration 
                      iconType={t.iconType || 'wedding'}
                      title={t.title}
                      tag={t.tag || t.category}
                      gradient={t.gradient}
                    />
                    <div className="theme-admin-body">
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', color: '#a17b43', fontWeight: '700', textTransform: 'uppercase' }}>{t.category}</span>
                          <strong style={{ color: '#27ae60' }}>₹{Number(t.price || 50000).toLocaleString('en-IN')}</strong>
                        </div>
                        <h3 style={{ fontSize: '18px', margin: '4px 0 8px' }}>{t.title}</h3>
                        <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.5' }}>{t.text}</p>
                      </div>
                      
                      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button 
                          className="btn-small"
                          onClick={() => handleSelectThemeToBook(t.title)}
                        >
                          Book Theme
                        </button>
                        <button 
                          className="btn-icon-danger"
                          title="Delete theme"
                          onClick={() => handleDeleteTheme(t._id)}
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== ADD THEME MODAL ==================== */}
      {showAddThemeModal && (
        <div className="modal-overlay" onClick={() => setShowAddThemeModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create & Publish Event Theme</h3>
              <button 
                className="modal-close-btn" 
                onClick={() => setShowAddThemeModal(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTheme}>
              <div className="modal-body">
                <div className="theme-form">
                  <label>
                    Theme Title *
                    <input 
                      required 
                      placeholder="e.g. Royal Palace Sangeet"
                      value={newTheme.title}
                      onChange={e => setNewTheme({ ...newTheme, title: e.target.value })}
                    />
                  </label>

                  <label>
                    Category *
                    <select 
                      value={newTheme.category}
                      onChange={e => setNewTheme({ ...newTheme, category: e.target.value })}
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Celebration">Celebration</option>
                      <option value="Professional">Professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label>
                    Theme Tag
                    <input 
                      placeholder="e.g. Palace Mandap / Neon Party"
                      value={newTheme.tag}
                      onChange={e => setNewTheme({ ...newTheme, tag: e.target.value })}
                    />
                  </label>

                  <label>
                    Estimated Package Price (₹)
                    <input 
                      type="number"
                      min="0"
                      placeholder="e.g. 75000"
                      value={newTheme.price}
                      onChange={e => setNewTheme({ ...newTheme, price: Number(e.target.value) })}
                    />
                  </label>

                  <label>
                    Illustration Style
                    <select 
                      value={newTheme.iconType}
                      onChange={e => {
                        const it = e.target.value;
                        const gradMap = {
                          wedding: 'linear-gradient(135deg, #2b1d14 0%, #140e0a 100%)',
                          reception: 'linear-gradient(135deg, #1a1d28 0%, #0d0f15 100%)',
                          engagement: 'linear-gradient(135deg, #2a1824 0%, #130a10 100%)',
                          birthday: 'linear-gradient(135deg, #2a1a10 0%, #130d08 100%)',
                          baby: 'linear-gradient(135deg, #1c222c 0%, #0f131a 100%)',
                          corporate: 'linear-gradient(135deg, #171c24 0%, #0d1015 100%)'
                        };
                        setNewTheme({ ...newTheme, iconType: it, gradient: gradMap[it] || newTheme.gradient });
                      }}
                    >
                      <option value="wedding">Royal Floral Mandap (Wedding)</option>
                      <option value="reception">Crystal Chandelier Gala (Reception)</option>
                      <option value="engagement">Diamond Ring & Florals (Engagement)</option>
                      <option value="birthday">Celebration Cake & Balloons (Birthday)</option>
                      <option value="baby">Pastel Balloon & Clouds (Baby Shower)</option>
                      <option value="corporate">Executive Stage & Keynote (Corporate)</option>
                    </select>
                  </label>

                  <label>
                    Theme Color Palette
                    <select 
                      value={newTheme.gradient}
                      onChange={e => setNewTheme({ ...newTheme, gradient: e.target.value })}
                    >
                      <option value="linear-gradient(135deg, #2b1d14 0%, #140e0a 100%)">Royal Gold & Espresso</option>
                      <option value="linear-gradient(135deg, #1a1d28 0%, #0d0f15 100%)">Midnight Blue & Silver</option>
                      <option value="linear-gradient(135deg, #2a1824 0%, #130a10 100%)">Rose Velvet & Blush</option>
                      <option value="linear-gradient(135deg, #16241b 0%, #0a120c 100%)">Emerald Botanical</option>
                    </select>
                  </label>

                  <label className="full">
                    Description & Highlights *
                    <textarea 
                      rows="3"
                      required
                      placeholder="Describe the decor, lighting, atmosphere and arrangements included in this theme..."
                      value={newTheme.text}
                      onChange={e => setNewTheme({ ...newTheme, text: e.target.value })}
                    />
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="button"
                  style={{ background: '#eee8df', color: '#333' }}
                  onClick={() => setShowAddThemeModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="button button-gold">
                  <Check size={16} /> Publish Theme to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MOODBOARD MODAL ==================== */}
      {showMoodboard && (
        <div className="modal-overlay" onClick={() => setShowMoodboard(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Your Saved Inspiration Moodboard</h3>
              <button 
                className="modal-close-btn" 
                onClick={() => setShowMoodboard(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {saved.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                  {designs.filter(d => saved.includes(d.title)).map(d => (
                    <div className="saved-card-item" key={d.title}>
                      <ThemeIllustration 
                        iconType="wedding"
                        title={d.title}
                        tag={d.tag}
                        gradient="linear-gradient(135deg, #221812 0%, #0e0906 100%)"
                      />
                      <div className="saved-card-info">
                        <span>{d.title}</span>
                        <button 
                          className="btn-icon-danger"
                          title="Remove design"
                          onClick={() => toggleSave(d.title)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
                  <Heart size={36} color="#ccc" style={{ marginBottom: '10px' }} />
                  <p>You haven't saved any designs yet.</p>
                  <p style={{ fontSize: '13px' }}>Click the heart icon on any design in the inspiration section to add it here!</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {saved.length > 0 ? (
                <>
                  <button 
                    style={{ background: 'none', border: 0, color: '#c0392b', fontSize: '12px', cursor: 'pointer' }}
                    onClick={() => setSaved([])}
                  >
                    Clear all saved
                  </button>
                  <button 
                    className="button button-gold"
                    onClick={() => {
                      setShowMoodboard(false);
                      setBookingNote(`Interested in designs: ${saved.join(', ')}`);
                      navigateTo('book');
                    }}
                  >
                    Book with these ideas <ChevronRight size={15} />
                  </button>
                </>
              ) : (
                <button 
                  className="button button-dark" 
                  onClick={() => setShowMoodboard(false)}
                  style={{ margin: '0 auto' }}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== GLOBAL FOOTER ==================== */}
      <footer>
        <div className="wrap footer-inner">
          <a className="logo" href="#/home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
            eventora<span>.</span>
          </a>
          <p>Thoughtfully planned. Beautifully remembered. Full-Stack MERN Project.</p>
          <span>© {new Date().getFullYear()} Eventora</span>
        </div>
      </footer>
    </>
  );
}
