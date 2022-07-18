document.getElementById("op1").style.visibility = 'hidden';
document.getElementById("op2").style.visibility = 'hidden';
document.getElementById("op3").style.visibility = 'hidden';
document.getElementById("op4").style.visibility = 'hidden';
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

// VERSION 2. NORMAL INFORMATION ZONE, CHANGE TO JSON IF OVERLOAD
let practice11 = [
    ['高橋が同僚にチョコレートをあげた。', ['高橋', '同僚', 'チョコレート']],
    ['中村がプレゼントを彼女にもらった。', ['中村', 'プレゼント', '彼女']],
    ['彼女に店員がおかしをくれた。', ['彼女', '店員', 'おかし']],
    ['花子に本を太郎が借りた。', ['花子', '本', '太郎']],
    ['エレベーターを私がほかの人に閉められた。', ['エレベーター', '私', 'ほかの人']],
    ['掃除を子どもに母がさせた。', ['掃除', '子ども', '母']]
]
let practice12 = [
    ['22母が　息子に　ご飯を　食べさせた。', ['母', '息子', 'ご飯']],
    ['2田中さんが　泥棒に　財布を　盗まれた。', ['田中さん', '泥棒', '財布']],
    ['2山田さんが　友達に　お金を　貸した。', ['山田さん', '友達', 'お金']],
    ['2中村くんが　彼女に　プレゼントを　もらった。', ['中村くん', '彼女', 'プレゼント']],
    ['2高橋さんが　同僚に　チョコレートを　あげた。', ['高橋さん', '同僚', 'チョコレート']],
    ['2兄さんが　私に　ケーキを　くれた。', ['兄さん', '私', 'ケーキ']],
]

let normal11 = [
    ['智子が太郎におかしをあげた。', ['智子', '太郎', 'おかし']],
    ['学生に先生がテキストを配った。', ['学生', '先生', 'テキスト']],
    ['手紙を父が娘にもらった。', ['手紙', '父', '娘']],
    ['菅原がスマホを弟に壊された。', ['菅原', 'スマホ', '弟']],
    ['彼女に店員が飴をくれた。', ['彼女', '店員', '飴']],
    ['部屋を弟に姉が片付けさせた。', ['部屋', '弟', '姉']],
    ['友達が先輩にお金をもらった。', ['友達', '先輩', 'お金']],
    ['彼女に好きなものを私が選ばせた。', ['彼女', '好きなもの', '私']],
    ['カードを私が駅員にあげた。', ['カード', '私', '駅員']],
    ['山田が長島に好きなペンを捨てられた。', ['山田', '長島', '好きなペン']],
    ['息子にコーラをスタッフがくれた。', ['息子', 'コーラ', 'スタッフ']],
    ['お金をけが人に彼が払った。', ['お金', 'けが人', '彼']],
    ['横田ががばんを私にくれた。', ['横田', 'がばん', '私']],
    ['小野に岩田が仕事を手伝わせた。', ['小野', '岩田', '仕事']],
    ['田中にイヤホンを鈴木がもらった。', ['田中', 'イヤホン', '鈴木']],
    ['私が荷物をスタッフに預けた。', ['私', '荷物', 'スタッフ']],
    ['妹に弟がお弁当をあげた。', ['妹', '弟', 'お弁当']],
    ['日記を田村が妹に見られた。', ['日記', '田村', '妹']],
    ['山田が本を姉にもらった。', ['山田', '本', '姉']],
    ['好きな人にラブレターを石川が渡した。', ['好きな人', 'ラブレター', '石川']],
    ['花を妹に私があげた。', ['花', '妹', '私']],
    ['外国人に私が道を聞かれた。', ['外国人', '私', '道']],
    ['ネックレスを親友が私にくれた。', ['ネックレス', '親友', '私']],
    ['私がクラスメイトにノートをコピーさせた。', ['私', 'クラスメイト', 'ノート']],
    ['友達に私がまんがをもらった。', ['友達', '私', 'まんが']],
    ['バッグを年寄りが職員に預けた。', ['バッグ', '年寄り', '職員']],
    ['先輩にやり方を彼が教えられた。', ['先輩', 'やり方', '彼']],
    ['兄がおもちゃを妹にあげた。', ['兄', 'おもちゃ', '妹']],
    ['アドバイスを私に先生がくれた。', ['アドバイス', '私', '先生']],
    ['先生がテキストを高橋に読ませた。', ['先生', 'テキスト', '高橋']],
    ['王さんに水を同僚があげた。', ['王さん', '水', '同僚']],
    ['ボールを彼に上野が投げられた。', ['ボール', '彼', '上野']],
    ['近所の人が娘にリンゴをくれた。', ['近所の人', '娘', 'リンゴ']],
    ['ピアノを母が子どもに練習させた。', ['ピアノ', '母', '子ども']],
    ['果物を堀内に友達がもらった。', ['果物', '堀内', '友達']],
    ['店員がお客さんにメールを送った。', ['店員', 'お客さん', 'メール']]
]

let normal12 = [
    ['222312312王さんが　話しかけられた　駅で　知らない人に。', ['王さん', '駅', '知らない人']],
    ['荷物を　後輩に　先輩が　運ばせた。', ['荷物', '後輩', '先輩']],
    ['妻が　届けた　夫に　忘れ物を。', ['妻', '夫', '忘れ物']],
    ['ワンちゃんに　えさを　あげた　娘が。', ['ワンちゃん', 'えさ', '娘']],
    ['立たせた　学生を　廊下に　先生が。', ['学生', '廊下', '先生']],
    ['くれた　息子に　コーラを　スタッフが。', ['息子', 'コーラ', 'スタッフ']],
    ['外国人が　名前を　スタッフに　書かせた。', ['外国人', '名前', 'スタッフ']],
    ['彼氏に　忘れられた　彼女が　誕生日を。', ['彼氏', '彼女', '誕生日']],
    ['勇気を　コーチが　与えた　選手に。', ['勇気', 'コーチ', '選手']],
    ['花を　田中に　もらった　鈴木が。', ['花', '田中', '鈴木']],
    ['公園で　父が　息子を　遊ばせた。', ['公園', '父', '息子']],
    ['本を　友達に　返した　私が。', ['本', '友達', '私']],
    ['1捨てられた　好きな靴を　私が　親に。', ['好きな靴', '私', '親']],
    ['1ばあさんが　飲ませた　孫に　ミルクを。', ['ばあさん', '孫', 'ミルク']],
    ['1お年玉を　孫に　じいさんが　あげた。', ['お年玉', '孫', 'じいさん']],
    ['1商品を　お客さんに　彼が　送った。', ['商品', 'お客さん', '彼']],
    ['1弟が　頭を　姉に　叩かれた。', ['弟', '頭', '姉']],
    ['1私に　親友が　ネックレスを　くれた。', ['私', '親友', 'ネックレス']],
    ['1払った　彼が　お金を　けが人に。', ['彼', 'お金', 'けが人']],
    ['1日記を　妹に　堀内さんが　見られた。', ['日記', '妹', '堀内さん']],
    ['1娘に　父が　手紙を　もらった。', ['娘', '父', '手紙']],
    ['1夫が　ここに　田中くんを　座らせた。', ['夫', 'ここ', '田中くん']],
    ['川崎さんが　同僚に　悪口を　言われた。', ['川崎さん', '同僚', '悪口']],
    ['外国人と　菅原さんが　まなんだ　英語を。', ['外国人', '菅原さん', '英語']],
    ['捨てられた　好きな靴を　私が　親に。', ['好きな靴', '私', '親']],
    ['ばあさんが　飲ませた　孫に　ミルクを。', ['ばあさん', '孫', 'ミルク']],
    ['お年玉を　孫に　じいさんが　あげた。', ['お年玉', '孫', 'じいさん']],
    ['商品を　お客さんに　彼が　送った。', ['商品', 'お客さん', '彼']],
    ['弟が　頭を　姉に　叩かれた。', ['弟', '頭', '姉']],
    ['私に　親友が　ネックレスを　くれた。', ['私', '親友', 'ネックレス']],
    ['1払った　彼が　お金を　けが人に。', ['彼', 'お金', 'けが人']],
    ['日記を　妹に　堀内さんが　見られた。', ['日記', '妹', '堀内さん']],
    ['娘に　父が　手紙を　もらった。', ['娘', '父', '手紙']],
    ['夫が　ここに　田中くんを　座らせた。', ['夫', 'ここ', '田中くん']],
    ['321川崎さんが　同僚に　悪口を　言われた。', ['川崎さん', '同僚', '悪口']],
    ['21外国人と　菅原さんが　まなんだ　英語を。', ['外国人', '菅原さん', '英語']],
    ['36夫が　ここに　田中くんを　座らせた。', ['夫', 'ここ', '田中くん']],
]

let rubyPractice11 = [
    "たかはしがどうりょうにチョコレートをあげた。",
    "なかむらがプレゼントをかのじょにもらった。",
    "かのじょにてんいんがおかしをくれた。",
    "はなこにほんをたろうがかりた。",
    "エレベーターをわたしがほかのひとにしめられた。",
    "そうじをこどもにははがさせた。"
]
let rubyPractice12 = [
    "たろうが　かりた　ほんを　はなこに。",
    "ははが　そうじを　こどもに　させた。",
    "わたしが　ほかのひとに　エレベーターを　しめられた。",
    "おべんとうを　かあさんが　いもうとに　あげた。",
    "わたしが　もらった　ともだちに　まんがを。",
    "てんいんさんが　かのじょに　おかしを　くれた。"
]
let rubyNormal11 = [
    "ともこがたろうにおかしをあげた。", 
    "がくせいにせんせいがテキストをくばった。",
    "てがみをちちがむすめにもらった。",
    "すがわらがスマホをおとうとにこわされた。",
    "かのじょにてんいんがあめをくれた。",
    "へやをおとうとにあねがかたづけさせた。",
    "ともだちがせんぱいにおかねをもらった。",
    "かのじょにすきなものをわたしがえらばせた。",
    "カードをわたしがえきいんにあげた。",
    "やまだがながしまにすきなペンをすてられた。",
    "むすこにコーラをスタッフがくれた。",
    "おかねをけがにんにかれがはらった。",
    "よこだががばんをわたしにくれた。",
    "おのにいわたがしごとをてつだわせた。",
    "たなかにイヤホンをすずきがもらった。",
    "わたしがにもつをスタッフにあずけた。",
    "いもうとにおとうとがおべんとうをあげた。",
    "にっきをたむらがいもうとにみられた。",
    "やまだがほんをあねにもらった。",
    "すきなひとにラブレターをいしかわがわたした。",
    "はなをいもうとにわたしがあげた。",
    "がいこくじんにわたしがみちをきかれた。",
    "ネックレスをしんゆうがわたしにくれた。",
    "わたしがクラスメイトにノートをコピーさせた。",
    "ともだちにわたしがまんがをもらった。", 
    "バッグをとしよりがしょくいんにあずけた。",
    "せんぱいにやりかたをかれがおしえられた。",
    "あにがおもちゃをいもうとにあげた。",
    "アドバイスをわたしにせんせいがくれた。",
    "せんせいがテキストをたかはしによませた。",
    "おうさんにみずをどうりょうがあげた。",
    "ボールをかれにうえのがなげられた。",
    "きんじょのひとがむすめにリンゴをくれた。",
    "ピアノをははがこどもにれんしゅうさせた。",
    "くだものをほりうちにともだちがもらった。",
    "てんいんがおきゃくさんにメールを送った。"
]
let rubyNormal12 = [
    "みんながそんけいしているすずきがじょうしにしんらいされるたむらにけいやくしょをあげた。", 
    "つざきさん　なかむらさん　ほん　もらった。",
    "おや　むすめ　さけ　のませなかった。",
    "はなこ　たろう　ジュース　のまれた。",
    "わたし　ともだち　りょうり　ならった。",
    "たろう　はなこ　あめ　くれた。",
    "あのひと　かれ　ゲーム　させた。",
    "たなかさん　こんどうさん　うそ　つかれた。",
    "あのひと　つくえのうえ　かぎ　おいた。",
    "せんぱい　こうはい　じゅぎょう　けんがくさせた。",
    "おうさん　どうりょう　みず　あげた。",
    "もりやまさん　にんず　さんにん　かえた。",
    "アイドル　ファン　いやなコメント　かかれた。",
    "たなかさん　りさん　チョコレート　もらった。",
    "むすこ　しんがく　おや　しんぱいさせた。",
    "ばあちゃん　にわ　ふく　ほした。",
    "のびた　こうえん　いぬ　おいかけられた。",
    "スタッフ　わたし　クーポン　くれた。",
    "いもうと　おとうと　こづかい　あげた。",
    "もりさん　せんぱい　しごと　たのまれた。",
    "ちち　おとうと　だいがく　やめさせた。",
    "すずきさん　たむらさん　よいいんしょうを　あたえた。",
    "たなか　あのひと　こうばん　つれられた。",
    "すがわら　いわた　しごと　てつだわせた。",
    "おうさんが　はなしかけられた　えきで　しらないひとに。", 
    "にもつを　こうはいに　せんぱいが　はこばせた。",
    "つまが　とどけた　おっとに　わすれものを。",
    "ワンちゃんに　えさを　あげた　むすめが。",
    "たたせた　がくせいを　ろうかに　せんせいが。",
    "くれた　むすこに　コーラを　スタッフが。",
    "がいこくじんが　なまえを　スタッフに　かかせた。",
    "かれしに　わすれられた　かのじょが　たんじょうびを。",
    "ゆうきを　コーチが　あたえた　せんしゅに。",
    "はなを　たなかに　もらった　すずきが。",
    "こうえんで　ちちが　むすこを　あそばせた。",
    "ほんを　ともだちに　かえした　わたしが。"
]

var qLst = [[practice11, practice12], [normal11, normal12]];
var rLst = [[rubyPractice11, rubyPractice12], [rubyNormal11, rubyNormal12]];

var currentUser = getCookie("authCode");
var timeStp = [];
var ans = [];
var interval;
var MAX_NORMAL = normal11.length-1;
var MAX_PARACTICE = practice11.length-1;

const progressRef = fbdb.ref(db,`users/${currentUser}/userInfo/progress`);
fbdb.onValue(fbdb.query(progressRef), snapshot => {
    var currentProgress = snapshot.val();
    var currentSet = parseInt(currentProgress.slice(1, 2), 10);
    var currentType = parseInt(currentProgress.slice(2, 3), 10);
    startDo(currentSet, currentType, 0);
}, {
    onlyOnce: true
});

function startDo(cSet, cType, cQ) {
    if (cSet >= 3) {
        window.location.replace('endPage.html');
        return 
    }
    var ctime = Date.now();
    timeStp.push(ctime);
    load(cSet, cType, cQ);
}

function load(cSet, cType, cQ) {
    //load the questions and the options
    var currectq = qLst[cType][cSet-1][cQ]
    document.getElementById("op1").style.visibility = 'visible';
    document.getElementById("op2").style.visibility = 'visible';
    document.getElementById("op3").style.visibility = 'visible'; 
    
    document.getElementById("theq").innerHTML=furigana(currectq[0], 
        rLst[cType][cSet-1][cQ]); 
    document.getElementById("op1").value=currectq[1][0];
    document.getElementById("op2").value=currectq[1][1];
    document.getElementById("op3").value=currectq[1][2];
    if (cSet == 2) {
        document.getElementById("op4").style.visibility = 'visible'; 
        document.getElementById("op4").value=currectq[1][3];
    }
    
    if (cType == 1) {
        var sec;
        if (cSet == 1) {
            sec = 20;
        } else {
            sec = 30;
        }
        
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
                nextQ(-2, cSet, cType, cQ);
            }
        }, 1000);
        document.getElementById("time1").style.visibility = 'visible';
    } else {
        document.getElementById("time1").style.visibility = 'hidden';
    }
    
    //clear the listner by cloning 
    var el = document.getElementById("op1"), elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);

    el = document.getElementById("op2"), elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);

    el = document.getElementById("op3"), elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
    if (cSet == 2) {
        el = document.getElementById("op4"), elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
        document.getElementById("op4").addEventListener("click", function(){nextQ("op4", cSet, cType, cQ);});
    }
    // 
    document.getElementById("op1").addEventListener("click", function(){nextQ("op1", cSet, cType, cQ)});
    document.getElementById("op2").addEventListener("click", function(){nextQ("op2", cSet, cType, cQ);});
    document.getElementById("op3").addEventListener("click", function(){nextQ("op3", cSet, cType, cQ);});
    return;
}

function nextQ(op, cSet, cType, cQ) {
    clearInterval(interval);
    console.log(timeStp, ans);
    if (cType == 1) {
        console.log(cSet);
        if (cQ == MAX_NORMAL) {
            if (op == -2) {
                ans.push("TimeOut");
            } else {
                var ctime = Date.now();;
                timeStp.push(ctime);
                ans.push(document.getElementById(op).value);
            }
            var times = [];
            const updates = {};
            for(var i=timeStp.length-1;i > 0; i--) {
                var diff = timeStp[i] - timeStp[i-1];
                console.log(timeStp[i], timeStp[i-1], diff);
                times.unshift(diff);
                
                fbdb.set(fbdb.ref(db, 'users/' + currentUser +'/set'+cSet+'/'), {
                    'times': times,
                    'ans': ans
                });
            }
            cSet += 1;
            updates[`/users/${currentUser}/userInfo/progress`] = '0'+String(cSet)+String(cType*-1+1)+'01';
            fbdb.update(dbRef, updates);

            if (cSet > 2) {
                window.location.replace('endPage.html');
                return;
            } else {
                window.onload =window.location.replace('display1.html');
                var update_roundn = Number(getCookie("normal")) +1;
                document.cookie = "normal=" + update_roundn;
                // load(cSet, (cType*-1)+1, 0);
            }
        } else {
            var currectq = qLst[cType][cSet-1][cQ];
            console.log(cType, cSet-1, cQ, currectq);
        
            if (cType == 1 && currectq[1].length == 3) {
                if (op == -2) {
                    ans.push("TimeOut");
                } else {
                    var ctime = Date.now();;
                    timeStp.push(ctime); 
                    ans.push(document.getElementById(op).value);
                } 
            }
            load(cSet, cType, cQ+1); 
        }
    } else {
        console.log(cSet);
        if (cQ == MAX_PARACTICE) {
            const updates = {};
            updates[`/users/${currentUser}/userInfo/progress`] = '0'+String(cSet)+String(cType*-1+1)+'01';
            fbdb.update(dbRef, updates);

            window.onload =window.location.replace('display2.html');
            var update_roundn = Number(getCookie("practice")) +1;
            document.cookie = "practice=" + update_roundn;

            // load(cSet, (cType*-1)+1, 0);
        } else {
            load(cSet, cType, cQ+1); 
        }
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

function furigana(japanese, hiragana) {
    const diffs = new diff_match_patch().diff_main(japanese, hiragana);
    let html = '', ruby = { furigana: null, text: null };
    diffs.push([0, '']);
    diffs.map(([kind, text]) => {
      if (kind == 0) {
        if (ruby.furigana || ruby.text) {
          html += `<ruby>${ruby.text}<rp>(</rp><rt>${ruby.furigana}</rt><rp>)</rp></ruby>`;
          ruby.furigana = null;
          ruby.text = null;
        }
        html += text;
      } else {
        ruby[kind == 1 ? 'furigana' : 'text'] = text;
      }
    });
    return html;
  }
  
