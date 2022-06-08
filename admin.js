
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
// import { setPersistence, getAuth, signInAnonymously,browserSessionPersistence,onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
// import { getDatabase, ref, set} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js';


// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyCA-OOViIaHEMqpZN-OUtGmfUi-frvbUqc",
//     authDomain: "jplangtest.firebaseapp.com",
//     projectId: "jplangtest",
//     storageBucket: "jplangtest.appspot.com",
//     messagingSenderId: "202780482027",
//     appId: "1:202780482027:web:35c8ecf645ba5e7cc7e1ae"
// })

// const auth = getAuth(firebaseApp);
// const db =  getDatabase(firebaseApp);

// document.getElementById("codeMain").addEventListener("click", codeMain);

// function codeMain() {
//     var ccode = document.getElementById('ccode').value
//     if (validate_field(ccode) == false) {
//         alert("Invalid CCODE, Please Ask Your Admin For Help.")
//         return
//     } 
//     onAuthStateChanged(auth, user => {
//             return signInAnonymously(auth).then(function() {
//                 var user = auth.currentUser
//                 set(ref(db, 'users/' + user.uid), {
//                     code_id : ccode,
//                     // 01 1 02 = set1 normal q2
//                     // 03 0 05 = set3 practice q5
//                     progress : '00000'
//                   });
//                 document.cookie = "userCode=" + ccode;
//                 document.cookie = "authCode=" + user.uid;
//             }).catch(function(error) {
//                 var error_code = error.code
//                 var error_message = error.message
//                 alert(error_message)
//             })

//         }); 

//     }

// function validate_field(field) {
//     // field = field.trim()
//     if (field == null || field.length <=0) {
//         return false
//     }
//     return true
// }