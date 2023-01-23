export  const students = [

    {
        id:"1",
        name: "Ariel Calderon",
        curso: "8vo",
        paralelo: "A",
        estudiantes: 30
    },
    {
        id:"2",
        name: "Leonel Molina",
        curso: "9no",
        paralelo: "A",
        estudiantes: 30
    },
    {
        id:"3",
        name: "Raul Tenorio",
        curso: "10mo",
        paralelo: "A",
        estudiantes: 30
    },
    {
        id:"4",
        name: "Ivonne Maldonado",
        curso: "8vo",
        paralelo: "A",
        estudiantes: 30
    }

]

export async function studentsList(subjectId: string) {

    return await fetch(`https://sismds.herokuapp.com/api/teacher/${subjectId}/studentsList`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        }
    })
    .then(response => response.json()).then(response => response.data)
    
    
}