  let mysidebar = document.querySelector(".mysidebar");
  let mysidebarBtn = document.querySelector(".mysidebarBtn");
  let adminIcon = document.getElementById("adminIcon");
  let logoName = document.getElementById("logo_name");
  let listItems = document.getElementsByClassName('links_name');
  let breadcrumb = '<a href="adminDashboard.html">Home</a> /<span class="secondBreadcrumbTitle">';
  let dashboard = document.getElementsByClassName('dashboard');
  let footer = document.getElementById('sectionAdmin1Cont');
  let adminName = document.getElementsByClassName('admin_name')[0];

  //localStorage.removeItem('studentsArray');
  
  /**************Students Count**************/
  var countStd;
  if((localStorage.getItem('studentsArray'))==null){
    countStd = 0;
  } else{
    let students = JSON.parse(localStorage.getItem('studentsArray'));
    countStd = students.length;
  }
  animateValue(document.getElementById('counterStudent'), 0, countStd, 1000);

  /**************Headmasters Count**************/
  var countHeadmaster;
  if((localStorage.getItem('headmastersArray'))==null){
    countHeadmaster = 0;
  } else{
      let headmasters = JSON.parse(localStorage.getItem('headmastersArray'));
      countHeadmaster = headmasters.length;
  }
  animateValue(document.getElementById('counterHeadmasters'), 0, countHeadmaster, 1000);

  /**************Teachers Count**************/
  var countTeachers;
  if((localStorage.getItem('teachersArray'))==null){
    countTeachers = 0;
  } else{
      let teachers = JSON.parse(localStorage.getItem('teachersArray'));
      countTeachers = teachers.length;
  }
  animateValue(document.getElementById('counterTeachers'), 0, countTeachers, 1000);
  
  /**************All users Count**************/
  animateValue(document.getElementById('counterUsers'), 0, (countStd + countHeadmaster + countTeachers), 1000);
  
  /**************Sidebar collapse**************/
  mysidebarBtn.onclick = function() {
    mysidebar.classList.toggle("active");
    if(mysidebar.classList.contains("active")){
      mysidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
    }         
    else {
      mysidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");          
    }      
    if(document.body.clientWidth < 700)
    {
      if(mysidebarBtn.classList.contains("bx-menu-alt-right")){
        adminIcon.style.visibility = "hidden";
        logoName.style.visibility = "visible";
      } else{ 
        adminIcon.style.visibility = "visible";
        logoName.style.visibility = "hidden";
        }
    } else{
      if(mysidebarBtn.classList.contains("bx-menu")){
        adminIcon.style.visibility = "hidden";
        logoName.style.visibility = "visible";
      } else {
        adminIcon.style.visibility = "visible";
        logoName.style.visibility = "hidden";
        }
      
    }
  }
  
  /**************Sidebar section toggle**************/
  for(let i=0; i<listItems.length-1;i++){
    listItems[i].addEventListener('click', ()=>{      
      for(let j=0; j<listItems.length-1;j++){
        listItems[j].parentNode.className = '';
        document.getElementById("sectionAdmin"+(j+1)).style.display = "none";  
        footer.style.display = "none";     
      }
      listItems[i].parentNode.className = 'active';
      document.getElementById('breadcrumb').style.display = "block";
      document.getElementById("sectionAdmin"+(i+1)).style.display = "block"; 
          switch(i){
              case 0: window.location.reload(); break;
              case 1: dashboard[0].innerHTML = breadcrumb + '  Add New User</span>'; breadcrumbStyle(); break;
              case 2: dashboard[0].innerHTML = breadcrumb + '  Add New Class</span>'; breadcrumbStyle(); break;
              case 3: dashboard[0].innerHTML = breadcrumb + '  Teachers</span>'; breadcrumbStyle(); break;
              case 4: dashboard[0].innerHTML = breadcrumb + '  Students</span>'; breadcrumbStyle(); break;            
          }
    });

}

function breadcrumbStyle(){
  dashboard[0].style.fontSize = '20px';
  dashboard[0].firstChild.style.textDecoration = 'none';
  dashboard[0].firstChild.style.color = '#081D45';
}

/**************Functions for charts**************/
function numFemale(){
  var result = 0;
  if(JSON.parse(localStorage.getItem('studentsArray')) != null){
    let students = JSON.parse(localStorage.getItem('studentsArray'));
    for(let i=0; i<students.length; i++){
      if(students[i]['gender'] == 'Female')
        result++;
      }
    return result;
  }
}

function numMale(){
  var result = 0;
  if(JSON.parse(localStorage.getItem('studentsArray')) != null){
    let students = JSON.parse(localStorage.getItem('studentsArray'));
    for(let i=0; i<students.length; i++){
      if(students[i]['gender'] == 'Male')
        result++;
      }
    return result;
  }
}

function numCycle1(){
  var result = 0;
  if(JSON.parse(localStorage.getItem('studentsArray')) != null){
    let students = JSON.parse(localStorage.getItem('studentsArray'));
    for(let i=0; i<students.length; i++){
      let stdCycle = getCycle('Grade '+students[i]['clas']);
      if(stdCycle == 'Cycle 1')
        result++;
      }
    return result;
  }
}

function numCycle2(){
  var result = 0;
  if(JSON.parse(localStorage.getItem('studentsArray')) != null){
    let students = JSON.parse(localStorage.getItem('studentsArray'));
    for(let i=0; i<students.length; i++){
      let stdCycle = getCycle('Grade '+students[i]['clas']);
      if(stdCycle == 'Cycle 2')
        result++;
      }
    return result;
  }
}

function numCycle3(){
  var result = 0;
  if(JSON.parse(localStorage.getItem('studentsArray')) != null){
    let students = JSON.parse(localStorage.getItem('studentsArray'));
    for(let i=0; i<students.length; i++){
      let stdCycle = getCycle('Grade '+students[i]['clas']);
      if(stdCycle == 'Cycle 3')
        result++;
      }
    return result;
  }
}

function numCycle4(){
  var result = 0;
  if(JSON.parse(localStorage.getItem('studentsArray')) != null){
    let students = JSON.parse(localStorage.getItem('studentsArray'));
    for(let i=0; i<students.length; i++){
      let stdCycle = getCycle('Grade '+students[i]['clas']);
      if(stdCycle == 'Cycle 4')
        result++;
      }
    return result;
  }
}

var ctx = document.getElementById("cycleChart").getContext("2d");
	var myChart = new Chart(ctx, {
	type: "bar",
	data: {
		labels: ["Cycle 1","Cycle 2","Cycle 3","Cycle 4"],
		datasets: [
		{ label: "Number of students",
			data: [numCycle1(), numCycle2(), numCycle3(), numCycle4()],
			backgroundColor: "rgba(46,54,63,0.6)",
      borderColor: "rgb(46,54,63)",
      borderWidth: 1 },
		],    
	},
  options: { responsive: true, }
	});


var chDonutData = {
  labels: ["Female", "Male"],
  datasets: [
    {
      backgroundColor: ["rgba(46,54,63,0.8)","rgba(180,151,90,0.8)"],
      borderWidth: 0,
      data: [numFemale(), numMale()]
    }
  ]
};
var donutOptions = {
  cutoutPercentage: 60, 
  legend: {position:'top', padding:100, labels: {pointStyle:'circle', usePointStyle:false}}
};
var chDonut3 = document.getElementById("genderChart");
if (chDonut3) {
new Chart(chDonut3, {
    type: 'pie',
    data: chDonutData,
    options: donutOptions
});
}

/*************Function to animate the counter*************/
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/**************Function to add name of the admin**************/
if(localStorage.getItem('login')!=null){
  adminName.innerHTML = localStorage.getItem('login');
} else {alert('Somenthing went wrong!');}


/**************Function to logout**************/
document.getElementById('logout').addEventListener('click', ()=>{
  if(localStorage.getItem('login')!=null){
    localStorage.removeItem('login');
    document.location.href = 'index.html';
  } 
});