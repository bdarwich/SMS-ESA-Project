let listItems = document.getElementsByClassName('mysidenavItems');
let eventSectionTrigger = document.getElementById('eventSectionTrigger');
let breadcrumb = '<a href="portalHeadmaster.html">Home</a> /<span class="secondBreadcrumbTitle">';

// Disable Sections
let message = document.getElementById('messages');
let library = document.getElementById('library');
let notification = document.getElementById('notification');
let temp = ['<img src="icons/portal/Message/mail (1).png">Messages ', '<img src="icons/portal/Library/books (3).png">Library ', '<img src="icons/portal/Notification/notification (3).png">Notifications '];
let soon = document.getElementById('soon');
var slideIndex = 1;
message.addEventListener('mouseover', ()=>{
    message.innerHTML = '<span id="soon"><img src="icons/portal/Hourglass/hourglass (2).png"> Coming Soon </span>';
});
message.addEventListener('mouseout', ()=>{
    message.innerHTML = temp[0];
});

library.addEventListener('mouseover', ()=>{
    library.innerHTML = '<span id="soon"><img src="icons/portal/Hourglass/hourglass (2).png"> Coming Soon </span>';
});
library.addEventListener('mouseout', ()=>{
    library.innerHTML = temp[1];
});

notification.addEventListener('mouseover', ()=>{
    notification.innerHTML = '<span id="soon"><img src="icons/portal/Hourglass/hourglass (2).png"> Coming Soon </span>';
});
notification.addEventListener('mouseout', ()=>{
    notification.innerHTML = temp[2];
});

showSlides();

// Slideshow homepage

function showSlides(){
    var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 4000);
  
}

// Navigate between sections

for(let i=0; i<listItems.length;i++){
    listItems[i].addEventListener('click', ()=>{
        hideAllSections();
        document.getElementById('welcomeHeader').style.display='none';
        document.getElementById('breadcrumbHeader').style.display = "block";
        document.getElementById("section"+(i+1)).style.display = "block"; 

        switch(i){
            case 0: document.getElementById('breadcrumbHeader').innerHTML = 'Home'; break;
            case 1: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Messages'; break;
            case 2: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Grades'; break;
            case 3: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Library'; break;
            case 4: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Notifications'; break;
            case 5: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Schedule'; break;
        }
    });
}

function hideAllSections(){
    for(let j=1; j<=listItems.length;j++){
        document.getElementById("section"+j).style.display = "none";
    }
    document.getElementById("sectionEvents").style.display = "none";
    
}

eventSectionTrigger.addEventListener('click', ()=>{
    document.getElementById("section1").style.display = "none";
    document.getElementById("sectionEvents").style.display = "block";
    document.getElementById('welcomeHeader').style.display='none';
    document.getElementById('breadcrumbHeader').style.display = "block";
    document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + ' Events';
});


document.getElementById('avatarShow').addEventListener('click', ()=>{
    document.getElementById('popup1').style.display ='flex';
});

document.getElementById('avatarHide').addEventListener('click', ()=>{
    document.getElementById('popup1').style.display ='none';
});

//Function to logout
document.getElementById('logout').addEventListener('click', ()=>{
    if(localStorage.getItem('login')!=null){
      localStorage.removeItem('login');
      localStorage.removeItem('cycle');
      localStorage.removeItem('term');
      localStorage.removeItem('class');
      document.location.href = 'index.html';
    } 
  });

//Download a PDF copy of the report card
function genPDF() {
	
	var doc = new jsPDF();
    var specialElementHandlers = {
        '#hidediv' : function(element,render) {return true;}
    };

    doc.fromHTML($('#reportCard').get(0), 20,20,{
                 'width':500,
        		'elementHandlers': specialElementHandlers
    });
	
	doc.save('report.pdf');	
}

// //Generate the table of grades
// let studentsDataTable = document.querySelector('#tableGrade');
// if(localStorage.getItem('studentsArray')!=null){
//     let students = JSON.parse(localStorage.getItem('studentsArray'));
//     for(let i=0; i<students.length; i++){
        
//         studentsDataTable.innerHTML += `<tr>
//                                 <td>${students[i]['id']}</td>
//                                 <td style="padding-right: 20px; text-align: start">${students[i]['fname']} ${students[i]['lname']}</td>
//                                 <td style="border-left: 1px black solid;"><input type='number' class='grades' min='0' max='20' width='2px'></td>
//                                 <td><input type='number' class='grades' min='0' max='20' width='50px'></td>
//                                 <td><input type='number' min='0' class='grades' max='20' width='50px'></td>
//                                 <td><input type='number' min='0' class='grades' max='20' width='50px'></td>
//                                 <td><input type='number' min='0' class='grades' max='20' width='50px'></td>
//                                 <td style="border-left: 1px black solid;"><input type='number' class='grades' min='0' max='20' width='50px'></td>
//                                 <td><input type='number' class='grades' min='0' max='20' width='50px'></td>
//                                 <td><input type='number' min='0' class='grades' max='20' width='50px'></td>
//                                 <th style="border-left: 1px black solid;"><input type='number' width='20px' disabled style='background-color:transparent;border-width: thin;'></th>
//                             </tr>`;
//     }    
// } 


//Function to fill the headmaster profile
let details = document.getElementsByClassName('headmasterProfileList');
if(localStorage.getItem('headmastersArray')!=null){
    let headmasters = JSON.parse(localStorage.getItem('headmastersArray'));
    let username = localStorage.getItem('login');
    for(let i=0; i<headmasters.length; i++){
        if(username == headmasters[i]['id']){
            document.getElementById('welcomeUser').innerHTML = headmasters[i]['fname'];
            details[0].innerHTML += headmasters[i]['id'];
            details[1].innerHTML += headmasters[i]['fname'] + ' ' + headmasters[i]['lname'];
            details[2].innerHTML += headmasters[i]['dob'];
            details[3].innerHTML += headmasters[i]['email'];
            details[4].innerHTML += headmasters[i]['phoneNo'];
            localStorage.setItem('cycle', headmasters[i]['cycle']);
            details[5].innerHTML += headmasters[i]['cycle'];
            document.getElementById('avatarShow').setAttribute('src', headmasters[i]['image']);
            document.getElementById('avatarHide').setAttribute('src', headmasters[i]['image']);
        }
    }
    
}

//generate class dropdown
let cycle = localStorage.getItem('cycle');
let classes = getClasses(cycle);
for(let i=0; i<3; i++){
    document.querySelector('#classes').innerHTML += `
        <option value='${classes[i]}'> ${classes[i]} </option>
    `; 
}

//Function that returns the cycle based on the grade
function getClasses(cycle){
    switch (cycle) {
        case '1': 
            return ['Grade 1', 'Grade 2', 'Grade 3'];
            break;
        case '2':
            return ['Grade 4', 'Grade 5', 'Grade 6'];
            break;
        case '3':
            return ['Grade 7', 'Grade 8', 'Grade 9'];
            break;
        case '4':
            return ['Grade 10', 'Grade 11', 'Grade 12'];
            break;
      }
}

let studentsDataTable = document.querySelector('#tableGradeBody');
document.querySelector('#classes').addEventListener('change', (e)=>{   //save the term selected in local storage
    localStorage.setItem('class', e.target.value);
    studentsDataTable.innerHTML = ` `;
    document.querySelector('#term').value = 'Term';
})
document.querySelector('#term').addEventListener('change', (e)=>{   //save the class selected in local storage
    localStorage.setItem('term', e.target.value);
    //Generate the table of grades
    
    if(localStorage.getItem('studentsArray')!=null){
        let students = JSON.parse(localStorage.getItem('studentsArray'));
        let selectedClass = localStorage.getItem('class');
        studentsDataTable.innerHTML = ` `;
        for(let i=0; i<students.length; i++){
            if((('Grade ' + students[i]['clas']== selectedClass) && ((document.querySelector('#term').value) !='term')) ){
                studentsDataTable.innerHTML += `<tr>
                                    <td scope='row'>${i+1}</td>
                                    <td>${students[i]['id']}</td>
                                    <td style="padding-right: 20px; text-align: start">${students[i]['fname']} ${students[i]['lname']}</td>
                                    <td style="border-left: 1px black solid;"><input type='number' class='grades' min='0' max='20' width='2px'></td>
                                    <td><input type='number' class='grades' min='0' max='20' width='10px'></td>
                                    <td><input type='number' min='0' class='grades' max='20' width='50px'></td>
                                    <td><input type='number' min='0' class='grades' max='20' width='50px'></td>
                                    <td><input type='number' min='0' class='grades' max='20' width='50px'></td>
                                    <td><input type='number' min='0' class='grades' max='20' width='50px' disabled></td>
                                    <td><input type='number' min='0' class='grades' max='20' width='50px' disabled></td>
                                </tr>`;
            } else {
                studentsDataTable.innerHTML = ` `;
            }
        }    
    } 

    document.querySelector('#saveGrades').style.display = 'block';

    document.querySelectorAll('.grades').forEach(e => e.addEventListener('input', (event)=>{
        let input = event.target.value;
        if(0>input || input > 20) {
            alert('Grade should be between 0 and 20!');
            event.target.value = 0;
        }
    }))
})




//save students grades
function saveGrades(){
    var sum = 0;
    let grades = document.getElementsByClassName('grades');
    let rows = studentsDataTable.rows.length;
    let s = studentsDataTable.rows[2].firstChild.nextSibling.textContent; // s-1
    let len = studentsDataTable.rows[2].cells.length;
    
    for(let j=2; j<rows ; j++){
        for(let i=2; i<len; i++){
            sum += Number((studentsDataTable.rows[j].cells[i].firstChild).value);
        }
        
        studentsDataTable.rows[j].cells[len-1].firstChild.value = sum;    
        sum = 0;    
    }
    //alert();
        
    if(localStorage.getItem('studentsArray')!=null){
        let students = JSON.parse(localStorage.getItem('studentsArray'));
        
        
        //alert(gradesObj.grade);
        for(let i=0; i<students.length; i++){
            
            const gradesObj = {};
            gradesObj.name = 'English';
            gradesObj.grade = (studentsDataTable.rows[i+2].cells[len-1].firstChild).value;

            if(students[i].hasOwnProperty('grades')){
                students[i].grades.push(gradesObj);
                alert('array yes');
            } else {
                students[i].grades = [];
                students[i].grades.push(gradesObj);
                alert('array no');
                alert(students[i].grades[0].grade);
            }
            
            //delete students[i].grades;
            localStorage.setItem('studentsArray', JSON.stringify(students));
        }   
    }
    
    // if(localStorage.getItem('studentsArray')!=null){
    //     let students = JSON.parse(localStorage.getItem('studentsArray'));
        
        
    //     //alert(gradesObj.grade);
    //     for(let i=0; i<students.length; i++){
    //         if(students[i].hasOwnProperty('grades')){
    //             alert(students[i].grades[0].grade);
    //         } 
    //     }   
    // }
}


// //generate table of grades based on dropdown 
// document.querySelector('#classes').addEventListener('change', e=>{
//     alert(e.target.value);
// })


// if(localStorage.getItem('studentsArray')!=null){
//     let students = JSON.parse(localStorage.getItem('studentsArray'));
    
    
//     //alert(gradesObj.grade);
//     for(let i=0; i<students.length; i++){
//         delete students[i]['grades'];
//     }
//     localStorage.setItem('studentsArray', JSON.stringify(students));
// }