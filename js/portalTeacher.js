let listItems = document.getElementsByClassName('mysidenavItems');
let eventSectionTrigger = document.getElementById('eventSectionTrigger');
let breadcrumb = '<a href="portalTeacher.html">Home</a> /<span class="secondBreadcrumbTitle">';

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
  setTimeout(showSlides, 3000);
  
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
            case 2: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Library'; break;
            case 3: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Notifications'; break;
            case 4: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Homework'; break;
            case 5: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Attendance'; break;
            case 6: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Schedule'; break;
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
      document.location.href = 'index.html';
    } 
  });


//Function to fill the teacher profile
let details = document.getElementsByClassName('teacherProfileList');
if(localStorage.getItem('teachersArray')!=null){
    let teachers = JSON.parse(localStorage.getItem('teachersArray'));
    let username = localStorage.getItem('login');
    for(let i=0; i<teachers.length; i++){
        if(username == teachers[i]['id']){
            document.getElementById('welcomeUser').innerHTML = teachers[i]['fname'];
            details[0].innerHTML += teachers[i]['id'];
            details[1].innerHTML += teachers[i]['fname'] + ' ' + teachers[i]['lname'];
            details[2].innerHTML += teachers[i]['dob'];
            details[3].innerHTML += teachers[i]['email'];
            details[4].innerHTML += teachers[i]['phoneNo'];
            details[5].innerHTML += teachers[i]['cycle'];
            details[6].innerHTML += teachers[i]['classes'];
            document.getElementById('avatarShow').setAttribute('src', teachers[i]['image']);
            document.getElementById('avatarHide').setAttribute('src', teachers[i]['image']);
        }
    }
    
}





//Functions for attendance
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());

function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
  }
  
  let count; 
  let attendanceClass;
  let absentNo , presentNo;

//Function to fill the header of the table based on the month
document.querySelector('.selectClassAttendance').addEventListener('change', ()=>{
    count = absentNo = presentNo = 0;
    let attendanceBody = document.getElementById('attendanceBody');
    attendanceBody.innerHTML = '';
    attendanceClass = document.getElementsByClassName('selectClassAttendance')[0];
    if(localStorage.getItem('studentsArray')!=null){
        count = 0;
        let students = JSON.parse(localStorage.getItem('studentsArray'));
        for(let i=0; i<students.length; i++){
            if((students[i]['clas']== attendanceClass.value)){
                //alert('found');
                tr = document.createElement('tr');
                tr.className= 'student';
                tr.innerHTML += `<td class="name-col">${students[i]['id']}</td>`;
                tr.innerHTML += `<td class="name-col">${students[i]['fname']} ${students[i]['lname']}</td>`;
                tr.innerHTML += `<td class="attend-col"><input name='attendance${i}' class='present' value='Present' type="radio"></td>`;
                tr.innerHTML += `<td class="attend-col"><input name='attendance${i}' class='absent' value='Absent' type="radio"></td>`;
                attendanceBody.appendChild(tr);
                count++;
            }     
        }
        
        document.getElementById('paraTotal').innerHTML = `Total: ${count}`;
        document.getElementById('paraAbsent').innerHTML = `Absent: ${absentNo}`;
        document.getElementById('paraPresent').innerHTML = `Present: ${count}`;
    } 
});

    presentNo = count;
    function submitAttendance(){     
        presentNo = count;   
        let rows = document.querySelector('#tableAttendance').rows.length;
        for(let j=0; j<rows;j++){
            document.getElementsByName('attendance'+j).forEach(element => {
                if(element.checked) {
                    if(element.value == 'Absent'){
                        let name = element.parentNode.parentNode.childNodes[1].textContent;
                        
                        let i = 0; // count if the name is already added to absent list
                        document.querySelectorAll('.absent-list-name').forEach(element =>{
                            if((element.firstChild.textContent == name)){ i++; }
                        })   
                        if(i == 0){                            
                            document.getElementById('list-absent').innerHTML += 
                            `
                            <li class="list-group-item absent-list-name">${name}</li>
                            `;
                            absentNo++; 
                            if(presentNo>0)  presentNo--;
                        } 
                    } else if(element.value == 'Present'){
                        let name = element.parentNode.parentNode.childNodes[1].textContent; // if set absent and want to change to present
                        document.querySelectorAll('.absent-list-name').forEach(element =>{
                            if((element.firstChild.textContent == name)){
                                if(absentNo>0) absentNo--; 
                                presentNo++;
                                element.parentNode.removeChild(element);
                            }
                        })
                        alert(presentNo);
                    }
                }
                document.getElementById('paraAbsent').innerHTML = `Absent: ${absentNo}`;
                document.getElementById('paraPresent').innerHTML = `Present: ${presentNo}`;
            });
        }

        if(localStorage.getItem('attendanceArray')!=null){
            let attendanceArray = JSON.parse(localStorage.getItem('attendanceArray'));
            attendanceClass = document.getElementsByClassName('selectClassAttendance')[0];
            for(let i=0; i<attendanceArray.length; i++){
                if(attendanceArray[i]['class'] == 'Grade ' + attendanceClass.value){
                    let rows = document.querySelector('#tableAttendance').rows.length;
                    for(let j=0; j<rows;j++){
                        document.getElementsByName('attendance'+j).forEach(element => {
                            if(element.checked) {
                                let id = element.parentNode.parentNode.childNodes[0].textContent;
                                if(attendanceArray[i]['id'] == id && element.value == 'Absent'){
                                    attendanceArray[i]['absence']++;
                                }
                            }
                        })
                    }
                }
            }
            localStorage.setItem('attendanceArray', JSON.stringify(attendanceArray));
        } else {
            alert('not found')
        }
    }    
      
   
        



