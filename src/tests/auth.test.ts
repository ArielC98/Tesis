import { loginUser } from "../data/auth";

const credencialesProfesor = {"identification":"66666","password":"Sismds1?"}
const credencialesEstudiante = {"identification":"4545454545","password":"Sismds1?"}

describe('Inicio de sesion para profesor', () =>{

    test('Inicio de sesión exitoso de usuario profesor', async () => {

        return  loginUser(credencialesProfesor).then(value =>{
    
            expect(value.message).toBe("Autenticación exitosa.") 
        
        })
    
    });

    test('Retornar el rol correspondiente', async () => {

        return  loginUser(credencialesProfesor).then(value =>{
    
            expect(value.data.user.role).toBe("teacher") 
        
        })

    });

})


describe('Inicio de sesion para estudiante', () =>{

    test('Inicio de sesión exitoso de usuario estudiante', async () => {

        return  loginUser(credencialesEstudiante).then(value =>{
    
            expect(value.message).toBe("Autenticación exitosa.") 
        
        })
    
    });

    test('Retornar el rol correspondiente', async () => {

        return  loginUser(credencialesEstudiante).then(value =>{
    
            expect(value.data.user.role).toBe("student") 
        
        })

    });

})