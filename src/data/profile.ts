
export async function userData(token:string) {
  
  return  await fetch('https://sismds.herokuapp.com/api/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => response.json())
  
  
}

export async function updateProfileData(token:string ,bodyData:object){
  return await fetch('https://sismds.herokuapp.com/api/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body:JSON.stringify(bodyData)
  })
}

export async function updateProfilePic(token: string, data:FormData){
  await fetch('https://sismds.herokuapp.com/api/profile/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: data
        }).then(response => response.json())
}



