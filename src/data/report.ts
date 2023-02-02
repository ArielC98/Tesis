export async function teacherReport(subjectId: string) {

    return await fetch(`https://sismds.herokuapp.com/api/teacher/${subjectId}/report`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        }
    })
    .then(response => response.json()).then(response => response.data)
    
    
}