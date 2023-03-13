import {studentReport, teacherReport} from '../data/report';

//para probar, usar access tokens generados en la sesion 

describe('Reportes de calificaciones',()=>{

    const teacher_token = "1963|SO4GrESeRBofF2xOFkaiTE9Wy5PQ1zqkUA9m6FQe"
    const student_token = "1962|ixEnn2cXjpYSqBHvdWev3dPsFkhgGYcdEQydNgxp"

    test("Reporte de calificaciones del profesor", async () => {

        return await teacherReport("2",teacher_token).then(value =>{

            expect(value.grades.length).toBeGreaterThan(0)

        })

    })
    test("Reporte de calificaciones del estudiante", async () => {

        return await studentReport("1",student_token).then(value =>{

            expect(value.grades.length).toBeGreaterThan(0)

        })

    })

})