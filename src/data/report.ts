export async function teacherReport(subjectId: string, token:string) {

    return await fetch(`https://sismds.herokuapp.com/api/teacher/${subjectId}/report`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json()).then(response => response.data)
    
    
}

export async function reportFilters() {
    return await fetch(`https://sismds.herokuapp.com/api/student/reportFilters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        }
    })
    .then(response => response.json()).then(response => response.data)
}

export async function studentReport(period:string, token:string){
    return await fetch(`https://sismds.herokuapp.com/api/student/${period}/report`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json()).then(response => response.data)
}

