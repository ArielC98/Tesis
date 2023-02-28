import { teacherGrades, updateGrades,studentGrades } from "../data/grades";


//para probar, usar access tokens generados en la sesion 

describe('Notas de estudiantes', ()=>{
    test('Informacion de calificaciones del profesor', async() =>{
        
        const studentId = "48"
        const subjectId = "5"
        const access_token = "1939|9NmDVuj6pNxgeu6GjZClesh4CMT0hTXPWjBgGkSo"

        return await teacherGrades(studentId,subjectId,access_token).then(value =>
    
                expect(value.grades.length).toBeGreaterThan(0)         
        )
    })
    test('Actualización de calificaciones del profesor', async() =>{
        
        const studentId = "48"
        const subjectId = "5"
        const access_token = "1939|9NmDVuj6pNxgeu6GjZClesh4CMT0hTXPWjBgGkSo"
        const grades = {
            p1q1:"1.00",
            p2q1:"2.00",
            p3q1:"3.00",
            p1q2:"4.00",
            p2q2:"5.00",
            p3q2:"6.00",
            supletorio: null,
            remedial: null,
            gracia: null
        }

        return await updateGrades(studentId,subjectId,access_token, grades).then(value =>
    
                expect(value.message).toBe("Las notas se han actualizado correctamente.")         
        )
    })
    test("Informacion de calificaiones del estudiante", async() => {
        const academicPeriod = '1'
        const acces_token ="1938|OoEiSwhJQLKiGP8sbJDp7yTzKeGcXzRRG9CpPxQM"

        return await studentGrades(academicPeriod,acces_token).then(value =>
            expect(value.grades.length).toBeGreaterThan(0)    
        )
    })
})