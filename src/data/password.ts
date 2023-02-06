export async function updatePassword(newPassword1: string, newPassword2: string) {

    return await fetch(`https://sismds.herokuapp.com/api/update-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        },
        body: JSON.stringify(
            {"password": newPassword1,
            "password_confirmation": newPassword2}
        )
    })
    .then(response => response.json()).then(response => response.message)
    
    
}