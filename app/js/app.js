const apiData = document.querySelector('.api-data')


async function getCourses(){
    const url = "http://localhost:3000/courses"
    const response = await axios.get(url)
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
getCourses()









