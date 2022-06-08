var practiceLabel = "Here is the practice round to get you familer with the pattern of our questions. \
If your selection is correct, the button will turn green and you will be able to proceed to the \
next question. If your selection is wrong, your option will turn red, and you should try again. \
There are 6 practice questions in total. \
\n\n\
この登録フォームの目的は、研究についての情報を提供し、ご興味があれば参加登録をしていただくことです。 \
この登録用紙は、研究そのものではありません。この研究は、後日、あなたが選択した日に行われます."

var normalLabel = "Good job with the practice round, here is the real test. This time we will not give you answers. \
Good luck and have fun!\
\n\n\
この登録フォームの目的は、研究についての情報を提供し、ご興味があれば参加登録をしていただくことです。 \
この登録用紙は、研究そのものではありません。この研究は、後日、あなたが選択した日に行われます."

var pauseLabel = "You've finished this section, please proceed to the next when you are ready.\
この登録フォームの目的は、研究についての情報を提供し、ご興味があれば参加登録をしていただくことです。";

var endLabel = "This is the end. \
\n\n\
この登録フォームの目的は、研究についての情報を提供し、ご興味があれば参加登録をしていただくことです。 \
この登録用紙は、研究そのものではありません。この研究は、後日、あなたが選択した日に行われます."

document.getElementById("disText").textContent=normalLabel;
var toPractice = document.getElementById("proceed1").addEventListener("click", goToPractice);

function goToPractice() {
    // document.getElementById("proceed1").id = 'proceed2';
    window.location.replace('testing.html');
}

// var toQuestion = document.getElementById("proceed2").addEventListener("click", goToP);