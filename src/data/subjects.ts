export  const subjects = [

    {
        id:"1",
        name: "matematicas",
        curso: "8vo",
        paralelo: "A",
        estudiantes: 30
    },
    {
        id:"2",
        name: "lenguaje",
        curso: "9no",
        paralelo: "A",
        estudiantes: 30
    },
    {
        id:"3",
        name: "ciencias",
        curso: "10mo",
        paralelo: "A",
        estudiantes: 30
    },
    {
        id:"4",
        name: "ingles",
        curso: "8vo",
        paralelo: "A",
        estudiantes: 30
    }

]

export async function teacherSubjects() {

    return await fetch('https://sismds.herokuapp.com/api/teacher/mySubjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        }
    })
    .then(response => response.json())
    
    
}