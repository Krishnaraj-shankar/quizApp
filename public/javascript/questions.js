(function (){
    debugger;
    try{
        let quizInfo = JSON.parse(localStorage.getItem("quizInfo"));
        quizInfo.subjectInfo = JSON.parse(quizInfo.subjectInfo);
        console.log("quizInfo: ",quizInfo);
        let showQuizInfo = document.getElementById("showQuizInfo");
        let innerHtmlContent = `<p>Year: <span>${quizInfo.year}</span></p><p>Department: <span>${quizInfo.dept}</span></p><p>Subject: <span>${quizInfo.subjectInfo.subjectInfo}</span></p>`
        showQuizInfo.innerHTML = innerHtmlContent;
        showQuizInfo.classList.remove("dN");
    } catch(e){
        alert("Error in getting values. Go to the previous page");
        window.location.href = "/faculty";
    }
})()