function addStudentToTable(){
    let studentsDataTable = document.querySelector('#studentsDataTable');
    if(localStorage.getItem('studentsArray')!=null){
        let students = JSON.parse(localStorage.getItem('studentsArray'));
        for(let i=0; i<students.length; i++){
            stdCycle = getCycle('Grade '+students[i]['clas']);
            studentsDataTable.innerHTML += `<tr class='removeStudents'>
                                    <td>${students[i]['id']}</td>
                                    <td>${students[i]['pass']}</td>
                                    <td>${students[i]['fname']} ${students[i]['lname']}</td>
                                    <td>${stdCycle}</td>
                                    <td>Grade ${students[i]['clas']}</td>
                                    <td>${students[i]['section']}</td>
                                    <td>${students[i]['email']}</td>
                                    <td>${students[i]['dob']}</td>
                                    <td>${students[i]['gender']}</td>
                                    <td>${students[i]['phoneNo']}</td>
                                    <td><img src='${students[i]['image']}' width='36px' height='36px'></td>
                                    <td></td>
                                    <td><span class='removeItem'><i class="fas fa-times"></i></span><td>
                                </tr>`;
        }   
    } 
} 

function addHeadmasterToTable(){
    let headmastersDataTable = document.querySelector('#headmastersDataTable');
    if(localStorage.getItem('headmastersArray')!=null){
        let headmasters = JSON.parse(localStorage.getItem('headmastersArray'));
        for(let i=0; i<headmasters.length; i++){
            headmastersDataTable.innerHTML += `<tr>
                                    <td>${headmasters[i]['id']}</td>
                                    <td>${headmasters[i]['pass']}</td>                                
                                    <td>${headmasters[i]['fname']} ${headmasters[i]['lname']}</td>
                                    <td>${headmasters[i]['cycle']}</td>
                                    <td>${headmasters[i]['email']}</td>
                                    <td>${headmasters[i]['dob']}</td>
                                    <td>${headmasters[i]['gender']}</td>
                                    <td>${headmasters[i]['phoneNo']}</td>
                                    <td><img src='${headmasters[i]['image']}' width='36px' height='36px'></td>
                                </tr>`;
        }  
    }  
}

function addTeacherToTable(){
    let teachersDataTable = document.querySelector('#teachersDataTable');
    if(localStorage.getItem('teachersArray')!=null){
        let teachers = JSON.parse(localStorage.getItem('teachersArray'));
        for(let i=0; i<teachers.length; i++){
            teachersDataTable.innerHTML += `<tr>
                                    <td>${teachers[i]['id']}</td>
                                    <td>${teachers[i]['pass']}</td>
                                    <td>${teachers[i]['fname']} ${teachers[i]['lname']}</td>
                                    <td>${teachers[i]['cycle']}</td>
                                    <td>${teachers[i]['classes']}</td>
                                    <td>${teachers[i]['email']}</td>
                                    <td>${teachers[i]['dob']}</td>
                                    <td>${teachers[i]['gender']}</td>
                                    <td>${teachers[i]['phoneNo']}</td>
                                    <td><img src='${teachers[i]['image']}' width='36px' height='36px'></td>
                                </tr>`;
        }    
    }
}