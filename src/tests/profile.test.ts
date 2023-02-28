import{userData,updateProfileData} from '../data/profile'

//para probar, usar access tokens generados en la sesion 

describe('Perfil personal',()=>{

    const teacher_token = "1920|TmVtIsl9CWJhPxD3qPVZXqToTmbgtnDyAmknvSZn"
    const student_token = "1921|09BIsCeMrfJzyhKQpjQ5Oks6l1HQiQLFXBJaGo2q"

    test('Informacion de usuario profesor',async()=>{

        return await userData(teacher_token).then(value => 
            
            expect(value.message).toBe("El perfil del usuario se devolvió correctamente.")    
            
        )
    })
    
    test('Actualización de información de profesor',async()=>{

        return await updateProfileData(teacher_token,{
                "personal_phone":"0123456789",
                "home_phone":"01234567",
                "email":"user@mail.com",
                "address":"example address"
        })

    })

    test('Informacion de usuario estudiante',async()=>{

        return await userData(student_token).then(value => 
            
            expect(value.message).toBe("El perfil del usuario se devolvió correctamente.")    
            
        )
    })

})