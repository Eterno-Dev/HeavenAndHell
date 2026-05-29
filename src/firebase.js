import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// =========================================================================
// INSTRUCCIONES PARA ACTIVAR FIREBASE (Para que se sincronice en ambos móviles)
// =========================================================================
// 1. Ve a https://console.firebase.google.com/ y haz click en "Añadir proyecto".
// 2. Ponle nombre (ej. "HeavenAndHell"). No hace falta Google Analytics.
// 3. En el menú izquierdo ve a "Build" > "Realtime Database" > "Create Database".
// 4. Iníciala en "Modo Prueba" (Test mode) para que ambos móviles puedan leer/escribir.
// 5. Ve a Project Settings (el engranaje arriba a la izquierda) > General.
// 6. Abajo del todo, añade una "Web App" (el icono de </>)
// 7. Te dará un código como el de abajo. Copia TUS valores y pégalos aquí.
// =========================================================================

const firebaseConfig = {
  apiKey: "AIzaSyDjwlMMKpP2GyPBTYPDcWoZNhPhss-7niI",
  authDomain: "heavenandhell-8d519.firebaseapp.com",
  databaseURL: "https://heavenandhell-8d519-default-rtdb.firebaseio.com",
  projectId: "heavenandhell-8d519",
  storageBucket: "heavenandhell-8d519.firebasestorage.app",
  messagingSenderId: "413460303000",
  appId: "1:413460303000:web:1c493024c9931aa92654ed"
};

// Como los valores aún no son reales, vamos a poner un modo "fallback" 
// para que no pete la aplicación si la pruebas sin configurar esto.
let app;
let database;
const isConfigured = firebaseConfig.apiKey !== "TU_API_KEY";

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
}

// Función para guardar puntos en la base de datos
export const savePoints = (gender, points) => {
  if (isConfigured) {
    set(ref(database, 'scores/' + gender), points);
  } else {
    // Modo simulación local
    localStorage.setItem(`hh_points_${gender}`, points);
    // Disparamos un evento para la misma ventana (por si probamos abriendo dos pestañas en el PC)
    window.dispatchEvent(new Event('storage'));
  }
};

// Función para escuchar los puntos del otro jugador en tiempo real
export const listenToScores = (callback) => {
  if (isConfigured) {
    const scoresRef = ref(database, 'scores');
    onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) callback(data);
    });
  } else {
    // Simulación local
    const getLocalScores = () => ({
      woman: parseInt(localStorage.getItem('hh_points_woman') || '0'),
      man: parseInt(localStorage.getItem('hh_points_man') || '0')
    });
    
    callback(getLocalScores());
    
    // Escuchar cambios en otras pestañas
    window.addEventListener('storage', () => {
      callback(getLocalScores());
    });
  }
};
