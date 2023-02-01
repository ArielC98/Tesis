import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const rector = "Rector";
const secretario = "Secretario";


const docDefinition= {
    pageOrientation:'landscape',
    content: [
        {image:"logo",
            width: 100,
            height: 100,
            alignment: "center",
            margin:[0,-20,0,5]},
        {text: 'Institución Educativa Fiscal "Miguel de Santiago"', style:"header"},
        {text: `Rector/a: ${rector}`, style:"header"},
        {text: `Secretario/a: ${secretario}`, style:"header",  margin:[0,0,0,20]},
        {text: `Asignatura: ${secretario}`, style:"info"},
        {text: `Especialidad: ${secretario}`, style:"info"},
        {text: `Curso: ${secretario}`, style:"info",margin:[0,0,0,10]},
        {text: `Paralelo: ${secretario}`, style:"info",bold:true, alignment:"center",margin:[0,0,0,10]},
        {
            // layout: 'lightHorizontalLines', // optional
            table: {
				widths: [150, 'auto', 'auto','auto', 'auto', 'auto','auto', 'auto', 'auto','auto','auto','auto','auto'],
				headerRows: 2,
				// keepWithHeaderRows: 1,
				body: [
					[{text: 'Estudiante', style: 'header', rowSpan:2, margin:[0,16]},{text: 'Quimestre 1', style: 'header', colSpan: 4, fillColor: "#a01d27", color:"white"}, {},{},{}, {text: 'Quimestre 2', colSpan:4,style: 'header', fillColor: "#a01d27", color:"white"}, {},{},{},{text:'Periodo 2023-2024', style:'header',colSpan:4},{},{},{}],
					[{}, {text: 'Parcial 1', style: 'subheader'},{text: 'Parcial 2', style: 'subheader'},{text: 'Parcial 3', style: 'subheader'},{text: 'Final Q1', style: 'subheader'},{text: 'Parcial 1', style: 'subheader'},{text: 'Parcial 2', style: 'subheader'},{text: 'Parcial 3', style: 'subheader'}, {text: 'Final Q1', style: 'subheader'}, {text: 'Supletorio', style: 'subheader',margin:[0,6,0,0]},{text: 'Remedial', style: 'subheader',margin:[0,6,0,0]},{text: 'Gracia', style: 'subheader',margin:[0,6,0,0]},{text: 'Final', style: 'subheader',margin:[0,6,0,0]}]
					
				
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
        }
    },
    images:{
        logo:{
            url:"https://cdn-icons-png.flaticon.com/512/2231/2231696.png"
            
        }
    }
    }


export const createPDF = () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    pdfGenerator.download();
}

