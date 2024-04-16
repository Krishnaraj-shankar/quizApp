var question = {};

question.getSubjects = function(){
    let year = document.getElementById("yearSelect").value;
    let dept = document.getElementById("deptSelect").value;
    console.log("year: ",year," dept: ",dept);
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
            appendChild+=`<option value=${ele.subject_id}>${ele.subject}-${ele.subject_id}</option>`
        });
        appendChild+='</select>';
        //for button
        appendChild+='<button onclick="'
        showSubjects.innerHTML = appendChild;
        showSubjects.classList.remove("dN");
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

}