// firebase-config.js - Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyAp3ZQcwLnzg69mUKw2dCvj5_zXsf--26w",
    authDomain: "flip-667d7.firebaseapp.com",
    databaseURL: "https://flip-667d7-default-rtdb.firebaseio.com",
    projectId: "flip-667d7",
    storageBucket: "flip-667d7.firebasestorage.app",
    messagingSenderId: "1002991562020",
    appId: "1:1002991562020:web:78eaf511fc8e7346d417b1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// Connection state
let isFirebaseConnected = false;

// Monitor Firebase connection
const connectedRef = database.ref('.info/connected');
connectedRef.on('value', (snap) => {
    if (snap.val() === true) {
        isFirebaseConnected = true;
        console.log('✅ Connected to Firebase');
        updateDebugLog('Firebase', 'Connected', 'success');
    } else {
        isFirebaseConnected = false;
        console.log('❌ Disconnected from Firebase');
        updateDebugLog('Firebase', 'Disconnected', 'error');
    }
});

// Anonymous authentication
async function initializeAuth() {
    try {
        await auth.signInAnonymously();
        const user = auth.currentUser;
        console.log('🔐 Authenticated as:', user.uid);
        updateDebugLog('Auth', `Signed in: ${user.uid}`, 'success');
        return user.uid;
    } catch (error) {
        console.error('❌ Auth error:', error);
        updateDebugLog('Auth', `Error: ${error.message}`, 'error');
        // Fallback: generate local ID
        return 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Cleanup old rooms (older than 2 hours)
function cleanupOldRooms() {
    const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);
    
    database.ref('rooms').orderByChild('createdAt').endAt(twoHoursAgo).once('value', (snapshot) => {
        snapshot.forEach((room) => {
            if (room.val().status === 'waiting') {
                room.ref.remove();
                console.log('🗑️ Cleaned up room:', room.key);
            }
        });
    });
}

// Run cleanup every 30 minutes
setInterval(cleanupOldRooms, 30 * 60 * 1000);
