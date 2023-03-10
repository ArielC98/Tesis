
export async function teacherSubjects() {

    return await fetch('https://sismds.herokuapp.com/api/teacher/mySubjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        }
    })
    .then(response => response.json()).then(response => response.data)
    
    
}