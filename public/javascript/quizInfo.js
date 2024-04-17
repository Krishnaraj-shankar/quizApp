var question = {};

question.getSubjects = function(){
    let year = document.getElementById("yearSelect").value;
    let dept = document.getElementById("deptSelect").value;
    console.log("year: ",year," dept: ",dept);
    //if already user clicked getSubjects again he is clicking means, we need to remove the contents of the div
    let showSubjects = document.getElementById("showSubjects");
    if(!showSubjects.classList.contains("dN")){
      //already available data, so remove it
      showSubjects.innerHTML = '';
    }
    //ajax using fetch
    // Define the parameters
    const params = {
        year: year,
        dept : dept
    };
    
    // Construct the query string from the parameters
    const queryString = new URLSearchParams(params).toString();
    fetch(`/getSubjects?${queryString}`).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        debugger;
        console.log(data);
        let showSubjects = document.getElementById("showSubjects");
        var appendChild = "<select id='selectSubjectId'>";
        data.forEach(ele=>{
            console.log(ele);
            appendChild+=`<option value='${ele.subject}|${ele.subject_id}'>${ele.subject}-${ele.subject_id}</option>`
        });
        appendChild+='</select>';
        //for button
        appendChild+='<button onclick="question.redirect()">Enter Questions</button>'
        showSubjects.innerHTML = appendChild;
        showSubjects.classList.remove("dN");
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        window.location.href = "/faculty";
      });

}


question.redirect = function(){
  try{
    let year = document.getElementById("yearSelect").value;
    let dept = document.getElementById("deptSelect").value;
    let subjectInfo = document.getElementById("selectSubjectId").value;
    console.log("subjectInfo: ",subjectInfo);
    //storing these information in localStorage;
    localStorage.setItem("quizInfo",JSON.stringify({year: year, dept: dept, subjectInfo: JSON.stringify({subjectInfo})}));
    //if you want to add params you can add here;
    window.location.href = "/questions";
  } catch(e){
    window.location.href = "/faculty";
  }
}

question.handleChange = (event)=>{
  let showSubjects = document.getElementById("showSubjects");
  if(!showSubjects.classList.contains("dN")){
    //already available data, so remove it
    console.log("fuck");
    showSubjects.classList.add("dN");
  }
}

document.getElementById("yearSelect").addEventListener("change", question.handleChange);
document.getElementById("deptSelect").addEventListener("change", question.handleChange);