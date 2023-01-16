export async function userData() {
  
  return  await fetch('https://sismds.herokuapp.com/api/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    }
  })
    .then(response => response.json())
  
  
}
