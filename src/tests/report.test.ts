import {studentReport, teacherReport} from '../data/report';

describe('Reportes de calificaciones',()=>{

    const teacher_token = "1922|WbvE9YSXHy6NiA369a5lHcrC5irJ43cWjdJeXjWG"
    const student_token = "1921|09BIsCeMrfJzyhKQpjQ5Oks6l1HQiQLFXBJaGo2q"

    test("Reporte de calificaciones del profesor", async () => {

        return await teacherReport("5",teacher_token).then(value =>{

            expect(value.grades.length).toBeGreaterThan(0)

        })

    })
    test("Reporte de calificaciones del estudiante", async () => {

        return await studentReport("1",student_token).then(value =>{

            expect(value.grades.length).toBeGreaterThan(0)

        })

    })

})