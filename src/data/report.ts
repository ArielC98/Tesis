import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const docDefinition = {
    pageOrientation:'landscape',
    content: [
      {text: `Tis is a header `, style:"header"},
      {text:'No styling here, just another paragraph',style:"anotherStyle"}
    ],
    styles: {
      header:{
        fontSize:22,
        bold:true
      },
      anotherStyle:{
        italics:false,
        alignment:'right'
      }
    }
  }
  

  export const createPDF = () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    pdfGenerator.download();
  }

