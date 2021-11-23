var validatedInputs = false, validatedSelects = false;



/********************** Function used with class needs-validation **********************/
function validateForm(){
    let inputs = document.getElementsByTagName('input');
    let selects = document.getElementsByTagName('select');
    var validNum = 0;
    for(let i=0; i<inputs.length-1;i++){
        if(inputs[i].value.length > 0){
            validNum++;
        }
    }

    for(let i=1; i<selects.length;i++){
        if(selects[i].value.length > 0){
            validNum++;
        }
    }
    if(validNum == ((selects.length-1) + (inputs.length-3))){
        validatedInputs = validatedSelects = true;
        
    }

    // alert(validNum);
    // alert(validatedInputs + ' ' + validatedSelects);
}

/********************** Function to add new student to local storage **********************/
function addStudent(){
    var photo='';
    if(validatedInputs && validatedSelects){
        let id = document.getElementById('idStud');
        let pass = document.getElementById('passStud');
        let fname = document.getElementById('fnameStud');
        let lname = document.getElementById('lnameStud');
        let dob = document.getElementById('dobStud');
        let gender = document.getElementById('genderStud');
        let email = document.getElementById('emailStud');
        let clas = document.getElementById('classStud');
        let section = document.getElementById('sectionStud');
        let phoneNo = document.getElementById('phoneNoStud');
        photo = localStorage.getItem('imageSrc');
        localStorage.removeItem('imageSrc');
        
        if(photo == null){photo='';}

        if((localStorage.getItem('studentsArray'))==null){
            localStorage.setItem('studentsArray', '[]');
        }
        
        let students = JSON.parse(localStorage.getItem('studentsArray'));
        const student = {
            id:id.value, pass:pass.value, fname:fname.value, lname:lname.value, dob:dob.value, gender:gender.value, email:email.value, clas:clas.value, section:section.value, phoneNo:phoneNo.value, image:photo
        };
        
        students.push(student);

        localStorage.setItem('studentsArray', JSON.stringify(students));
        emptyOnSubmit();
  
        alert('New student has been added successfully!!');   
    }     
    else{
        alert('Please fill out all the fields matched with the requested format');
    }
}

/********************** Function to add new teacher to local storage **********************/
function addTeacher(){
    var photo='';
    let id = document.getElementById('idTeacher');
    let pass = document.getElementById('passTeacher');
    let fname = document.getElementById('fnameTeacher');
    let lname = document.getElementById('lnameTeacher');
    let dob = document.getElementById('dobTeacher');
    let gender = document.getElementById('genderTeacher');
    let email = document.getElementById('emailTeacher');
    let cycle = document.getElementById('cycleTeacher');
    let classes = getCheckedBoxes("teacherClassCheck");
    let subject = document.getElementById('subjectTeacher');
    let phoneNo = document.getElementById('phoneNoTeacher');
    photo = localStorage.getItem('imageSrc');
    localStorage.removeItem('imageSrc');
    
    if(photo == null){photo='';}

    if((localStorage.getItem('teachersArray'))==null){
        localStorage.setItem('teachersArray', '[]');
    }
    
    let teachers = JSON.parse(localStorage.getItem('teachersArray'));
    const teacher = {
        id:id.value, pass:pass.value, fname:fname.value, lname:lname.value, dob:dob.value, gender:gender.value, email:email.value, cycle:cycle.value, classes:classes, subject:subject.value, phoneNo:phoneNo.value, image:photo
    };
    
    teachers.push(teacher);

    
    console.log(classes);
    localStorage.setItem('teachersArray', JSON.stringify(teachers));
    emptyOnSubmit();

    alert('New teacher has been added successfully!!');   
    
}

/********************** Function to add new headmaster to local storage **********************/
function addHeadmaster(){
    var photo='';
    let id = document.getElementById('idHeadmaster');
    let pass = document.getElementById('passHeadmaster');
    let fname = document.getElementById('fnameHeadmaster');
    let lname = document.getElementById('lnameHeadmaster');
    let dob = document.getElementById('dobHeadmaster');
    let gender = document.getElementById('genderHeadmaster');
    let email = document.getElementById('emailHeadmaster');
    let cycle = document.getElementById('cycleHeadmaster');
    let phoneNo = document.getElementById('phoneNoHeadmaster');
    photo = localStorage.getItem('imageSrc');
    localStorage.removeItem('imageSrc');
    
    if(photo == null){photo='';}

    if((localStorage.getItem('headmastersArray'))==null){
        localStorage.setItem('headmastersArray', '[]');
    }
    
    let headmasters = JSON.parse(localStorage.getItem('headmastersArray'));
    const headmaster = {
        id:id.value, pass:pass.value, fname:fname.value, lname:lname.value, dob:dob.value, gender:gender.value, email:email.value, cycle:cycle.value, phoneNo:phoneNo.value, image:photo
    };
    
    headmasters.push(headmaster);
    localStorage.setItem('headmastersArray', JSON.stringify(headmasters));
    emptyOnSubmit();

    alert('New headmaster has been added successfully!!');   
    
}

/********************** Function to save the uploaded image to the local storage and retrieve it later **********************/
function getSrc(image){
    image.addEventListener("change", (e)=>{
    console.log(e.target.files);
    const reader = new FileReader();
    file= e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        localStorage.setItem('imageSrc', reader.result);
        };
    });
} 

/********************** Function to generate a password of desired length **********************/
function generatePass(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

/********************** Function to save the classes of the teacher in an array **********************/
function getCheckedBoxes(checkboxName) {
    var checkboxes = document.getElementsByName(checkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].value);
       }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }



/********************** Function to remove a class **********************/
let items = document.getElementsByClassName('removeItems');
for(let i=0; i<items.length;i++){
    items[i].addEventListener('click', ()=>{
        var id = items[i].parentNode.parentNode.parentNode.childNodes[1].textContent;
        
        if(localStorage.getItem('classesArray')!=null){
            let classes = JSON.parse(localStorage.getItem('classesArray'));
            classes.splice(id, 1);
            localStorage.setItem('classesArray', JSON.stringify(classes));      
            let row = items[i].parentNode.parentNode.parentNode;
            document.getElementById('classList').removeChild(row);  
            alert('Class removed successfully!!');    
        }    else {
            alert('Something went wrong!!');
        }
    });
}

/********************** Function to remove a student **********************/
let students = document.getElementsByClassName('removeStudents');
for(let i=0; i<students.length;i++){
    students[i].addEventListener('click', ()=>{
        alert('students[i].parentNode');
     });
}