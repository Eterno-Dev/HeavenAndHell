import React, { useState, useEffect } from 'react';
import { savePoints, listenToScores } from '../firebase';
import confetti from 'canvas-confetti';

// ==========================================
// RETOS Y TIENDA
// ==========================================
const challenges = {
  phase1: {
    woman: {
      role: 'Demonio', icon: '😈',
      items: [
        { id: 'w1_1', text: 'Morderle el labio suavemente', points: 3 },
        { id: 'w1_2', text: 'Dejarle una marca de pintalabios rojo en el moflete o cuello', points: 4 },
        { id: 'w1_3', text: 'Acariciarle por debajo de la mesa durante la cena', points: 5 },
        { id: 'w1_4', text: 'Susurrarle al oído alguna cosa subida de tono que piensas hacerle', points: 2 },
        { id: 'w1_5', text: 'Darle un azote "sin venir a cuento" de repente', points: 3 },
        { id: 'w1_6', text: 'Empujarle suavemente contra la pared o puerta al llegar', points: 4 },
        { id: 'w1_7', text: 'Morderte el labio inferior y mirarlo de manera sexy durante una conversación', points: 3 },
        { id: 'w1_8', text: 'Hacer que se arrodille', points: 3 },
        { id: 'w1_9', text: 'Guiar su mano hacia una parte sexy de tu cuerpo', points: 3 },
        { id: 'w1_10', text: 'Chuparle un dedo de la mano de manera sexy', points: 2 }
      ]
    },
    man: {
      role: 'Ángel', icon: '😇',
      items: [
        { id: 'm1_1', text: 'Alabar su apariencia y ropa', points: 2 },
        { id: 'm1_2', text: 'Darle un beso en la mano de forma elegante en el paseo', points: 2 },
        { id: 'm1_3', text: 'Hacerle un piropo/cumplido elaborado mirándole a los ojos en la cena', points: 3 },
        { id: 'm1_4', text: 'Servirle la bebida o el plato especial sin que lo pida', points: 2 },
        { id: 'm1_5', text: 'Sostenerle la mirada sin apartarla durante 1 minuto en silencio', points: 4 },
        { id: 'm1_6', text: 'Pedir permiso siempre antes de tocarla (todo el tiempo)', points: 5 },
        { id: 'm1_7', text: 'Regalarle un anillo de rodillas y ponérselo en el dedo', points: 6 },
        { id: 'm1_8', text: 'Regalarle una rosa', points: 3 },
        { id: 'm1_9', text: 'Conseguir que te diga que tu comida está muy buena', points: 3 },
        { id: 'm1_10', text: 'Hacer que Demonio diga "Te amo" o "Eres el Mejor"', points: 2 }
      ]
    }
  },
  phase2: {
    woman: {
      role: 'Ángel', icon: '😇',
      items: [
        { id: 'w2_1', text: 'Conseguir que bailéis juntos una canción lenta', points: 5 },
        { id: 'w2_2', text: 'Ponerte el antifaz / vendarte los ojos y dejarte guiar a ciegas', points: 4 },
        { id: 'w2_3', text: 'Cumplir 3 órdenes seguidas del Demonio sin rechistar', points: 5 },
        { id: 'w2_4', text: 'Llenarle la espalda entera de besos', points: 3 },
        { id: 'w2_5', text: 'Dejar que te espose o te ate durante 5 minutos', points: 6 }
      ]
    },
    man: {
      role: 'Demonio', icon: '😈',
      items: [
        { id: 'm2_1', text: 'Usar el pintalabios rojo de ella para dibujar/escribir algo en sus nalgas', points: 3 },
        { id: 'm2_2', text: 'Elegir un disfraz y hacer que se lo ponga', points: 4 },
        { id: 'm2_3', text: 'Vendarle los ojos y conseguir sacar algún gemido', points: 6 },
        { id: 'm2_4', text: 'Conseguir que te arañe o muerda mientras la molestas', points: 5 },
        { id: 'm2_5', text: 'Hacer que cumpla una orden estricta que no pueda romper en toda la noche', points: 5 }
      ]
    }
  }
};

const storeItems = [
  { id: 's1', text: 'Obligarle a hacer un baile de Just Dance "caliente"', price: 6 },
  { id: 's2', text: 'Quitarle una prenda a tu elección', price: 4 },
  { id: 's3', text: 'Obligarle a llevar los ojos vendados 5 min', price: 5 },
  { id: 's4', text: 'Exigir 4 minutos de masaje donde tú elijas', price: 4 },
  { id: 's5', text: 'Quedar esposado/a durante 10 min', price: 7 },
  { id: 's6', text: 'Te debe llamar "Mi Señor/a" durante 10 min', price: 3 },
  { id: 's7', text: 'Hacerte un masaje en los pies de 3 minutos', price: 3 },
  { id: 's8', text: 'Contarte un chiste malo y si no te ríes tiene que darte un beso', price: 2 },
  { id: 's9', text: 'Pasar la lengua suavemente por la parte del cuerpo que tú elijas', price: 4 }
];

const romanticStoreItems = [
  { id: 'r1', text: 'Masaje a elección del comprador durante 4 min', price: 6 },
  { id: 'r3', text: 'Decirle a la persona "Te amo" 30 veces susurrándole al oído', price: 4 },
  { id: 'r4', text: 'Cantar una canción romántica de Spotify a tu elección', price: 8 },
  { id: 'r5', text: 'Un beso lento y apasionado de 1 minuto sin interrupciones', price: 6 },
  { id: 'r6', text: 'Un beso suave y tierno', price: 2 },
  { id: 'r7', text: 'Acariciarte el pelo relajadamente durante 3 minutos', price: 3 },
  { id: 'r8', text: 'Un abrazo interminable de 2 minutos en silencio', price: 4 },
  { id: 'r9', text: 'Acompañarte hasta la puerta de la mano para despedirse', price: 2 }
];

function PhaseManager({ gender }) {
  const [realPhase, setRealPhase] = useState(0);
  const [debugPhase, setDebugPhase] = useState(null);
  
  const [checkedItems1, setCheckedItems1] = useState({});
  const [checkedItems2, setCheckedItems2] = useState({});
  
  // Persist voting state in localStorage so closing the browser doesn't reset it
  const [hasVoted1, setHasVoted1] = useState(localStorage.getItem('hh_voted1') === 'true');
  const [hasVoted2, setHasVoted2] = useState(localStorage.getItem('hh_voted2') === 'true');

  const [rawScores, setRawScores] = useState({ 
    woman: { earned: 0, missed: 0, spent: 0 }, 
    man: { earned: 0, missed: 0, spent: 0 } 
  });

  const [cardIndex, setCardIndex] = useState(0);
  const [showAlarmPopup, setShowAlarmPopup] = useState(true);
  const [showAlarmPopup2, setShowAlarmPopup2] = useState(true);
  const [showStore, setShowStore] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const [storeCardIndex, setStoreCardIndex] = useState(0);
  const [storeTouchStart, setStoreTouchStart] = useState(null);
  const [storeTouchEnd, setStoreTouchEnd] = useState(null);
  
  const [purchaseMessage, setPurchaseMessage] = useState(null);

  // Time Logic Loop
  useEffect(() => {
    listenToScores((scores) => {
      if (scores.woman === undefined) {
        setRawScores({
           woman: { earned: scores.woman || 0, missed: 0, spent: 0 },
           man: { earned: scores.man || 0, missed: 0, spent: 0 }
        });
      } else {
        setRawScores(scores);
      }
    });

    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Changed to < 5 so at 05:00 AM it resets to Phase 0 for the next day
      const effectiveHours = hours < 5 ? hours + 24 : hours;
      const currentTime = effectiveHours * 100 + minutes;

      if (currentTime >= 2440) setRealPhase(3);         // 00:40 Tienda Romántica
      else if (currentTime >= 2430) setRealPhase(2.5);  // 00:30 Votar Fase 2
      else if (currentTime >= 2200) setRealPhase(2);    // 22:00 Fase 2
      else if (currentTime >= 2150) setRealPhase(1.5);  // 21:50 Votar Fase 1
      else if (currentTime >= 1930) setRealPhase(1);    // 19:30 Fase 1
      else setRealPhase(0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const phase = debugPhase !== null ? debugPhase : realPhase;

  // Auto-reset Database and local state when in Phase 0 or 1
  useEffect(() => {
    if (phase === 0 || phase === 1) {
      localStorage.removeItem('hh_voted1');
      localStorage.removeItem('hh_voted2');
      setHasVoted1(false);
      setHasVoted2(false);

      const w = rawScores.woman || { earned: 0, missed: 0, spent: 0 };
      const m = rawScores.man || { earned: 0, missed: 0, spent: 0 };

      // Only reset if they are not already 0 to prevent infinite write loops
      if (w.earned !== 0 || w.missed !== 0 || w.spent !== 0 || m.earned !== 0 || m.missed !== 0 || m.spent !== 0) {
        savePoints('woman', { earned: 0, missed: 0, spent: 0 });
        savePoints('man', { earned: 0, missed: 0, spent: 0 });
      }
    }
  }, [phase, rawScores]);

  // Reset index and popup when switching phases
  useEffect(() => {
    if (phase === 1) setShowAlarmPopup(true);
    if (phase === 2) setShowAlarmPopup2(true);
    setCardIndex(0);
    setStoreCardIndex(0);
  }, [phase]);

  const handleCheck1 = (id) => setCheckedItems1(prev => ({ ...prev, [id]: !prev[id] }));
  const handleCheck2 = (id) => setCheckedItems2(prev => ({ ...prev, [id]: !prev[id] }));

  const submitVote = (phaseNum) => {
    const currentChallenges = phaseNum === 1 ? challenges.phase1[gender].items : challenges.phase2[gender].items;
    const checkedState = phaseNum === 1 ? checkedItems1 : checkedItems2;
    
    let earnedPoints = 0;
    let missedPoints = 0;
    
    currentChallenges.forEach(item => {
      if (checkedState[item.id]) earnedPoints += item.points;
      else missedPoints += item.points;
    });
    
    const updatedUserScores = {
      earned: (rawScores[gender]?.earned || 0) + earnedPoints,
      missed: (rawScores[gender]?.missed || 0) + missedPoints,
      spent: rawScores[gender]?.spent || 0
    };

    savePoints(gender, updatedUserScores);
    
    if (phaseNum === 1) {
      setHasVoted1(true);
      localStorage.setItem('hh_voted1', 'true');
    } else {
      setHasVoted2(true);
      localStorage.setItem('hh_voted2', 'true');
    }
  };

  const buyItem = (price, isRomantic, text) => {
    const currentPoints = calculatePoints(gender);
    if (currentPoints >= price) {
      const updatedUserScores = {
        ...rawScores[gender],
        spent: (rawScores[gender]?.spent || 0) + price
      };
      savePoints(gender, updatedUserScores);
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: isRomantic ? ['#FF69B4', '#FFFFFF', '#FFB6C1'] : ['#FFD700', '#FF0000', '#000000']
      });

      setPurchaseMessage(text);
      setTimeout(() => {
        setPurchaseMessage(null);
        if (!isRomantic) setShowStore(false);
      }, 3000);
    } else {
      alert('No tienes suficientes puntos oscuros para comprar esto.');
    }
  };

  const calculatePoints = (targetGender) => {
    const partnerGender = targetGender === 'woman' ? 'man' : 'woman';
    const earned = rawScores[targetGender]?.earned || 0;
    const stolen = rawScores[partnerGender]?.missed || 0;
    const spent = rawScores[targetGender]?.spent || 0;
    return earned + stolen - spent;
  };

  // Swipe handlers for Main Cards
  const onTouchStartEvent = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMoveEvent = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const roleData = phase === 1 || phase === 1.5 ? challenges.phase1[gender] : challenges.phase2[gender];
    const maxIndex = roleData.items.length - 1;
    if (distance > 50 && cardIndex < maxIndex) setCardIndex(cardIndex + 1);
    if (distance < -50 && cardIndex > 0) setCardIndex(cardIndex - 1);
  };

  // Swipe handlers for Store Modal
  const onStoreTouchStart = (e) => { setStoreTouchEnd(null); setStoreTouchStart(e.targetTouches[0].clientX); };
  const onStoreTouchMove = (e) => setStoreTouchEnd(e.targetTouches[0].clientX);
  const onStoreTouchEnd = () => {
    if (!storeTouchStart || !storeTouchEnd) return;
    const distance = storeTouchStart - storeTouchEnd;
    const currentList = phase === 3 ? romanticStoreItems : storeItems;
    const maxIndex = currentList.length - 1;
    if (distance > 50 && storeCardIndex < maxIndex) setStoreCardIndex(storeCardIndex + 1);
    if (distance < -50 && storeCardIndex > 0) setStoreCardIndex(storeCardIndex - 1);
  };

  const DebugControls = () => (
    <div style={{ position: 'fixed', bottom: '10px', left: '10px', display: 'flex', gap: '5px', zIndex: 9999, flexWrap: 'wrap', maxWidth: '300px' }}>
      <button onClick={() => setDebugPhase(0)} style={{ fontSize: '0.6rem', padding: '5px', background: '#333', color: '#fff', border: '1px solid #555' }}>W</button>
      <button onClick={() => setDebugPhase(1)} style={{ fontSize: '0.6rem', padding: '5px', background: '#333', color: '#fff', border: '1px solid #555' }}>F1</button>
      <button onClick={() => setDebugPhase(1.5)} style={{ fontSize: '0.6rem', padding: '5px', background: '#333', color: '#fff', border: '1px solid #555' }}>V1</button>
      <button onClick={() => setDebugPhase(2)} style={{ fontSize: '0.6rem', padding: '5px', background: '#333', color: '#fff', border: '1px solid #555' }}>F2</button>
      <button onClick={() => setDebugPhase(2.5)} style={{ fontSize: '0.6rem', padding: '5px', background: '#333', color: '#fff', border: '1px solid #555' }}>V2</button>
      <button onClick={() => setDebugPhase(3)} style={{ fontSize: '0.6rem', padding: '5px', background: '#333', color: '#fff', border: '1px solid #555' }}>F3</button>
      <button onClick={() => setDebugPhase(null)} style={{ fontSize: '0.6rem', padding: '5px', background: '#800', color: '#fff', border: '1px solid #a00' }}>Real</button>
    </div>
  );

  const StoreSlider = ({ items, isRomantic }) => {
    const currentItem = items[storeCardIndex] || items[0];
    const themeColor = isRomantic ? '#FF69B4' : '#FFD700'; // Pink for romantic, gold for dark
    const themeBg = isRomantic ? 'linear-gradient(145deg, rgba(80,20,50,1) 0%, rgba(10,5,10,1) 100%)' : 'linear-gradient(145deg, rgba(50,40,0,1) 0%, rgba(10,8,0,1) 100%)';

    return (
      <div 
        onTouchStart={onStoreTouchStart} onTouchMove={onStoreTouchMove} onTouchEnd={onStoreTouchEnd}
        style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <button onClick={() => storeCardIndex > 0 && setStoreCardIndex(storeCardIndex - 1)} style={{ position: 'absolute', left: '-10px', background: 'none', border: 'none', color: storeCardIndex > 0 ? '#fff' : '#333', fontSize: '2rem', cursor: 'pointer', zIndex: 10 }}>‹</button>

        <div style={{
          background: themeBg, padding: '2rem 1.5rem',
          borderRadius: '16px', border: `1px solid rgba(${isRomantic ? '255,105,180' : '255,215,0'},0.3)`, boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          textAlign: 'center', width: '80%', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.4', fontFamily: 'var(--font-sans)', fontWeight: 300, marginBottom: '2rem' }}>{currentItem?.text}</p>
          <button 
            onClick={() => buyItem(currentItem?.price, isRomantic, currentItem?.text)}
            style={{ background: themeColor, color: '#000', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', width: '100%', cursor: 'pointer', fontSize: '1rem' }}
          >
            Comprar ({currentItem?.price} pts)
          </button>
        </div>

        <button onClick={() => storeCardIndex < items.length - 1 && setStoreCardIndex(storeCardIndex + 1)} style={{ position: 'absolute', right: '-10px', background: 'none', border: 'none', color: storeCardIndex < items.length - 1 ? '#fff' : '#333', fontSize: '2rem', cursor: 'pointer', zIndex: 10 }}>›</button>
      </div>
    );
  };

  const StoreModal = () => (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal-content" style={{ borderColor: '#FFD700', padding: '2rem 1rem', width: '100%', maxWidth: '350px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', color: '#FFD700', margin: 0, fontWeight: 900 }}>TIENDA OSCURA</h3>
          <button onClick={() => setShowStore(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', padding: '0 10px' }}>×</button>
        </div>
        
        <div style={{ background: 'rgba(255,215,0,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
          Tus puntos: <strong style={{ fontSize: '1.5rem', color: '#FFD700' }}>{calculatePoints(gender)}</strong>
        </div>

        <StoreSlider items={storeItems} isRomantic={false} />
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '1.5rem' }}>
          {storeItems.map((_, idx) => (
            <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === storeCardIndex ? '#FFD700' : 'rgba(255,255,255,0.2)' }}></div>
          ))}
        </div>
      </div>
    </div>
  );

  const StoreButton = () => (
    <button onClick={() => setShowStore(true)} style={{ position: 'fixed', top: '15px', left: '15px', background: '#FFD700', color: '#000', border: 'none', borderRadius: '50%', width: '50px', height: '50px', fontSize: '1.5rem', boxShadow: '0 0 15px rgba(255,215,0,0.5)', cursor: 'pointer', zIndex: 100 }}>
      🛒
    </button>
  );

  const PurchaseOverlay = () => purchaseMessage ? (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.85)', zIndex: 9999, animation: 'fadeIn 0.3s ease-out' }}>
      <h2 style={{ fontSize: '3rem', color: '#FFF', textShadow: '0 0 20px rgba(255,255,255,0.8)', marginBottom: '1rem' }}>¡COMPRADO!</h2>
      <p style={{ color: 'var(--accent-red)', fontSize: '1.5rem', textAlign: 'center', padding: '0 2rem' }}>{purchaseMessage}</p>
    </div>
  ) : null;

  const roleData = phase === 1 || phase === 1.5 ? challenges.phase1[gender] : challenges.phase2[gender];

  if (phase === 0) {
    return (
      <div className="screen-container">
        <h2 style={{ marginBottom: '2rem', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 300 }}>Sala de Espera</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>Aún no es el momento. <br/>La primera información se revelará a las 19:30.</p>
        {gender === 'woman' && (
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-red)', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}>
            <p style={{ color: '#fff', fontSize: '1rem', textAlign: 'left', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block', letterSpacing: '1px' }}>SECRETO (SOLO PARA TI)</strong></p>
            <p style={{ fontSize: '1.1rem' }}>Debes traer contigo un pintalabios rojo (no hace falta que sea caro) para más adelante.</p>
          </div>
        )}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-red)', width: '100%', maxWidth: '400px' }}>
          <p style={{ color: '#fff', fontSize: '1rem', textAlign: 'left' }}><strong style={{ color: 'var(--accent-red)', display: 'block', marginBottom: '0.5rem' }}>⚠️ IMPORTANTE</strong>Recuerda colocar la alarma a las <strong>19:30</strong> y revisar otra vez la web en ese momento.</p>
        </div>
        <DebugControls />
      </div>
    );
  }

  if (phase === 1 || phase === 2) {
    const isPhase2 = phase === 2;
    const currentCard = roleData.items[cardIndex];
    const totalCards = roleData.items.length;

    return (
      <div className="screen-container" style={{ justifyContent: 'center', position: 'relative' }}>
        <PurchaseOverlay />
        {isPhase2 && <div style={{ position: 'absolute', left: '15px', top: '0', zIndex: 6 }}><StoreButton /></div>}
        {showStore && <StoreModal />}

        {showAlarmPopup && !isPhase2 && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ borderColor: 'var(--accent-red)' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', color: 'var(--accent-red)', marginBottom: '1rem', fontWeight: 900 }}>ALERTA OBLIGATORIA</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Pon una alarma para las <strong>21:50</strong> AHORA MISMO.</p>
              <button className="btn btn-primary" onClick={() => setShowAlarmPopup(false)}>YA ESTÁ PUESTA</button>
            </div>
          </div>
        )}

        {showAlarmPopup2 && isPhase2 && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ borderColor: 'var(--accent-red)' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', color: 'var(--accent-red)', marginBottom: '1rem', fontWeight: 900 }}>LA ÚLTIMA ALARMA</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Pon una alarma para las <strong>00:30</strong> AHORA MISMO.</p>
              <button className="btn btn-primary" onClick={() => setShowAlarmPopup2(false)}>YA ESTÁ PUESTA</button>
            </div>
          </div>
        )}

        {!isPhase2 && (
          <div style={{ position: 'absolute', top: '20px', background: 'var(--accent-red)', padding: '0.5rem 1rem', borderRadius: '4px', textAlign: 'center' }}>
            <strong style={{ fontSize: '1rem', display: 'block' }}>ALARMA 21:50</strong>
            <span style={{ fontSize: '0.7rem' }}>La fase de retos acaba al sonar la alarma.</span>
          </div>
        )}
        
        {isPhase2 && (
          <div style={{ position: 'absolute', top: '10px', width: '100%', left: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5 }}>
            <h2 style={{ color: 'var(--accent-red)', fontSize: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 900, margin: 0 }}>SWITCH</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>Roles Invertidos</span>
            <div style={{ display: 'flex', gap: '15px', background: 'rgba(0,0,0,0.6)', padding: '5px 15px', borderRadius: '20px', border: '1px solid #FFD700' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span>👠</span> <strong style={{ color: '#FFD700' }}>{calculatePoints('woman')}</strong></div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><strong style={{ color: '#FFD700' }}>{calculatePoints('man')}</strong> <span>👔</span></div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: isPhase2 ? '6rem' : '4rem' }}>
          <span style={{ fontSize: '2.5rem' }}>{roleData.icon}</span>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}>Eres el {roleData.role}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Desliza para ver tus retos</p>
        </div>
        
        <div 
          onTouchStart={onTouchStartEvent} onTouchMove={onTouchMoveEvent} onTouchEnd={onTouchEndEvent}
          style={{ width: '100%', maxWidth: '350px', position: 'relative', display: 'flex', alignItems: 'center' }}
        >
          <button onClick={() => cardIndex > 0 && setCardIndex(cardIndex - 1)} style={{ position: 'absolute', left: '-30px', background: 'none', border: 'none', color: cardIndex > 0 ? '#fff' : '#333', fontSize: '2rem', cursor: 'pointer', zIndex: 10 }}>‹</button>
          <div style={{
            background: 'linear-gradient(145deg, rgba(30,30,30,1) 0%, rgba(10,10,10,1) 100%)', padding: '3rem 2rem',
            borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
            textAlign: 'center', width: '100%', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
          }}>
            <span style={{ color: 'var(--accent-red)', fontSize: '1rem', letterSpacing: '3px', fontWeight: 600, display: 'block', marginBottom: '1.5rem' }}>
              RETO {cardIndex + 1} DE {totalCards}
            </span>
            <p style={{ fontSize: '1.5rem', lineHeight: '1.4', fontFamily: 'var(--font-sans)', fontWeight: 300 }}>{currentCard?.text}</p>
          </div>
          <button onClick={() => cardIndex < totalCards - 1 && setCardIndex(cardIndex + 1)} style={{ position: 'absolute', right: '-30px', background: 'none', border: 'none', color: cardIndex < totalCards - 1 ? '#fff' : '#333', fontSize: '2rem', cursor: 'pointer', zIndex: 10 }}>›</button>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
          {roleData.items.map((_, idx) => (
            <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === cardIndex ? 'var(--accent-red)' : 'rgba(255,255,255,0.2)' }}></div>
          ))}
        </div>

        <DebugControls />
      </div>
    );
  }

  if (phase === 1.5 || phase === 2.5) {
    const isPhase2Voting = phase === 2.5;
    const hasVoted = isPhase2Voting ? hasVoted2 : hasVoted1;
    const items = isPhase2Voting ? challenges.phase2[gender].items : challenges.phase1[gender].items;
    const checkedItems = isPhase2Voting ? checkedItems2 : checkedItems1;
    const handleCheck = isPhase2Voting ? handleCheck2 : handleCheck1;
    const phaseNum = isPhase2Voting ? 2 : 1;

    if (hasVoted) {
      return (
        <div className="screen-container">
          <h2 style={{ marginBottom: '2rem', color: 'var(--accent-red)', fontFamily: 'var(--font-sans)', fontWeight: 900 }}>PUNTUACIONES</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Los puntos que no conseguiste se los ha robado tu pareja.
          </p>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>👠</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: calculatePoints('woman') >= calculatePoints('man') ? '#FFD700' : '#fff' }}>{calculatePoints('woman')} pts</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>👔</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: calculatePoints('man') >= calculatePoints('woman') ? '#FFD700' : '#fff' }}>{calculatePoints('man')} pts</div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isPhase2Voting ? 'Esperando a las 00:40 para el cierre romántico...' : 'Esperando a las 22:00 para el gran SWITCH...'}
          </p>
          <DebugControls />
        </div>
      );
    }

    return (
      <div className="screen-container" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent-red)', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 900 }}>HORA DE VOTAR</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>Marca los retos que has cumplido.<br/><strong style={{ color: 'var(--accent-red)' }}>Lo que NO marques, se lo sumará tu pareja.</strong></p>
        
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {items.map(item => {
            const isChecked = checkedItems[item.id];
            return (
              <div key={item.id} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: isChecked ? '4px solid #fff' : '4px solid #555' }} onClick={() => handleCheck(item.id)}>
                  <div style={{ width: '24px', height: '24px', border: '2px solid #fff', borderRadius: '50%', marginRight: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: isChecked ? '#fff' : 'transparent', flexShrink: 0 }}>
                    {isChecked && <span style={{ color: '#000', fontSize: '14px' }}>✓</span>}
                  </div>
                  <div style={{ flex: 1, color: isChecked ? '#fff' : 'var(--text-secondary)' }}>
                    {item.text} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>({item.points} pts)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="btn btn-primary" onClick={() => submitVote(phaseNum)} style={{ marginTop: '2rem' }}>ENVIAR PUNTOS</button>
        <DebugControls />
      </div>
    );
  }

  // Phase 3: Final Romantic Store
  if (phase === 3) {
    return (
      <div className="screen-container" style={{ justifyContent: 'center' }}>
        <PurchaseOverlay />
        <h2 style={{ color: '#FF69B4', fontSize: '2rem', fontFamily: 'var(--font-sans)', fontWeight: 900, marginBottom: '0.5rem', textAlign: 'center' }}>FIN DE LA NOCHE</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Elige tus recompensas románticas finales.</p>
        
        <div style={{ background: 'rgba(255,105,180,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
          Tus puntos: <strong style={{ fontSize: '1.5rem', color: '#FF69B4' }}>{calculatePoints(gender)}</strong>
        </div>

        <StoreSlider items={romanticStoreItems} isRomantic={true} />
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '1.5rem' }}>
          {romanticStoreItems.map((_, idx) => (
            <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === storeCardIndex ? '#FF69B4' : 'rgba(255,255,255,0.2)' }}></div>
          ))}
        </div>

        <DebugControls />
      </div>
    );
  }

  return null;
}

export default PhaseManager;
