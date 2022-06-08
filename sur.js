import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import { getAuth,signInAnonymously,onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
import * as fbdb from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js';


const firebaseApp = initializeApp({
    apiKey: "AIzaSyCA-OOViIaHEMqpZN-OUtGmfUi-frvbUqc",
    authDomain: "jplangtest.firebaseapp.com",
    projectId: "jplangtest",
    storageBucket: "jplangtest.appspot.com",
    messagingSenderId: "202780482027",
    appId: "1:202780482027:web:35c8ecf645ba5e7cc7e1ae"
})

const auth = getAuth(firebaseApp);
const db =  fbdb.getDatabase(firebaseApp);
const dbRef = fbdb.ref(db);

document.getElementById ("subMain").addEventListener("click", subMain);
function subMain() {
    // var fn = document.getElementById('firstName').value
    // var ln =  document.getElementById('lastName').value
    var nl =  document.getElementById('nl').value
    var yij =  document.getElementById('yij').value
    var jplevel =  document.getElementById('jplevel').value
    

    if (validate_field(yij) == false) {
        alert("Invalid Years in Japan, Please check and try again.")
        return
    }
    if (validate_field(jplevel) == false) {
        alert("Invalid JLPT level, Please check and try again.")
        return
    }

    if (validate_field(nl) == false) {
        alert("Invalid Native Language, Please check and try again.")
        return
    }

    //check for cookie, if has, reload the user
    onAuthStateChanged(auth, user => {
            return signInAnonymously(auth).then(function() {
                var user = auth.currentUser;
                fbdb.get(
                    fbdb.child(dbRef, `userCount/${nl[0]}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            var currValue = snapshot.val();
                            const updates = {};
                            updates[`/userCount/${nl[0]}`] = snapshot.val() + 1;
                            fbdb.update(dbRef, updates);
                            console.log(currValue)
                                     
                            fbdb.set(fbdb.ref(db, 'users/' + user.uid +'/userInfo'), {
                                native_lang: nl,
                                code_id : nl[0]+currValue,
                                years_in_jp : yij,
                                JLPTlevel : jplevel,
                                progress : '01001'
                                
                            });
                            document.cookie = "authCode=" + user.uid;
                            window.location.replace('display.html');
                        } else {
                            console.log("No data available");
                            return;
                        }
                    }).catch((error) => {
                        console.error(error);
                    });

        }).catch(function(error) {
            var error_code = error.code
            var error_message = error.message
            alert(error_message)
        }); 

    });

}


function validate_field(field) {
    // field = field.trim()
    if (field == null || field.length <=0) {
        return false
    }
    return true
}


