import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Film,
  Heart,
  MapPin,
  Menu,
  Play,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Ticket,
  UserRound,
  X,
} from 'lucide-react';

type Movie = {
  id: number;
  title: string;
  category: string;
  rating: string;
  duration: string;
  year: string;
  genre: string;
  image: string;
  description: string;
  accent: string;
};

const movies: Movie[] = [
  {
    id: 1,
    title: 'The Last Signal',
    category: 'Now Showing',
    rating: '8.7',
    duration: '2h 14m',
    year: '2024',
    genre: 'Sci-Fi / Thriller',
    image: 'https://images.pexels.com/photos/8273620/pexels-photo-8273620.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'When a mysterious transmission reaches Earth, one astronaut must decide what humanity is ready to hear.',
    accent: '#e96b43',
  },
  {
    id: 2,
    title: 'After Midnight',
    category: 'Now Showing',
    rating: '9.1',
    duration: '1h 56m',
    year: '2024',
    genre: 'Drama / Mystery',
    image: 'https://images.pexels.com/photos/7991409/pexels-photo-7991409.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A late-night radio host uncovers a city-wide secret hiding in the static between songs.',
    accent: '#c77453',
  },
  {
    id: 3,
    title: 'Parallel Lines',
    category: 'Coming Soon',
    rating: '8.4',
    duration: '2h 08m',
    year: '2025',
    genre: 'Romance / Drama',
    image: 'https://images.pexels.com/photos/7991488/pexels-photo-7991488.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Two strangers keep meeting in different versions of the same city — and only one remembers.',
    accent: '#8b9c82',
  },
  {
    id: 4,
    title: 'No Exit',
    category: 'Now Showing',
    rating: '7.9',
    duration: '1h 48m',
    year: '2024',
    genre: 'Action / Crime',
    image: 'https://images.pexels.com/photos/7991506/pexels-photo-7991506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A getaway driver finds one final job waiting for him at the end of the road.',
    accent: '#62798b',
  },
];

const showtimes = ['10:30 AM', '1:15 PM', '4:00 PM', '7:30 PM', '10:45 PM'];
const bookedSeats = ['A3', 'A4', 'B6', 'C2', 'C3', 'D7', 'E5', 'F1', 'F2', 'G8'];

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'movies' | 'bookings'>('home');
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All genres');
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTime, setSelectedTime] = useState(showtimes[2]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredMovies = useMemo(() => movies.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = selectedGenre === 'All genres' || movie.genre.includes(selectedGenre);
    return matchesQuery && matchesGenre;
  }), [query, selectedGenre]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const openBooking = (movie: Movie) => {
    setSelectedMovie(movie);
    setSelectedSeats([]);
    setConfirmed(false);
  };

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><span className="brand-mark"><Film size={18} /></span><span>IMOVIES</span></div>
        <nav className="side-nav">
          <button className={activeTab === 'home' ? 'active' : ''} onClick={() => { setActiveTab('home'); setMenuOpen(false); }}><span>01</span> Discover</button>
          <button className={activeTab === 'movies' ? 'active' : ''} onClick={() => { setActiveTab('movies'); setMenuOpen(false); }}><span>02</span> Movies</button>
          <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => { setActiveTab('bookings'); setMenuOpen(false); }}><span>03</span> My bookings</button>
        </nav>
        <div className="sidebar-footer"><div className="mini-profile"><div className="avatar">JD</div><div><strong>Jamie Doe</strong><small>Member since 2023</small></div><ChevronDown size={15} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"><Menu size={22} /></button>
          <div className="location"><MapPin size={16} /><span>New York, NY</span><ChevronDown size={14} /></div>
          <div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><button className="profile-button"><div className="avatar small">JD</div><span>Jamie</span><ChevronDown size={14} /></button></div>
        </header>

        {activeTab === 'bookings' ? <Bookings onBrowse={() => setActiveTab('home')} /> : <>
          <section className="hero-section">
            <div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT GREAT STORY</div>
            <h1>Find your seat.<br /><em>Find your story.</em></h1>
            <p className="hero-copy">Curated cinema for curious minds. Discover what’s playing and make tonight worth remembering.</p>
            <div className="hero-actions"><button className="primary-button" onClick={() => document.getElementById('now-showing')?.scrollIntoView({ behavior: 'smooth' })}>Browse movies <ArrowRight size={17} /></button><button className="play-button"><span><Play size={13} fill="currentColor" /></span> How it works</button></div>
            <div className="hero-stats"><div><strong>120+</strong><span>Films this month</span></div><div><strong>18</strong><span>Premium theaters</span></div><div><strong>4.9/5</strong><span>Member rating</span></div></div>
          </section>

          <section className="featured-strip">
            <div className="featured-image" style={{ backgroundImage: `url(${movies[0].image})` }}><div className="image-overlay" /></div>
            <div className="featured-copy"><div className="eyebrow light"><span className="eyebrow-line" /> FEATURED TONIGHT</div><h2>The Last Signal</h2><p>A breathtaking journey beyond the edge of what we know.</p><div className="featured-meta"><span><Star size={14} fill="currentColor" /> 8.7</span><span>2024</span><span>2h 14m</span></div><button className="light-button" onClick={() => openBooking(movies[0])}>Book a screening <ArrowRight size={16} /></button></div>
            <div className="featured-number">01 <span>/ 04</span></div>
          </section>

          <section className="content-section" id="now-showing">
            <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> THE SELECTION</div><h2>Now showing</h2></div><button className="text-button" onClick={() => setActiveTab('movies')}>View all movies <ArrowRight size={16} /></button></div>
            <div className="filter-row"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search films..." /></div><div className="genre-filters">{['All genres', 'Drama', 'Action', 'Sci-Fi'].map((genre) => <button key={genre} className={selectedGenre === genre ? 'selected' : ''} onClick={() => setSelectedGenre(genre)}>{genre}</button>)}</div></div>
            <div className="movie-grid">{filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} favorite={favorites.includes(movie.id)} onFavorite={() => toggleFavorite(movie.id)} onBook={() => openBooking(movie)} />)}</div>
            {filteredMovies.length === 0 && <div className="empty-state">No films match that search. Try another title or genre.</div>}
          </section>

          <section className="membership-banner"><div><div className="eyebrow light"><span className="eyebrow-line" /> MAKE IT A HABIT</div><h2>More stories.<br /><em>More rewards.</em></h2></div><p>Join IMovies+ to get early access, free upgrades, and a ticket on us every month.</p><button className="outline-light">Explore membership <ArrowRight size={16} /></button></section>
        </>}
      </main>

      {selectedMovie && <BookingModal movie={selectedMovie} selectedTime={selectedTime} selectedSeats={selectedSeats} confirmed={confirmed} onTime={setSelectedTime} onSeat={toggleSeat} onClose={() => setSelectedMovie(null)} onConfirm={() => setConfirmed(true)} />}
    </div>
  );
}

function MovieCard({ movie, favorite, onFavorite, onBook }: { movie: Movie; favorite: boolean; onFavorite: () => void; onBook: () => void }) {
  return <article className="movie-card"><div className="poster-wrap"><img src={movie.image} alt={movie.title} /><div className="poster-shade" /><button className={`favorite ${favorite ? 'liked' : ''}`} onClick={onFavorite} aria-label="Toggle favorite"><Heart size={16} fill={favorite ? 'currentColor' : 'none'} /></button><div className="rating"><Star size={12} fill="currentColor" /> {movie.rating}</div><button className="quick-book" onClick={onBook}>Book now <ArrowRight size={14} /></button></div><div className="movie-info"><div><h3>{movie.title}</h3><p>{movie.genre}</p></div><span className="duration">{movie.duration}</span></div></article>;
}

function BookingModal({ movie, selectedTime, selectedSeats, confirmed, onTime, onSeat, onClose, onConfirm }: { movie: Movie; selectedTime: string; selectedSeats: string[]; confirmed: boolean; onTime: (time: string) => void; onSeat: (seat: string) => void; onClose: () => void; onConfirm: () => void }) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const seats = rows.flatMap((row) => Array.from({ length: 8 }, (_, index) => `${row}${index + 1}`));
  const total = selectedSeats.length * 18;
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="booking-modal"><button className="close-modal" onClick={onClose} aria-label="Close booking"><X size={20} /></button>{confirmed ? <div className="confirmation"><div className="success-icon"><Check size={28} /></div><div className="eyebrow"><span className="eyebrow-line" /> BOOKING CONFIRMED</div><h2>Your seats are waiting.</h2><p>Your tickets for <strong>{movie.title}</strong> are confirmed for {selectedTime}. We’ve sent the details to your inbox.</p><div className="ticket-summary"><div><small>SCREENING</small><strong>{movie.title}</strong></div><div><small>SEATS</small><strong>{selectedSeats.join(', ')}</strong></div><div><small>TOTAL</small><strong>${total}.00</strong></div></div><button className="primary-button" onClick={onClose}>Done <Check size={16} /></button></div> : <><div className="modal-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> RESERVE YOUR SEAT</div><h2>{movie.title}</h2><p><CalendarDays size={15} /> Today, October 29 · Landmark Cinema</p></div><div className="modal-poster"><img src={movie.image} alt="" /></div></div><div className="showtime-picker"><h3>Choose a showtime</h3><div className="time-options">{showtimes.map((time) => <button key={time} className={selectedTime === time ? 'selected' : ''} onClick={() => onTime(time)}><Clock3 size={14} />{time}</button>)}</div></div><div className="seat-picker"><div className="seat-heading"><h3>Choose your seats</h3><span>{selectedSeats.length} selected</span></div><div className="screen">SCREEN</div><div className="seat-grid">{seats.map((seat) => <button key={seat} aria-label={`Seat ${seat}`} disabled={bookedSeats.includes(seat)} className={`${bookedSeats.includes(seat) ? 'booked' : ''} ${selectedSeats.includes(seat) ? 'chosen' : ''}`} onClick={() => onSeat(seat)}>{seat.slice(1)}</button>)}</div><div className="seat-legend"><span><i className="available" /> Available</span><span><i className="chosen" /> Selected</span><span><i className="booked" /> Taken</span></div></div><div className="booking-footer"><div><small>TOTAL</small><strong>${total}.00</strong></div><button className="primary-button" disabled={!selectedSeats.length} onClick={onConfirm}>Continue to payment <ArrowRight size={16} /></button></div></>}</div></div>;
}

function Bookings({ onBrowse }: { onBrowse: () => void }) {
  return <section className="bookings-page"><div className="eyebrow"><span className="eyebrow-line" /> YOUR IMOVIES</div><h1>My bookings</h1><div className="booking-card"><div className="booking-card-art" style={{ backgroundImage: `url(${movies[0].image})` }} /><div className="booking-card-copy"><span className="confirmed-label"><Check size={13} /> Confirmed</span><h2>The Last Signal</h2><p><CalendarDays size={15} /> Today, October 29 · 7:30 PM</p><p><MapPin size={15} /> Landmark Cinema · Screen 04</p><div className="booking-card-bottom"><span>Seats A5, A6</span><button className="text-button">View ticket <ArrowRight size={15} /></button></div></div></div><div className="empty-bookings"><Ticket size={25} /><h3>Looking for another story?</h3><p>There are plenty of great films waiting for you.</p><button className="primary-button" onClick={onBrowse}>Browse movies <ArrowRight size={16} /></button></div></section>;
}

export default App;
