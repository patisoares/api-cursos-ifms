const apiData = document.querySelector('.api-data')
const levelFilter = document.querySelector('.level-filter')


async function getCourses(){
    const url = "http://localhost:3000/courses"
    const response = await axios.get(url);
    const courseList = Array.from(response.data)

    courseList.forEach(async function(course){
          apiData.innerHTML+= `
          <div class="card m-2" style="width:260px">
        
        <section class="card-body">
        <h3 class-"card-title">${course.curso}</h3>
        <p>Nivel de Ensino: ${course.nivelDeEnsino}</p>
        <p>Duração: ${course.duracao}</p>
        <p>Município: ${course.municipio}</p>
    `
})
}

async function search (query){
    const url = `http://localhost:3000/courses?q=${query}`
    const response = await axios.get(url);
    const courseList = Array.from(response.data)
    apiData.innerHTML=""
    
    courseList.forEach(function(course){
        apiData.innerHTML+= `
        <div class="card m-2" style="width:260px">
      
      <section class="card-body">
      <h3 class-"card-title">${course.curso}</h3>
      <p>Nivel de Ensino: ${course.nivelDeEnsino}</p>
      <p>Duração: ${course.duracao}</p>
      <p>Município: ${course.municipio}</p>
  `
})
}
async function getLevels(){
    const url=`http://localhost:3000/levels`
    const response = await axios.get(url)
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









