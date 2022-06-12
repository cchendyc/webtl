document.getElementById("op1").style.visibility = 'hidden';
document.getElementById("op2").style.visibility = 'hidden';
document.getElementById("op3").style.visibility = 'hidden';
document.getElementById("time1").style.visibility = 'hidden';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import { getAuth,signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
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

// NORMAL INFORMATION ZONE, CHANGE TO JSON IF OVERLOAD
let normal01 = new Map([
    ['s1 normal question01', ['ans1', 'ans2', 'ans3']],
    ['s1 normal question02', ['ans1', 'ans2', 'ans3']],
    ['s1 normal question03', ['ans1', 'ans2', 'ans3']]
]
)
let normal02 = new Map([
    ['s2 normal question01', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question02', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question03', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question04', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question05', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question06', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question07', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question08', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question09', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question10', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question11', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question12', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question13', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question14', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question15', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question16', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question17', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question18', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question19', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question20', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question21', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question22', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question23', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question24', ['ans1', 'ans2', 'ans3']],
]
)
let normal03 = new Map([
    ['s2 normal question01', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question02', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question03', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question04', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question05', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question06', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question07', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question08', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question09', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question10', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question11', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question12', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question13', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question14', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question15', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question16', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question17', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question18', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question19', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question20', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question21', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question22', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question23', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question24', ['ans1', 'ans2', 'ans3']],
]
)
let normal04 = new Map([
    ['s2 normal question01', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question02', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question03', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question04', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question05', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question06', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question07', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question08', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question09', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question10', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question11', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question12', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question13', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question14', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question15', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question16', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question17', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question18', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question19', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question20', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question21', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question22', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question23', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question24', ['ans1', 'ans2', 'ans3']],
]
)

// PRACTICE INFORMATION ZONE, CHANGE TO JSON IF OVERLOAD
let practice01 = new Map([
    ['s1 practice question01', ['ans1', 'ans2', 'ans3']],
    ['s1 practice question02', ['ans1', 'ans2', 'ans3']],
    ['s1 practice question03', ['ans1', 'ans2', 'ans3']],
    ['s1 practice question04', ['ans1', 'ans2', 'ans3']],
    ['s1 practice question05', ['ans1', 'ans2', 'ans3']],
    ['s1 practice question06', ['ans1', 'ans2', 'ans3']],
]
)
let practice02 = new Map([
    ['s2 normal question01', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question02', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question03', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question04', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question05', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question06', ['ans1', 'ans2', 'ans3']],
]
)
let practice03 = new Map([
    ['s1 normal question01', ['ans1', 'ans2', 'ans3']],
    ['s1 normal question02', ['ans1', 'ans2', 'ans3']],
    ['s1 normal question03', ['ans1', 'ans2', 'ans3']],
    ['s1 normal question04', ['ans1', 'ans2', 'ans3']],
    ['s1 normal question05', ['ans1', 'ans2', 'ans3']],
    ['s1 normal question06', ['ans1', 'ans2', 'ans3']],
]
)
let practice04 = new Map([
    ['s2 normal question01', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question02', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question03', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question04', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question05', ['ans1', 'ans2', 'ans3']],
    ['s2 normal question06', ['ans1', 'ans2', 'ans3']],
]
)

var qLst = [[practice01, practice02, practice03, practice04], [normal01, normal02, normal03, normal04]];
var currentIterator;
var currentUser = getCookie("authCode");
var timeStp = [];
var ans = [];

const progressRef = fbdb.ref(db,`users/${currentUser}/userInfo/progress`);
fbdb.onValue(fbdb.query(progressRef), snapshot => {
    var currentProgress = snapshot.val();
    var currentSet = parseInt(currentProgress.slice(1, 2), 10);
    var currentType = parseInt(currentProgress.slice(2, 3), 10);
    var currentQ = parseInt(currentProgress.slice(3, 5), 10);
    startDo(currentSet, currentType, currentQ);
}, {
    onlyOnce: true
});

function startDo(cSet, cType, cQ) {
    var cLst = qLst[cType][cSet-1];
    if (cSet == 5) {
        window.location.replace('endPage.html');
        return 
    }

    var dQ = cQ;
    currentIterator = cLst.keys();
    var currectq = currentIterator.next().value;
    nextQ(-1);

    document.getElementById("op1").addEventListener("click", function(){nextQ("op1");});
    document.getElementById("op2").addEventListener("click", function(){nextQ("op2");});
    document.getElementById("op3").addEventListener("click", function(){nextQ("op3");});

    var interval;
    function nextQ(op) {
        clearInterval(interval);
            if (cType == 1) {
            var sec = 15;
            interval = setInterval(function() {
                if (sec <= 5) {
                    document.getElementById("time1").innerHTML = sec + 's';
                } else {
                    document.getElementById("time1").innerHTML = '';
                }
                sec--;
                if (sec < 0) {
                    clearInterval(interval);
                    var ctime = Date.now();;
                    timeStp.push(ctime);
                    nextQ(-2);
                }
            }, 1000);
         }
        
        if (cType == 1) {
            document.getElementById("time1").style.visibility = 'visible';
        } else {
            document.getElementById("time1").style.visibility = 'hidden';
        }
        if (!currectq) {
            const updates = {};
            var ctime = Date.now();
            console.log(ctime);
            timeStp.push(ctime);
            if(cType == 1) {
                if (op == -2) {
                    ans.push("TimeOut");
                } else {
                    ans.push(document.getElementById(op).value);
                }
                var times = [];
                for(var i=timeStp.length-1;i > 0; i--) {
                    var diff = timeStp[i] - timeStp[i-1];
                    console.log(timeStp[i], timeStp[i-1], diff);
                    times.unshift(diff);
                }
                console.log(times);
                fbdb.set(fbdb.ref(db, 'users/' + currentUser +'/set'+cSet+'/'), {
                    'times': times,
                    'ans': ans
                });

                cSet += 1;
            }
            updates[`/users/${currentUser}/userInfo/progress`] = '0'+String(cSet)+String(cType*-1+1)+'01';
            fbdb.update(dbRef, updates);

            console.log(cType);
            if (cType == 1) {
                if (cSet!=5) {
                    window.onload =window.location.replace('display1.html');
                } else {
                    window.location.replace('endPage.html');
                    return 
                }
                
            }
            else if (cType == 0) {
                window.onload =window.location.replace('display2.html');
            }
            return -1;
        } else if (cLst.get(currectq).length == 3) {
            dQ += 1;
            document.getElementById("theq").textContent=currectq;

            document.getElementById("op1").value=cLst.get(currectq)[0];
            document.getElementById("op2").value=cLst.get(currectq)[1];
            document.getElementById("op3").value=cLst.get(currectq)[2];

            if (op == -1) {
                document.getElementById("op1").style.visibility = 'visible';
                document.getElementById("op2").style.visibility = 'visible';
                document.getElementById("op3").style.visibility = 'visible';
                var ctime = Date.now();;
                console.log(ctime);
                timeStp.push(ctime);

            } else if (op == -2) {
                ans.push("TimeOut");

            } else if (cType == 1) {
                var ctime = Date.now();;
                console.log(ctime);
                timeStp.push(ctime);
                ans.push(document.getElementById(op).value);
            } 
        }
        currectq = currentIterator.next().value;
    }

}




function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}