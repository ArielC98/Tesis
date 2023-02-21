import { useEffect, useState} from 'react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';





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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    },
    body:JSON.stringify(bodyData)
  })
}

export async function updateProfilePic(data:FormData){
  await fetch('https://sismds.herokuapp.com/api/profile/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("access_token")
                },
                body: data
        }).then(response => response.json())
}



