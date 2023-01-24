export async function studentGrades(studentId:string, subjectId: string) {

    return await fetch(`https://sismds.herokuapp.com/api/teacher/${studentId}/${subjectId}/grades`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        }
    })
    .then(response => response.json()).then(response => response.data)
    
    
}