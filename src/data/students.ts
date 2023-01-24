
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