import { teacherGrades, updateGrades,studentGrades } from "../data/grades";


describe('Notas de estudiantes', ()=>{
    test('Informacion de calificaciones del profesor', async() =>{
        
        const studentId = "48"
        const subjectId = "5"
        const access_token = "1917|Dv1nOaTm2ZPFSoXyVwY94F5oJSxGSDS3b0hmIuVK"

        return await teacherGrades(studentId,subjectId,access_token).then(value =>
    
                expect(value.grades.length).toBeGreaterThan(0)         
        )
    })
    test('Actualización de calificaciones del profesor', async() =>{
        
        const studentId = "48"
        const subjectId = "5"
        const access_token = "1917|Dv1nOaTm2ZPFSoXyVwY94F5oJSxGSDS3b0hmIuVK"
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
        const acces_token ="1918|tIl1eU9Et1WpRV9SLOd5Twr3wCQYdA3nnQzm5VE3"

        return await studentGrades(academicPeriod,acces_token).then(value =>
            expect(value.grades.length).toBeGreaterThan(0)    
        )
    })
})