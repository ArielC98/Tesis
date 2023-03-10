import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';



pdfMake.vfs = pdfFonts.pdfMake.vfs;



export const createPDF = (role, data, information) => {
    

    const docDefinition = {
        pageOrientation:'landscape',
        content: [
            {image:"logo",
                width: 100,
                height: 100,
                alignment: "center",
                margin:[0,-20,0,5]},
            {text: information[0], style:"header"},
            {text: `Rector/a: ${information[1]}`, style:"header"},
            {text: `Secretario/a: ${information[2]}`, style:"header",  margin:[0,0,0,20]},
            {text: `${role ==="teacher"?"Asignatura":"Estudiante"}: ${information[3]}`, style:"info"},
            {text: `Especialidad: ${information[4]}`, style:"info"},
            {text: `Curso: ${information[5]}`, style:"info"},
            {text: `Paralelo: ${information[6]}`, style:"info", margin:[0,0,0,10]},
            {
                // layout: 'lightHorizontalLines', // optional
                table: {
                    
                    widths: [170, 'auto', 'auto','auto', 'auto', 'auto','auto', 'auto', 'auto','auto','auto','auto','auto'],
                    headerRows: 2,
                    // keepWithHeaderRows: 1,
                    body: [
                        [{text: role ==="teacher"?"Estudiante":"Asignatura", style: 'header', rowSpan:2, margin:[0,18]},{text: 'Quimestre 1', style: 'header', colSpan: 4, fillColor: "#a01d27", color:"white"}, {},{},{}, {text: 'Quimestre 2', colSpan:4,style: 'header', fillColor: "#a01d27", color:"white"}, {},{},{},{text:`Periodo ${information[7]}`, style:'header',colSpan:4},{},{},{}],
                        [{}, {text: 'Parcial 1', style: 'subheader'},{text: 'Parcial 2', style: 'subheader'},{text: 'Parcial 3', style: 'subheader'},{text: 'Final Q1', style: 'subheader'},{text: 'Parcial 1', style: 'subheader'},{text: 'Parcial 2', style: 'subheader'},{text: 'Parcial 3', style: 'subheader'}, {text: 'Final Q2', style: 'subheader'}, {text: 'Supletorio', style: 'subheader',margin:[0,6,0,0]},{text: 'Remedial', style: 'subheader',margin:[0,6,0,0]},{text: 'Gracia', style: 'subheader',margin:[0,6,0,0]},{text: 'Final', style: 'subheader',margin:[0,6,0,0]}]
                    
                    ]
                }
            }
        ],
        styles: {
            header:{
                fontSize:15,
                alignment: "center",
                verticalAlignment:"middle"
            },
            subheader:{
                fontSize:13,
                alignment:"center",
                fillColor:"#d5d5d4"
            },
            info:{
                fontSize: 14,
                alignment:'left'
            },
            tableHeader:{
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            names:{
                fontSize:10
            },
            grades:{
                alignment:"center"
            }
        },
        images:{
            logo:{
                url:"https://scontent.fuio5-1.fna.fbcdn.net/v/t39.30808-6/271965798_399110665345469_3163107400069544356_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dWkCiYNTIZcAX_9RUvC&_nc_ht=scontent.fuio5-1.fna&oh=00_AfCU8jRKtfZkgS-prlL8uUvftgOV8hczm07YSXDLOhpFGQ&oe=6403CD52"
                
            }
        }
        }


        
        data.map(item => docDefinition.content[8].table.body.push(item))
    

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    //pdfDocGenerator.open(); //<- Descomentar para pruebas en navegador
    
    return pdfDocGenerator;
}

