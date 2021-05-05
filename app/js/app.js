import getData from "./api.js";

const apiData = document.querySelector('.api-data')
const levelFilter = document.querySelector('.level-filter')
const spinner = document.querySelector('.spinner-grow')
showSpinner(false)

function showSpinner(isShow=false){
    if(isShow){
        spinner.style.display="block"
        return
}
spinner.style.display="none"
}



function renderCourses(courseList){
        courseList.forEach(async function(course){
        apiData.innerHTML+= `
        <div class="card m-2" style="width:260px">
      
      <section class="card-body">
      <h7 class-"card-title">${course.curso}</h7>
      <p></p>
      <p>Nivel de Ensino: ${course.nivelDeEnsino}</p>
      <p>Duração: ${course.duracao}</p>
      <p>Município: ${course.municipio}</p>
  `
 })
 }

async function getCourses(){
    showSpinner(true)
    const response = await getData('courses');
    showSpinner(false)
    const courseList = Array.from(response.data)
    renderCourses(courseList)
 
}

async function search (query){
    
    showSpinner(true)
    const response = await getData(`courses?q=${query}`);
    showSpinner(false)
    
    
        const courseList = Array.from(response.data)
        if(courseList.length==0){
           return apiData.innerHTML=
            `<div class="alert alert-info" role="alert">
            Nenhum resultado encontrado para ${query}!
             </div>`
             
        }
        apiData.innerHTML=""
        renderCourses(courseList)    
    }
async function getLevels(){
    showSpinner(true)
    const response = await getData('levels')
    showSpinner(false)
    const levelList = Array.from(response.data)

    levelList.forEach(function(level){
        levelFilter.innerHTML+=`<option value="${level.descricao}">${level.descricao}</option>
        `

    })
}
const btnBuscar = document.querySelector('.btn-buscar')
btnBuscar.addEventListener('click', function(){
const inputSearch= document.querySelector('input[type=search]')
    search(inputSearch.value)    
})
levelFilter.addEventListener('change',function(){
    search(levelFilter.value)
})
getCourses()
getLevels()








