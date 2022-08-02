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
    ['孫がいない婆さんが帰り道の小学生に飴をあげた。', ['孫', '婆さん', '帰り道', '小学生']],
    ['彼女に振られた私が励みをとなりに座っている人にもらった。', ['彼女', '私', 'となり', '人']],
    ['食べ物が好きだと言った私に人に優しい友達がおみやげをくれた。', ['食べ物', '私', '人', '友達']],
    ['博物館の壁に絵を嬉しそうなあの人がかけた。', ['博物館', '壁', '嬉しそう', 'あの人']],
    ['部屋の窓を臆病な私が顔が覆われている泥棒に割られた。', ['臆病', '私', '顔', '泥棒']],
    ['酒を成人年齢になっていない娘に子どもを甘やかす親が飲ませなかった。', ['成人年齢', '娘', '子ども', '親']],
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
    ['お金を被害者に彼が払った。', ['お金', '被害者', '彼']],
    ['横田がかばんを私にくれた。', ['横田', 'かばん', '私']],
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
    ['みんなが尊敬している鈴木が上司に信頼される田村に契約書をあげた。', ['みんな', '鈴木', '上司','田村']],
    ['電話に出ない佐々木に腹が立った吉田が何度も電話をかけた。', ['電話', '佐々木', '腹', '吉田']],
    ['帽子を誕生日が近づいた私が監督になったばかりの先生にもらった。', ['誕生日', '私', '監督', '先生']],
    ['抜け目がない田中がうそを誠実そうに見える近藤につかれた。', ['抜け目', '田中', '誠実', '近藤']],
    ['目を覚ました妹にジュースを私が嫌いな兄がくれた。', ['目', 'いもうと', '私', '兄']],
    ['英語の文章を勉強に興味がない私に気が強い姉が読ませた。', ['勉強', '私', '気', '姉']],
    ['山下が愛している津崎がみんなによく悪口を言われる中村にラブレターをもらった。', ['山下', '津崎', 'みんな', '中村']],
    ['スタッフに無視されたファンに高校生で大人気なアイドルがいやなコメントを書かれた。', ['スタッフ', 'ファン', '高校生', 'アイドル']],
    ['チョコレートを性格が悪い隼人が人に近づきたくない陽菜にあげた。', ['性格', '隼人', '人', '陽菜']],
    ['怖い人に見えるあの人がサッカーを近くに立ち寄せた彼にさせた。', ['怖い人', 'あの人', '近く', '彼']],
    ['飲み物をクラスメイトと揉めた弟に私と親しい友達がくれた。', ['クラスメイト', '弟', '私', '友達']],
    ['いつも出前を注文している私が一目ぼれで好きになった伊藤に料理を習った。', ['出前', '私', '一目ぼれ', '伊藤']],
    ['同僚とやり取りしない田中が年賀状を他の部に属する中村にもらった。', ['同僚', '田中', '他の部', '中村']],
    ['関東に戻りたい遠藤に北海道の支社へ転勤を同僚が一度話したあの部長がさせた。', ['私', '遠藤', '同僚', 'あの部長']],
    ['私が知らない近所さんが一流高校に合格した智也にリンゴをくれた。', ['商品', '近所さん', '一流高校', '智也']],
    ['ファイルを同僚に注意された小林が仕事ができる人が嫌いな小岩に盗まれた。', ['同僚', '小林', '人', '小岩']],
    ['パン屋さんのスタッフを見つめている太郎に子どもがすきな宮本がパンをあげた。', ['スタッフ', '太郎', '子ども', '宮本']],
    ['お金をお金が必要な渡辺が人助けが好きな山口に貸した。', ['お金', '渡辺', '人助け', '山口']],
    ['顔が怖そうな医者がアドバイスを野菜が嫌いな長男にくれた。', ['顔', '医者', '野菜', '長男']],
    ['先生になりたいミラーに後輩が怖がっている武田が授業を見学させた。', ['先生', 'ミラー', '後輩', '武田']],
    ['500円を駅前にいる警察に財布がなくなった中島がもらった。', ['駅前', '警察', '財布', '中島']],
    ['年がとった森田が同僚に迷惑を掛けたくない小林に仕事を分担された。', ['年', '森田', '同僚', '小林']],
    ['お客さんに怒られた社員に励ましカードを気遣いができる二宮があげた。', ['お客さん', '社員', '気遣い', '二宮']],
    ['英語を試験に合格したい私に日本語が話せないジェシカが教えた。', ['試験', '私', '日本語', 'ジェシカ']],
    ['家族に厳しい父が辞書を友達に笑われた弟にあげた。', ['家族', '父', '友達', '弟']],
    ['打ち合わせに遅刻した先輩にメッセージを催促が苦手な私が送った。', ['打ち合わせ', '先輩', '催促', '私']],
    ['落し物をみんなを止めた駅員が隣に立っている山本にくれた。', ['みんな', '駅員', '隣', '山本']],
    ['足を隣に立っている人におじいさんに席を譲った友達が踏まれた。', ['隣', '人', 'おじいさん', '友達']],
    ['お客に責められた配達員に田中が言った友達が荷物をもらった。', ['お客に', '配達員', '田中', '友達']],
    ['弟をかわいがる花子が友達に悪口された太郎にジュースを飲まれた。', ['弟', '花子', '友達', '太郎']],
    ['花を親に甘やかされる花子に妹がすきな姉があげた。', ['親', '花子', 'いもうと', '姉']],
    ['水をベンチに座っている人が汗をたくさんかいた私に飲ませた。', ['ベンチ', '人', '汗', '私']],
    ['景品に興味を持つ娘にピエロの格好をしたスタッフがおもちゃをくれた。', ['景品', '娘', 'ピエロ', 'スタッフ']],
    ['気楽にお話ができる佐藤が良い印象を大学を卒業したばかりの石川に与えた。', ['お話', '佐藤', '大学', '石川']],
    ['生徒に優しい先生に鉛筆をみんなが知らない転入生がもらった。', ['生徒', '先生', 'みんな', '転入生']],
    ['彼氏と電話している姉に頭を騒音を注意した田中が殴られた。', ['彼氏', '姉', '騒音', '田中']],
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
    "まごがいないばあさんがかえりみちのしょうがくせいにあめをあげた。",
    "かのじょにふられたわたしがはげみをとなりにすわっている人にもらった。",
    "たべものがすきだといったわたしにひとにやさしいともだちがおみやげをくれた。",
    "はくぶつかんのかべにえをうれしそうなあの人がかけた。",
    "へやのまどをおくびょうなわたしがかおがおおわれているどろぼうにわられた。",
    "さけをせいじんねんれいになっていないむすめにこどもをあまやかすおやがのませなかった。"
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
    "おかねをひがいしゃにかれがはらった。",
    "よこだがかばんをわたしにくれた。",
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
    "でんわにでないささきにはらがたったよしだがなんどもでんわをかけた。",
    "ぼうしをたんじょうびがちかづいたわたしがかんとくになったばかりのせんせいにもらった。",
    "ぬけめがないたなかがうそをせいじつそうにみえるこんどうにつかれた。",
    "めをさましたいもうとにジュースをわたしがきらいなあにがくれた。",
    "えいごのぶんしょうをべんきょうにきょうみがないわたしにきがつよいあねがよませた。",
    "やましたがあいしているつざきがみんなによくわるぐちをいわれるなかむらにラブレターをもらった。",
    "スタッフにむしされたファンにこうこうせいでだいにんきなアイドルがいやなコメントをかかれた。",
    "チョコレートをせいかくがわるいはやとがひとにちかづきたくないひなたにあげた。",
    "こわいひとにみえるあのひとがサッカーをちかくにたちよせたかれにさせた。",
    "のみものをクラスメイトともめたおとうとにわたしとおやしいともだちがくれた。",
    "いつもでまえをちゅうもんしているわたしがひとめぼれですきになったいとうにりょうりをならった。",
    "どうりょうとやりとりしないたなかがねがじょうをほかのぶにぞくするなかむらにもらった。",
    "かんとうにもどりたいえんどうにほっかいどうのししゃへてんきんをどうりょうがいちどはなしたあのぶちょうがさせた。",
    "わたしがしらないきんじょさんがいちりゅうこうこうにごうかくしたともやにリンゴをくれた。",
    "ファイルをどうりょうにちゅういされたこばやしがしごとができるひとがきらいなこいわにぬすまれた。",
    "パンやさんのスタッフをみつめているたろうにこどもがすきなみやもとがパンをあげた。",
    "おかねをおかねがひつようなわたなべがひとだすけがすきなやまぐちにかした。",
    "かおがこわそうないしゃがアドバイスをやさいがきらいなちょうなんにくれた。",
    "せんせいになりたいミラーにこうはいがこわがっているたけだがじゅぎょうをけんがくさせた。",
    "500えんをえきまえにいるけいさつにさいふがなくなったながしまがもらった。",
    "としがとったもりたがどうりょうにめいわくをかけたくないこばやしにしごとをぶんたんされた。",
    "おきゃくさんにおこられたしゃいんにはげましカードをきづかいができるにのみやがあげた。",
    "えいごをしけんにごうかくしたいわたしににほんごがはせないジェシカがおしえた。",
    "かぞくにきびしいちちがじしょをともだちにわらわれたおとうとにあげた。", 
    "うちあわせにちこくしたせんぱいにメッセージをさいそくがにがてなわたしがおくった。",
    "おとしものをみんなをとめたえきいんがとなりにたっているやまもとにくれた。",
    "あしをとなりにたっているひとにおじいさんにせきをゆるったともだちがふまれた。",
    "おきゃくにせめられたはいたついんにたなかがいったともだちがにもつをもらった。",
    "おとうとをかわいがるはなこがともだちにわるぐちされたたろうにジュースをのまれた。",
    "はなをおやにあまやかされるはなこにいもうとがすきなあねがあげた。",
    "みずをベンチにすわっているひとがあせをたくさんかいたわたしにのませた。",
    "けいひんにきょうみをもつむすめにピエロのかっこうをしたスタッフがおもちゃをくれた。",
    "きらくにおはなしができるさとうがよいいんしょうをだいがくをそつぎょうしたばかりのいしかわにあたえた。",
    "せいとにやさしいせんせいにえんぴつをみんながしらないてんにゅうせいがもらった。",
    "かれしとでんわしているあねにあたまをそうおんをちゅういしたたなかがなぐられた。"
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
                if (cType == 0) {
                    var update_roundn = Number(getCookie("normal")) +1;
                    document.cookie = "normal=" + update_roundn;
                }
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
  
