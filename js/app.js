var validatedInputs = false;
let msg = document.getElementById('msgLogin');
let username, pass;   


let form = document.getElementsByClassName('form-group');
for(let i=0; i<form.length;i++){
    form[i].querySelectorAll('input').forEach(e => e.addEventListener('focus', (event) => {
        event.target.classList.add('focus');
        event.target.parentNode.classList.remove('invalid');
        event.target.parentNode.style.borderBottom = '2px solid #adadad';
        msg.style.display = 'none'; 
    }));
    form[i].querySelectorAll('input').forEach(e => e.addEventListener("blur", (event) => {
        event.target.classList.remove('focus');
        if(event.target.value.length > 0) {
            event.target.nextElementSibling.setAttribute('data-placeholder-1', ' ');
            event.target.nextElementSibling.appendChild(document.createTextNode(' ')); 
        } 
    }));

    form[i].querySelectorAll('.hide-pwd').forEach(e => e.addEventListener('dblclick', (event) => {
        let x = event.target;
        if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
    }));
}



document.getElementById('loginbtn').addEventListener('click', ()=>{
    validateForm();
    username = document.getElementById('username').value;
    pass = document.getElementById('password').value;
    if(username== 'admin' && pass == 'admin'){
        localStorage.setItem('login', username);
        document.location.href = 'adminDashboard.html';
    } 
    else if(username.startsWith('s-')) {
        let authenticatedCredentials = false;
        if(localStorage.getItem('studentsArray')!=null){
            let students = JSON.parse(localStorage.getItem('studentsArray'));
            for(let i=0; i<students.length; i++){
                if(username == students[i]['id'] && pass == students[i]['pass']){
                    localStorage.setItem('login', username);
                    localStorage.setItem('user',students[i]);
                    document.location.href = 'portalStudent.html';
                    authenticatedCredentials = true;
                }      
            } 
            if(!authenticatedCredentials) { alert('Incorrect username or password! ')}  
        }  
        else {
            alert('Wrong credentials!! Please try again');
            window.location.reload;
        }    
    }
    else if(username.startsWith('t-')) {
        let authenticatedCredentials = false;
        if(localStorage.getItem('teachersArray')!=null){
            let teachers = JSON.parse(localStorage.getItem('teachersArray'));
            for(let i=0; i<teachers.length; i++){
                if(username == teachers[i]['id'] && pass == teachers[i]['pass']){
                    localStorage.setItem('login', username);
                    localStorage.setItem('user',teachers[i]);
                    document.location.href = 'portalTeacher.html';
                    authenticatedCredentials = true;
                }      
            } 
            if(!authenticatedCredentials) { alert('Incorrect username or password! ')}  
        }  
        else {
            alert('Wrong credentials!! Please try again');
            window.location.reload;
        }  
    }
    else if(username.startsWith('h-')) {
        let authenticatedCredentials = false;
        if(localStorage.getItem('headmastersArray')!=null){
            let headmasters = JSON.parse(localStorage.getItem('headmastersArray'));
            for(let i=0; i<headmasters.length; i++){
                if(username == headmasters[i]['id'] && pass == headmasters[i]['pass']){
                    localStorage.setItem('login', username);
                    localStorage.setItem('user',headmasters[i]);
                    document.location.href = 'portalHeadmaster.html';
                    authenticatedCredentials = true;
                }            
            } 
            if(!authenticatedCredentials) { alert('Incorrect username or password! ')}  
        }  
        else {
            alert('Wrong credentials!! Please try again');
            window.location.reload;
        }  
    }
});

function validateForm(){
    let inputs = document.getElementsByTagName('input');
    var validNum = 0;
    let i;
    for(i=0; i<inputs.length-1;i++){
        if(inputs[i].value.length > 0){     
            inputs[i].parentNode.style.borderBottom = '2px solid #B4975A';      
            inputs[i].classList.remove('invalid');
            validNum++;
        }
        else{
            inputs[i].parentNode.classList.add('invalid');
            inputs[i].parentNode.style.borderBottom = '2px solid red';
            msg.style.display = 'block';           
        }
    }
    if(validNum == 2){
        validatedInputs = true; 
        msg.style.display = 'none';       
    }
    // alert(validNum);
    // alert(validatedInputs);
}