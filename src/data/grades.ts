export async function teacherGrades(studentId:string, subjectId: string, token:string) {

    return await fetch(`https://sismds.herokuapp.com/api/teacher/${studentId}/${subjectId}/grades`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json()).then(response => response.data)
    
    
}

export async function updateGrades(studentId:string, subjectId: string, token:string ,newGrades: object) {
    return await fetch(`https://sismds.herokuapp.com/api/teacher/${studentId}/${subjectId}/updateGrade`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(newGrades)
    })
    .then(response => response.json())
}


//Student

export async function studentGrades(academicPeriod: string, token: string){
    return await fetch(`https://sismds.herokuapp.com/api/student/${academicPeriod}/grades`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json()).then(response => response.data)
}