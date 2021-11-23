let id = 00;
let table = document.getElementById('classesTable');

generateClassesTable(); // Function to display all the classes


/********************** Function to fill the dropdown with the roles at Add new User **********************/

let role = document.getElementById('role');
role.addEventListener('change', ()=>{
    let roleValue = role.value;
    switch(roleValue){
        case 'Student': showStudentForm(); break;
        case 'Teacher': showTeacherForm(); break;
        case 'Headmaster': showHeadmasterForm(); break;
    }
},false);

/********************** Function to display the user form based on the selected role **********************/
// Student Form
function showStudentForm(){ 
    var idStd;
    if((localStorage.getItem('studentsArray'))==null){
        idStd = 0;
    } else{
        let students = JSON.parse(localStorage.getItem('studentsArray'));
        idStd = students.length;
    }

    let pass = generatePass(5);

    let form = document.getElementById('roleForm');
    form.innerHTML = `<form class="new-added-form was-validated" >
    <div class="row">
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>ID <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control" disabled="disabled" id="idStud" value="s-${idStd+1}" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Password <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control " disabled="disabled" id="passStud" value="${pass}" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>First Name <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control " pattern="[a-zA-Z]+" id="fnameStud" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Last Name <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control " pattern="[a-zA-Z]+" id="lnameStud" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Date Of Birth <span class="reqFields">*</span></label>
            <div class="input-group date" data-date-format="dd.mm.yyyy" required>
                <input  type="date" class="form-control " id="dobStud"  name="date" placeholder="dd.mm.yyyy" required>
            </div>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Gender </label>
            <select class="select2 form-select " required id="genderStud">
                <option selected value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        
        </div>

    
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Email</label>
            <input type="email" placeholder="" required class="form-control " id="emailStud">
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Class <span class="reqFields">*</span></label>
            <select class="select2 form-select " required id="classStud">
                <option value=""></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
                <option value="7">Seven</option>
                <option value="8">Eight</option>
                <option value="9">Nine</option>
                <option value="10">Ten</option>
                <option value="11">Eleven</option>
                <option value="12">Twelve</option>
            </select>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Section <span class="reqFields">*</span></label>
            <select class="select2 form-select " id="sectionStud" required>
                <option value=""></option>
                <option value="A">A</option>
                <option value="B">B</option>
            </select>
        </div>

        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Phone <span class="reqFields">*</span></label>
            <input type="text" placeholder="" pattern="[0-9]{8}" title="8 digits" class="form-control " id="phoneNoStud" required>
        </div>

        <div class="col-lg-6 col-12 form-group mg-t-30">
            <label class="text-dark-medium">Upload Student Photo (150px X 150px)</label>
            <input type="file" class="form-control-file" id='imageStud' accept="image/*">
        </div>
        <div class="col-12 form-group mg-t-8">
            <button type="button" onclick="validateForm(); addStudent(); addStudentToTable()" class="btn btn-gradient-yellow">Save</button>
            <button type="reset" class="btn btn-blue-dark">Reset</button>
        </div>
    </div>
</form>`;
let image = document.getElementById('imageStud'); // Argument to save the uploaded image
getSrc(image);
}

// Teacher Form
function showTeacherForm(){
    var idTeachers;
    if((localStorage.getItem('teachersArray'))==null){
        idTeachers = 0;
    } else{
        let teachers = JSON.parse(localStorage.getItem('teachersArray'));
        idTeachers = teachers.length;
    }

    let pass = generatePass(5);

    let form = document.getElementById('roleForm');
    form.innerHTML = `<form class="new-added-form was-validated">
    <div class="row">
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>ID <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control" disabled="disabled" id="idTeacher" value="t-${idTeachers+1}" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Password <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control" disabled="disabled" id="passTeacher" value="${pass}" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>First Name <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control" pattern="[a-zA-Z]+" id="fnameTeacher" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Last Name <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control" pattern="[a-zA-Z]+" id="lnameTeacher" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Date Of Birth <span class="reqFields">*</span></label>
            <div class="input-group date" data-date-format="dd.mm.yyyy">
                <input  type="date" class="form-control" name="date" id="dobTeacher" placeholder="dd.mm.yyyy" required>
            </div>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Gender <span class="reqFields">*</span> </label>
            <select class="select2 form-select" id="genderTeacher" required>
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Email <span class="reqFields">*</span></label>
            <input type="email" placeholder="" class="form-control" id="emailTeacher" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Cycle <span class="reqFields">*</span></label>
            <select class="select2 form-select" id="cycleTeacher" onchange="showTeachersClasses()" required>
                <option value="" selected></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>

        <div class="col-xl-3 col-lg-6 col-12 form-group" id="classesTeacher">
            
        </div>

        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Subject <span class="reqFields">*</span></label>
            <select class="select2 form-select" id="subjectTeacher"  required>
                <option value=""></option>
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
            </select>
        </div>

        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Phone <span class="reqFields">*</span></label>
            <input type="text" pattern="[0-9]{8}" title="8 digits" id="phoneNoTeacher" placeholder="" class="form-control" required>
        </div>

        <div class="col-lg-6 col-12 form-group mg-t-30">
            <label class="text-dark-medium">Upload Teacher Photo (150px X 150px)</label>
            <input type="file" class="form-control-file" id="imageTeacher">
        </div>
        <div class="col-12 form-group mg-t-8">
            <button type="button" onclick="addTeacher(); addTeacherToTable()" class="btn btn-gradient-yellow">Save</button>
            <button type="reset" class="btn btn-blue-dark">Reset</button>
        </div>
    </div>
</form>`;
let image = document.getElementById('imageTeacher'); // Argument to save the uploaded image
getSrc(image);
}


// Headmaster Form
function showHeadmasterForm(){
    var idHeadmasters;
    if((localStorage.getItem('headmastersArray'))==null){
        idHeadmasters = 0;
    } else{
        let headmasters = JSON.parse(localStorage.getItem('headmastersArray'));
        idHeadmasters = headmasters.length;
    }

    let pass = generatePass(5);

    let form = document.getElementById('roleForm');
    form.innerHTML = `<form class="new-added-form was-validated">
    <div class="row">
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>ID <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control" disabled="disabled" value="h-${idHeadmasters+1}" id="idHeadmaster" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Password <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control" disabled="disabled" id="passHeadmaster" value="${pass}" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>First Name <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control" id="fnameHeadmaster" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Last Name <span class="reqFields">*</span></label>
            <input type="text" placeholder="" class="form-control" id="lnameHeadmaster" required>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Date Of Birth <span class="reqFields">*</span></label>
            <div class="input-group date" data-date-format="dd.mm.yyyy">
                <input  type="date" class="form-control" name="date" placeholder="dd.mm.yyyy" id="dobHeadmaster" required>
            </div>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Gender </label>
            <select class="select2 form-select" id="genderHeadmaster" required>
                <option selected value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        
        </div>        
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Email</label>
            <input type="email" placeholder="" class="form-control" id="emailHeadmaster" required>
        </div>
        
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Cycle <span class="reqFields">*</span></label>
            <select class="select2 form-select" id="cycleHeadmaster"  required>
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="3">4</option>
            </select>
        </div>
        <div class="col-xl-3 col-lg-6 col-12 form-group">
            <label>Phone <span class="reqFields">*</span></label>
            <input type="text" placeholder="" pattern="[0-9]{8}" id="phoneNoHeadmaster"  title="8 digits" class="form-control" required>
        </div>
        <div class="col-lg-6 col-12 form-group mg-t-30">
            <label class="text-dark-medium">Upload Headmaster Photo (150px X 150px)</label>
            <input type="file" class="form-control-file" id="imageHeadmaster">
        </div>
        <div class="col-12 form-group mg-t-8">
            <button type="button" onclick="addHeadmaster(); addHeadmasterToTable()"  class="btn btn-gradient-yellow">Save</button>
            <button type="reset" class="btn btn-blue-dark">Reset</button>
        </div>
    </div>
</form>`;
let image = document.getElementById('imageHeadmaster'); // Argument to save the uploaded image
getSrc(image);
}


/********************** Function to display the classes based on the cycle in the Teacher form **********************/
function showTeachersClasses(){

    let div = document.getElementById("classesTeacher");
    let classTeacher = document.getElementById("cycleTeacher");
        let classTeacherValue = classTeacher.value;
        //alert(div.length);
        switch(classTeacherValue){
            case '1': 
                div.innerHTML = `<label>Class <span class="reqFields">*</span></label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 1" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckDefault">
                        Grade 1
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 2" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckChecked">
                        Grade 2
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 3" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckChecked">
                        Grade 3
                    </label>`;
                break;
            case '2': 
                div.innerHTML = `<label>Class <span class="reqFields">*</span></label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 4" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckDefault">
                        Grade 4
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 5" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckChecked">
                        Grade 5
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 6" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckChecked">
                        Grade 6
                    </label>`;
                break;
            case '3': 
                div.innerHTML = `<label>Class <span class="reqFields">*</span></label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 7" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckDefault">
                        Grade 7
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 8" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckChecked">
                        Grade 8
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 9" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckChecked">
                        Grade 9
                    </label>`;
                break;
            case '4': 
                div.innerHTML = `<label>Class <span class="reqFields">*</span></label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 10" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckDefault">
                        Grade 10
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 11" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckChecked">
                        Grade 11
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Grade 12" name="teacherClassCheck">
                    <label class="form-check-label" for="flexCheckChecked">
                        Grade 12
                    </label>`;
                break;
        }
}

/********************** Function to save the new added class into local storage **********************/
let btnSubmitNewClass = document.getElementById('submitNewClass');
btnSubmitNewClass.addEventListener('click', ()=>{
    let section = document.getElementById('newClassSection');
    let className = document.getElementById('newClassName');
    let cycle = getCycle(className.value);
    
    if((localStorage.getItem('classesArray'))==null){
        localStorage.setItem('classesArray', '[]');
    }

    let classes = JSON.parse(localStorage.getItem('classesArray'));

    let id = classes.length;
    const newClass = {id : id , cycle: cycle,  name: className.value, section: section.value };

    classes.push(newClass);
    
    localStorage.setItem('classesArray', JSON.stringify(classes));

    emptyOnSubmit();

    window.location.reload();
   
});


/********************** Function that returns the cycle based on the grade **********************/
function getCycle(grade){
    switch (grade) {
        case 'Grade 1': case 'Grade 2': case 'Grade 3':
            return 'Cycle 1';
            break;
        case 'Grade 4': case 'Grade 5': case 'Grade 6':
            return 'Cycle 2';
            break;
        case 'Grade 7': case 'Grade 8': case 'Grade 9':
            return 'Cycle 3';
            break;
        case 'Grade 10': case 'Grade 11': case 'Grade 12':
            return 'Cycle 4';
            break;
      }
}


/********************** Function that resets the form **********************/
function emptyOnSubmit(){
    let inputs = document.getElementsByTagName('input');
    let selects = document.getElementsByTagName('select');

    for(let i=0; i<inputs.length; i++) { inputs[i].value='';}
    for(let i=0; i<selects.length; i++) { selects[i].value='';}
}


/********************** Function that retrieves data from local storage and displays them in a table **********************/
function generateClassesTable(){
    if(localStorage.getItem('classesArray')!=null){
        let classes = JSON.parse(localStorage.getItem('classesArray'));
        for(let i=0; i<classes.length; i++){
            document.getElementById('classList').innerHTML += `<tr>
                                    <td>${classes[i]['id']}</td>
                                    <td>${classes[i]['cycle']}</td>
                                    <td>${classes[i]['name']}</td>
                                    <td>${classes[i]['section']}</td>
                                    <td><span class='removeItem'><i class="fas fa-times removeItems"></i></span><td>
                                </tr>`;
        }    
    }
}
