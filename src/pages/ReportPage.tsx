import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useState, useEffect } from 'react';
import { createPDF } from '../data/PDFFile';
import { useAuth } from '../data/auth';
import { teacherReport } from '../data/report';
import { teacherSubjects } from '../data/subjects';
import { studentGrades } from '../data/grades';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener';





const ReportPage: React.FC = () => {



  const {role} = useAuth();
  const [isLoading,setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [info,setInfo] = useState([]);
  const [subjectList] = useState([]);
  const [academicPeriod, setAcademicPeriod] = useState("1");
  const [present, dismiss] = useIonLoading();
  const [b64, setB64] = useState("");

  useEffect(()=>{

    setIsLoading(true);

    if(role === "teacher"){
      teacherSubjects().then((response) => response.subjects.map((subject) => {subjectList.push(subject);setIsLoading(false);}));
    
      console.log(subjectList);
    
    }
    else{
      studentGrades(academicPeriod).then(response => response.grades.map((subject) => {subjectList.push(subject);setIsLoading(false);})
      )
    }

    
    
  },[])

 


  async function downloadPDF(r,d,i){


    const filename = 'reporte.pdf';
    
    console.log(b64);
  try{
    Filesystem.writeFile({
      path:filename,
      data: b64,
      directory:Directory.Data,
    }).then(result =>{
      console.log("File Written");
      Filesystem.getUri({
        directory:Directory.Data,
        path:filename
      }).then(result => {
        console.log(result);
        const path = result.uri;
        FileOpener.open(path,'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(error => console.log(error))
      });
    });
    console.log('complete');
  }catch(error){
    console.error(error)
  }
  }
  

  async function handleReport(id: string){
    present({
      message: 'Creando reporte...',
    })
    teacherReport(id).then(response => { 
      
      console.log(response);
      const information = [];
      information.push(response.information.name);
      information.push(response.information.director_name);
      information.push(response.information.secretary_name);
      information.push(response.subject_name);
      information.push(response.specialty);
      information.push(response.course);
      information.push(response.parallel);
      information.push(response.academic_period);

      setInfo(information)
      

      return response.grades})
      .then(studentList =>
        {
          console.log(studentList);
          studentList.map((student,i)=>{
            
            const datos = []

            datos.push({text:student.student_name + " " + student.student_last_name,style:"names"})
            datos.push({text:student.p1q1?.toFixed(2),style:"grades"})
            datos.push({text:student.p2q1?.toFixed(2),style:"grades"})
            datos.push({text:student.p3q1?.toFixed(2),style:"grades"})
            datos.push({text:student.p1q2?.toFixed(2),style:"grades"})
            datos.push({text:student.p2q2?.toFixed(2),style:"grades"})
            datos.push({text:student.p3q2?.toFixed(2),style:"grades"})
            datos.push({text:student.q1?.toFixed(2),style:"grades"})
            datos.push({text:student.q2?.toFixed(2),style:"grades"})
            datos.push({text:student.supletorio?.toFixed(2),style:"grades"})
            datos.push({text:student.remedial?.toFixed(2),style:"grades"})
            datos.push({text:student.gracia?.toFixed(2),style:"grades"})
            datos.push({text:student.final?.toFixed(2),style:"grades"})

            data.push(datos);
            console.log("data",data);
            createPDF(role, data, info).getBase64(response => setB64(response));
            
          }); 
          

          dismiss();
    });
  }

  if(isLoading){
    return <IonLoading isOpen />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reportes</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRow className='ion-justify-content-center'>
        <IonItem>
          <h1>Reporte de calificaciones</h1>
        </IonItem>
        </IonRow>
        <IonRow className='ion-justify-content-center'>
        <IonItem>
          <IonImg style={{width:250}} src='../assets/icon/logo.png'/>
        </IonItem>
        </IonRow>
          <IonItem className='ion-text-justify' lines='none'>
            <p >
              Bienvenido al módulo de reportes. Seleccione una materia de la lista para generar un archivo PDF con las calificaciones del período académico actual.
            </p>
            
          </IonItem>
        <IonItem>
        <IonSelect placeholder='Seleccionar materia'  onIonChange={(e)=>{
            
            subjectList.map((subject)=>{
              if(e.detail.value === subject.name){ //Compara el nombre seleccionado con el del arreglo de estudiantes
                handleReport(subject.id);
              }      
            });
            
          }}>
          {subjectList.map((subject)=>
              <IonSelectOption key={subject.id}>
                {subject.name}
              </IonSelectOption>
            )
          }
        </IonSelect>
        </IonItem>


          <IonButton className='ion-margin-top' expand='block' onClick ={e=>{console.log(downloadPDF(role,data, info));setData([])}}>Reporte</IonButton>
     
          
          

          

      </IonContent>
    </IonPage>
  );
};

export default ReportPage;
