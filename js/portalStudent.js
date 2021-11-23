let listItems = document.getElementsByClassName('mysidenavItems');
let eventSectionTrigger = document.getElementById('eventSectionTrigger');
let breadcrumb = '<a href="portalStudent.html">Home</a> /<span class="secondBreadcrumbTitle">';

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
            case 2: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Report Cards'; break;
            case 3: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Library'; break;
            case 4: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Notifications'; break;
            case 5: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Homework'; break;
            case 6: document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Schedule'; break;
        }

    });
}

function hideAllSections(){
    for(let j=1; j<=listItems.length;j++){
        document.getElementById("section"+j).style.display = "none";
    }
    document.getElementById("sectionEvents").style.display = "none";
    //document.getElementById('sectionStudentProfile').style.display = "none";
    
}

eventSectionTrigger.addEventListener('click', ()=>{
    document.getElementById("section1").style.display = "none";
    document.getElementById("sectionEvents").style.display = "block";
    document.getElementById('welcomeHeader').style.display='none';
    document.getElementById('breadcrumbHeader').style.display = "block";
    document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + ' Events';
});

// function getStudentProfile(){
//     hideAllSections();
//     document.getElementById('welcomeHeader').style.display='none';
//     document.getElementById('breadcrumbHeader').style.display = "block";
//     document.getElementById('sectionStudentProfile').style.display = "flex";
//     document.getElementById('breadcrumbHeader').innerHTML = breadcrumb + '  Profile';
// }

document.getElementById('avatarShow').addEventListener('click', ()=>{
    document.getElementById('popup1').style.display ='flex';
});

document.getElementById('avatarHide').addEventListener('click', ()=>{
    document.getElementById('popup1').style.display ='none';
});


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


//Function to logout
document.getElementById('logout').addEventListener('click', ()=>{
    if(localStorage.getItem('login')!=null){
      localStorage.removeItem('login');
      localStorage.removeItem('user');
      document.location.href = 'index.html';
    } 
  });


//Function to fill the student profile
let details = document.getElementsByClassName('studentProfileList');
if(localStorage.getItem('studentsArray')!=null){
    let students = JSON.parse(localStorage.getItem('studentsArray'));
    let username = localStorage.getItem('login');
    for(let i=0; i<students.length; i++){
        if(username == students[i]['id']){
            document.getElementById('welcomeUser').innerHTML = students[i]['fname'];
            details[0].innerHTML += students[i]['id'];
            details[1].innerHTML += students[i]['fname'] + ' ' + students[i]['lname'];
            details[2].innerHTML += students[i]['dob'];
            details[3].innerHTML += students[i]['email'];
            details[4].innerHTML += students[i]['phoneNo'];
            details[5].innerHTML += students[i]['clas'];
            details[6].innerHTML += students[i]['section'];
            document.getElementById('avatarShow').setAttribute('src', students[i]['image']);
            document.getElementById('avatarHide').setAttribute('src', students[i]['image']);
        }
    }
    
}
