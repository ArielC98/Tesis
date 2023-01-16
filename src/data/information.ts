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

export async function updateProfileData(bodyData:object){
  return await fetch('https://sismds.herokuapp.com/api/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    },
    body:JSON.stringify(bodyData)
  })
}
