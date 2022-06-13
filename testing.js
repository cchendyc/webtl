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
    ['トミーさんが　隣の人に　うるさいと　言われた。', ['ドミーさん', '隣の人', 'うるさい']],
    ['友達が　親に　お金を　もらった。', ['友達', '親', 'お金']],
    ['店員が　お客さんに　メールを　送った。', ['店員', 'お客さん', 'メール']],
    ['近所さんが　娘に　リンゴを　くれた。', ['近所さん', '娘', 'りんご']],
    ['私が　クラスメイトに　ノートを　コピーさせた。', ['私', 'クラスメイト', 'ノート']],
    ['お客さんが　スタッフに　荷物を　預けた。', ['お客さん', 'スタッフ', '荷物']],
    ['先生が　高橋に　テキストを　読ませた。', ['先生', '高橋', 'テキスト']],
    ['私が　弟に　スマホを　壊された。', ['私', '弟', 'スマホ']],
    ['おじいさんが　子どもに　おかしを　あげた。', ['おじいさん', '子ども', 'おかし']],
    ['親が　彼に　アメリカへ　留学させた。', ['親', '彼', 'アメリカ']],
    ['先生が　学生に　テキストを　配った。', ['先生', '学生', '配布資料']],
    ['横田先輩が　私に　がばんを　くれた。', ['横田先輩', '私', 'がばん']],
    ['私が　外国人に　道を　聞かれた。', ['私', '外国人', '道']],
    ['石川さんが　好きな人に　ラブレターを　渡した。', ['石川さん', '好きな人', 'ラブレター']],
    ['あの人が　年寄りから　バッグを　奪った。', ['あの人', '年寄り', 'バッグ']],
    ['彼が　先輩に　やり方を　教えられた。', ['彼', '先輩', 'やり方']],
    ['山田さんが　姉に　本を　もらった。', ['山田さん', '姉', '本']],
    ['私が　彼女に　好きなものを　選ばせた。', ['私', '彼女', '好きなもの']],
    ['友達が　おばあさんに　やさしいと　褒められた。', ['友達', 'おばあさん', 'やさしい']],
    ['母さんが　子どもに　ピアノを　練習させた。', ['母さん', '子ども', 'ピアノ']],
    ['兄が　妹に　おもちゃを　あげた。', ['兄', '妹', 'おもちゃ']],
    ['姉が　デパートで　服を　買った。', ['姉', 'デパート', '服']],
    ['田村さんが　彼に　ボールを　投げられた。', ['田村さん', '彼', 'ボール']],
    ['姉さんが　弟に　部屋を　片付けさせた。', ['姉さん', '弟', '部屋']],
]
)

let normal02 = new Map([
['王さんが　話しかけられた　駅で　知らない人に。', ['王さん', '駅', '知らない人']],
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
['捨てられた　好きな靴を　私が　親に。', ['好きな靴', '私', '親']],
['ばあさんが　飲まさせた　孫に　ミルクを。', ['ばあさん', '孫', 'ミルク']],
['お年玉を　孫に　じいさんが　あげた。', ['お年玉', '孫', 'じいさん']],
['商品を　お客さんに　彼が　送った。', ['商品', 'お客さん', '彼']],
['弟が　頭を　姉に　叩かれた。', ['弟', '頭', '姉']],
['私に　親友が　ネックレスを　くれた。', ['私', '親友', 'ネックレス']],
['は払った　彼が　お金を　けが人に。', ['彼', 'お金', 'けが人']],
['日記を　妹に　堀内さんが　見られた。', ['日記', '妹', '堀内さん']],
['娘に　父が　手紙を　もらった。', ['娘', '父', '手紙']],
['夫が　ここに　田中くんを　座らせた。', ['夫', 'ここ', '田中くん']],
['川崎さんが　同僚に　悪口を　言われた。', ['川崎さん', '同僚', '悪口']],
['外国人と　菅原さんが　まなんだ　英語を。', ['外国人', '菅原さん', '英語']],
]
)

let normal03 = new Map([
['友達　私　ハンカチ　渡した。', ['友達', '私', 'ハンカチ']],
['津崎さん　じいちゃん　お年玉　もらった。', ['津崎さん', 'じいちゃん', 'お年玉']],
['親　娘　酒　飲ませなかった。', ['親', '娘', '酒']],
['花子　太郎　ジュース　飲まれた。', ['花子', '太郎', 'ジュース']],
['ママ　友達　料理　習った。', ['ママ', '友達', '料理']],
['店員さん　花子　飴　くれた。', ['店員さん', '花子', '飴']],
['私　学生　ゲーム　させた。', ['私', '学生', 'ゲーム']],
['田中さん　友達　うそ　つかれた。', ['田中さん', '友達', 'うそ']],
['あの人　机の上　かぎ　おいた。', ['あの人', '机の上', 'かぎ']],
['先輩　後輩　授業　見学させた。', ['先輩', '後輩', '授業']],
['王さん　同僚　水　あげた。', ['王さん', '同僚', '水']],
['森山さん　人数　三人　変えた。', ['山さん', '人数', '三人']],
['アイドル　ファン　嫌なコメント　書かれた。　', ['アイドル', 'ファン', '嫌なコメント']],
['田中さん　友達　チョコレート　もらった。', ['田中さん', '友達', 'チョコレート']],
['息子　進学　親　心配させた。', ['息子', '進学', '親']],
['ばあちゃん　庭　服　干した。', ['ばあちゃん', '庭', '服']],
['のび太　公園　犬　追いかけられた。', ['のび太', '公園', '犬']],
['スタッフ　私　クーポン　くれた。', ['スタッフ', '私', 'クーポン']],
['親　子ども　小遣い　あげた。', ['親', '子ども', '小遣い']],
['森さん　先輩　仕事　頼まれた。', ['森さん', '先輩', '仕事']],
['父　弟　大学　やめさせた。', ['父', '弟', '大学']],
['鈴木さん　田村さん　良い印象を　与えた。', ['鈴木さん', '田村さん', '良い印象']],
['犯人　警察　交番　連れられた。', ['犯人', '警察', '交番']],
['課長　岩田　仕事　手伝わせた。', ['課長', '岩田', '仕事']],
]
)

let normal04 = new Map([
['花が　あの人に　伝言を　伝えた。', ['花', 'あの人', '伝言']],
['パンが　子どもに　父を　あげた。　', ['パン', '子ども', '父']],
['友達が　メガネに　足を　踏まれた。', ['友達', 'メガネ', '足']],
['調味料が　社長に　アメリカへ　出張させた。', ['調味料', '社長', 'アメリカ']],
['机が　いすに　メッセージを　送った。', ['机', 'いす', 'メッセージ']],
['社員が　鏡に　コインを　もらった。', ['社員', '鏡', 'コイン']],
['先生が　段ボールに　石を　投げられら。', ['先生', '段ボール', '石']],
['車が　お父さんに　お金を　かりた。', ['車', 'お父さん', 'お金']],
['電車が　私に　水を　飲ませた。', ['電車', '私', '水']],
['ジュースが　妹に　私を　くれた。', ['ジュース', '妹', '私']],
['小林さんが　枕に　財布を　盗まれた。', ['小林さん', '枕', '財布']],
['鉛筆が　学生に　先生を　もらった。', ['鉛筆', '学生', '先生']],
['教室が　先生に　例文を　読ませた。', ['教室', '先生', '例文']],
['本が　私に　日本語を　教えた。', ['本', '私', '日本語']],
['電車が　切符に　駅員を　あげた。', ['電車', '切符', '駅員']],
['ドアが　林さんに　掃除を　させた。', ['ドア', '林さん', '掃除']],
['新幹線が　電車に　指輪を　返された。', ['新幹線', '電車', '指輪']],
['パソコンが　先輩に　ラブレターを　渡した。', ['パソコン', '先輩', 'ラブレター']],
['私が　犬に　ニックネームを　呼ばれた。', ['私', '犬', 'ニックネーム']],
['パソコンが　部長に　資料を　コピーさせた。', ['パソコン', '部長', '資料']],
['猫が　ちゃわんに　ご飯を　食べられた。', ['猫', 'ちゃわん', 'ご飯']],
['花が　草に　お金を　預けた。', ['花', '草', 'お金']],
['薬局が　病院に　薬を　くれた。', ['薬局', '病院', '薬']],
['テーブルが　母さんに　ゴミを　捨てさせた。', ['テーブル', '母さん', 'ゴミ']],
]
)


// PRACTICE INFORMATION ZONE, CHANGE TO JSON IF OVERLOAD
let practice01 = new Map([
['母が　息子に　ご飯を　食べさせた。', ['母', '息子', 'ご飯']],
['田中さんが　泥棒に　財布を　盗まれた。', ['田中さん', '泥棒', '財布']],
['山田さんが　友達に　お金を　貸した。', ['山田さん', '友達', 'お金']],
['中村くんが　彼女に　プレゼントを　もらった。', ['中村くん', '彼女', 'プレゼント']],
['高橋さんが　同僚に　チョコレートを　あげた。', ['高橋さん', '同僚', 'チョコレート']],
['兄さんが　私に　ケーキを　くれた。', ['兄さん', '私', 'ケーキ']],
]
)

let practice02 = new Map([
['太郎が　借りた　本を　花子に。', ['太郎', '本', '花子']],
['母が　掃除を　子どもに　させた。', ['母', '掃除', '子ども']],
['私が　ほかの人に　エレベーターを　閉められた。', ['私', 'ほかの人', 'エレベーター']],
['お弁当を　母さんが　妹に　あげた。　', ['お弁当', '母さん', '妹']],
['私が　もらった　友達に　まんがを。', ['私', '友達', 'まんが']],
['店員さんが　彼女に　おかしを　くれた。', ['店員さん', '彼女', 'おかし']],
]
)

let practice03 = new Map([
['私　泥棒　部屋の窓　割られた。', ['私', '泥棒', '部屋の窓']],
['あの人　壁　絵　かけた。', ['あの人', '壁', '絵']],
['友達　配達員　荷物　もらった', ['友達', '配達員', '荷物']],
['母　子ども　病院　行かせた。', ['母', '子ども', '病院']],
['私　妹　花　あげた。', ['私', '妹', '花']],
['先生　私　アドバイス　くれた。', ['先生', '私', 'アドバイス']],
]
)

let practice04 = new Map([
['あの人が　テレビに　パソコンを　見られた。', ['あの人', 'テレビ', 'パソコン']],
['ヨーグルトが　姉に　親を　くれた。', ['ヨーグルト', '姉', '親']],
['おもちゃが　山下さんに　息子を　届けた。', ['おもちゃ', '山下さん', '息子']],
['ノートが　井上さんに　本を　読ませた。', ['ノート', '井上さん', '本']],
['ポストが　駅員に　手紙を　あげた。', ['ポスト', '駅員', '手紙']],
['ティッシュが　遠藤さんに　友達を　もらった。', ['ティッシュ', '遠藤さん', '友達']],
]
)

//
let rubyNormal01 = [
    "トミーさんが　となりのひとに　うるさいと　いわれた。", 
    "ともだちが　おやに　おかねを　もらった。",
    "てんいんが　おきゃくさんに　メールを　おくった。",
    "きんじょさんが　むすめに　リンゴを　くれた。",
    "わたしが　クラスメイトに　ノートを　コピーさせた。",
    "おきゃくさんが　スタッフに　にもつを　あずけた。",
    "せんせいが　たかはしに　テキストを　よませた。",
    "わたしが　おとうとに　スマホを　こわされた。",
    "おじいさんが　こどもに　おかしを　あげた。",
    "おやが　かれに　アメリカへ　りゅうがくさせた。",
    "せんせいが　がくせいに　はいふしりょうを　くばった。",
    "よこたせんぱいが　わたしに　がばんを　くれた。",
    "わたしが　がいこくじんに　みちを　きかれた。",
    "いしかわさんが　すきなひとに　ラブレターを　わたした。",
    "あのひとが　としよりから　バッグを　うばった。",
    "かれが　せんぱいに　やりかたを　おしえられた。",
    "やまださんが　あねに　ほんを　もらった。",
    "わたしが　かのじょに　すきなものを　えらばせた。",
    "ともだちが　おばあさんに　やさしいと　ほめられた。",
    "かあさんが　こどもに　ピアノを　れんしゅうさせた。",
    "あにが　いもうとに　おもちゃを　あげた。",
    "あねが　デパートで　ふくを　かった。",
    "たむらさんが　かれに　ボールを　なげられた。",
    "ねえさんが　おとうとに　へやを　かたづけさせた。"]

let rubyNormal02 = [
    "おうさんが　はなしかけられた　えきで　しらないひとに。", 
    "にもつを　こうはいに　せんぱいが　はこばせた。",
    "つまが　とどけた　おとに　わすれものを。",
    "ワンちゃんに　えさを　あげた　むすめが。",
    "立たせた　がくせいを　ろうかに　せんせいが。",
    "くれた　むすこに　コーラを　スタッフが。",
    "がいこくじんが　なまえを　スタッフに　書かせた。",
    "かれしに　わすれられた　かのじょが　たんじょうびを。",
    "ゆうきを　コーチが　あたえた　せんしゅに。",
    "はなを　たなかに　もらった　すずきが。",
    "こうえんで　ちちが　むすこを　あそばせた。",
    "ほんを　ともだちに　かえした　わたしが。",
    "すてられた　すきなくつを　わたしが　おやに。",
    "ばあさんが　のばさせた　まごに　ミルクを。",
    "おとしだまを　まごに　じいさんが　あげた。",
    "しょうひんを　　おきゃくさんに　かれが　おくった。",
    "おとうとが　あたまを　あねに　たたかれた。",
    "わたしに　しんゆうが　ネックレスを　くれた。",
    "はらった　かれが　いしゃりょうを　けがにんに。",
    "にっきを　いもうとに　ほりうちさんが　みられた。",
    "むすめに　ちちが　てがみを　もらった。",
    "おっとが　ここに　たなかくんを　すわらせた。",
    "かわさきさんが　どうりょうに　わるぐちを　いわれた。",
    "がいこくじんと　すがわらさんが　まなんだ　えいごを。"]

let rubyNormal03 = [
    "ともだち　わたし　ハンカチ　わたした。", 
    "つざきさん　じいちゃん　おとしだま　もらった。",
    "おや　むすめ　さけ　のまさせなかった。",
    "はなこ　たろう　ジュース　のまれた。",
    "ママ　ともだち　りょうり　ならった。",
    "てんいんさん　はなこ　あめ　くれた。",
    "わたし　がくせい　ゲーム　させた。",
    "たなかさん　ともだち　うそ　つかれた。",
    "あのひと　つくえのうえ　かぎ　おいた。",
    "せんぱい　こうはい　じゅぎょう　けんがくさせた。",
    "おうさん　どうりょう　みず　あげた。",
    "もりやまさん　にんず　さんにん　かえた。",
    "アイドル　ファン　いやなコメント　かかれた。",
    "たなかさん　ともだち　チョコレート　もらった。",
    "むすこ　進学　おや　しんぱいさせた。",
    "ばあちゃん　にわ　ふく　ほした。",
    "のびた　こうえん　いぬ　おいかけれらた。",
    "スタッフ　わたし　クーポン　くれた。",
    "おや　こども　こづかい　あげた。",
    "もりさん　せんぱい　しごと　たのまれた。",
    "ちち　おとうと　だいがく　やめさせた。",
    "すずきさん　たむらさん　良い印象を　与えた。",
    "はんにん　けいさつ　こうばん　つれられた。",
    "かちょう　いわた　しごと　てつだわせた。"]

let rubyNormal04= [
    "はなが　あのひとに　でんごんを　つたえた。", 
    "パンが　こどもに　ちちを　あげた。",
    "ともだちが　メガネに　あしを　ふまれた。",
    "ちょうみりょうが　しゃちょうに　アメリカへ　しゅっちょうさせた。",
    "つくえが　いすに　メッセージを　おくった。",
    "しゃいんが　かがみに　コインを　もらった。",
    "せんせいが　だんボールに　いしを　なげられた。",
    "くるまが　おとうさんに　おかねを　かりた。",
    "でんしゃが　わたしに　みずを　のませた。",
    "ジュースが　いもうとに　わたしを　くれた。",
    "こばやしさんが　まくらに　さいふを　ぬすまれた。",
    "えんぴつが　がくせいに　せんせいを　もらった。",
    "きょうしつが　せんせいに　れいぶんを　よませた。",
    "ほんが　わたしに　にほんごを　おしえた。",
    "でんしゃが　きっぷに　えきいんを　あげた。",
    "ドアが　はやしさんに　そうじを　させた。",
    "しんかんせんが　でんしゃに　ゆびわを　かえされた。",
    "パソコンが　せんぱいに　ラブレターを　わたした。",
    "わたしが　いぬに　ニックネームを　よばれた。",
    "パソコンが　ぶちょうに　しりょうを　コピーさせた。",
    "ねこが　ちゃわんに　ごはんを　たべられた。",
    "はなが　くさに　おかねを　あずけた。",
    "やっきょくが　びょういんに　くすりを　くれた。",
    "テーブルが　かあさんに　ゴミを　すてさせた。"]

let rubyPractice01 = [
    "ははが　むすこに　ごはんを　たべさせた。",
    "たなかさんが　どろぼうに　さいふを　ぬすまれた。",
    "やまださんが　ともだちに　おかねを　かした。",
    "なかむらくんが　かのじょに　プレゼントを　もらった。",
    "たかはしさんが　どうりょうに　チョコレートを　あげた。",
    "おにいちゃんが　わたしに　ケーキを　くれた。"]

let rubyPractice02 = [
    "たろうが　かりた　ほんを　はなこに。",
    "ははが　そうじを　こどもに　させた。",
    "わたしが　ほかのきゃくに　エレベーターを　しめられた。",
    "おべんとうを　かあさんが　いもうとに　あげた。",
    "わたしが　もらった　ともだちに　まんがを。",
    "おにいちゃんが　わたしに　ケーキを　くれた。"]

let rubyPractice03 =[
    "わたし　どろぼう　へやのまど　わられた。",
    "あのひと　かべ　え　かけた。",
    "ともだち　はいたついん　にもつ　もらった。",
    "はは　こども　びょういん　いかせた。",
    "わたし　いもうと　はな　あげた。",
    "せんせい　わたし　アドバイス　くれた。"]

let rubyPractice04 =[
    "あのひとが　テレビに　パソコンを　みられた。",
    "ヨーグルトが　あねに　おやを　くれた。",
    "おもちゃが　やましたさんに　むすこを　とどけた。",
    "ノートが　いのうえさんに　ほんを　よませた。",
    "ポストが　えきいんに　てがみを　あげた。",
    "ティッシュが　えんどうさんに　ともだちを　もらった。"]

var qLst = [[practice01, practice02, practice03, practice04], [normal01, normal02, normal03, normal04]];
var rLst = [[rubyPractice01, rubyPractice02, rubyPractice03, rubyPractice04], [rubyNormal01, rubyNormal02, rubyNormal03, rubyNormal04]];
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
        console.log(dQ);
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
            document.getElementById("theq").innerHTML=furigana(currectq, 
                rLst[cType][cSet-1][dQ-1]); 
            dQ += 1;
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
  