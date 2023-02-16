import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useState, useEffect } from 'react';
import { createPDF } from '../data/PDFFile';
import { useAuth } from '../data/auth';
import { reportFilters, studentReport, teacherReport } from '../data/report';
import { teacherSubjects } from '../data/subjects';
import { studentGrades } from '../data/grades';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener';
import Joyride,{Step} from 'react-joyride';

interface State{
  run: boolean;
  steps: Step[];
}



const ReportPage: React.FC = () => {



  const {role, tutorial} = useAuth();
  const [isLoading,setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [info,setInfo] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectList] = useState([]);
  const [academicPeriod, setAcademicPeriod] = useState("");
  const [periodList] = useState([]);
  const [present, dismiss] = useIonLoading();
  const [b64, setB64] = useState("");
  const [{run,steps}, setSteps] = useState<State>({
    run:false,
    steps:[
      {
        target: 'body',
        placement:'center',
        content: <h2>Bienvenido/a la página de reportes</h2>,
        showProgress:true,
        locale:{next:"Siguiente"}
      },
      {
        target: '.step8',
        title:"Materia",
        content: 'Seleccione la materia para generar un reporte en archivo PDF con las calificaciones',
        showProgress:true,
        locale:{next:"Siguiente", back:"Anterior"}
      },
      {
        target: '.step9',
        content: 'Cuando se haya creado el reporte, haga clic en el botón de Generar reporte y el archivo se descargará directamente a su dispositivo',
        showProgress:true,
        locale:{next:"Siguiente", back:"Anterior"}
      },
    
    ]
  })

  useEffect(()=>{

    setIsLoading(true);

    if(role === "teacher"){
      teacherSubjects().then((response) => response.subjects.map((subject) => {subjectList.push(subject);setIsLoading(false);}));
    
      console.log(subjectList);
    
    }
    else{
      console.log(academicPeriod);
      
      
      reportFilters().then(data => {data.academic_periods.map(period => periodList.push(period));console.log(periodList);
      ;setIsLoading(false)})
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
    }).then(() =>{
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
  

  async function handleReport({id= '',period=''}){
    present({
      message: 'Creando reporte...',
    })

    if(role === "teacher"){
    teacherReport(id).then(response => { 
      
      console.log(response);
      
      info.push(response.information.name);
      info.push(response.information.director_name);
      info.push(response.information.secretary_name);
      info.push(response.subject_name);
      info.push(response.specialty);
      info.push(response.course);
      info.push(response.parallel);
      info.push(response.academic_period);

      
      

      return response.grades})
      .then(studentList =>
        {
          console.log(studentList);
          studentList.map((student)=>{
            
            const datos = []

            datos.push({text:student.student_name + " " + student.student_last_name,style:"names"})
            datos.push({text:student.p1q1,style:"grades"})
            datos.push({text:student.p2q1,style:"grades"})
            datos.push({text:student.p3q1,style:"grades"})
            datos.push({text:student.p1q2,style:"grades"})
            datos.push({text:student.p2q2,style:"grades"})
            datos.push({text:student.p3q2,style:"grades"})
            datos.push({text:student.q1,style:"grades"})
            datos.push({text:student.q2,style:"grades"})
            datos.push({text:student.supletorio,style:"grades"})
            datos.push({text:student.remedial,style:"grades"})
            datos.push({text:student.gracia,style:"grades"})
            datos.push({text:student.final,style:"grades"})

            data.push(datos);
            console.log("data",data);
            createPDF(role, data, info).getBase64(response => setB64(response));
          }); 
          
          dismiss();

        });
      }
      else{

        studentGrades(period).then(response => response.grades.map((subject) => {subjectList.push(subject);console.log(subjectList);
        })
        )
        
        studentReport(period).then(response => { 
      
          console.log("respuesta",response);
          
          info.push(response.information.name);
          info.push(response.information.director_name);
          info.push(response.information.secretary_name);
          info.push(response.user.student_name + " " + response.user.student_last_name);
          info.push(response.user.specialty_name);
          info.push(response.user.course_name);
          info.push(response.user.parallel_name);
          info.push(response.user.academic_period_name);
    
          
          

    
          return response.grades})
          .then(gradesList =>
            {
              console.log('notas',gradesList);
              gradesList.map((subject)=>{
                
                const datos = []
                
                datos.push({text:subject.subject_name,style:"names"})
                datos.push({text:subject.p1q1,style:"grades"})
                datos.push({text:subject.p2q1,style:"grades"})
                datos.push({text:subject.p3q1,style:"grades"})
                datos.push({text:subject.p1q2,style:"grades"})
                datos.push({text:subject.p2q2,style:"grades"})
                datos.push({text:subject.p3q2,style:"grades"})
                datos.push({text:subject.q1,style:"grades"})
                datos.push({text:subject.q2,style:"grades"})
                datos.push({text:subject.supletorio,style:"grades"})
                datos.push({text:subject.remedial,style:"grades"})
                datos.push({text:subject.gracia,style:"grades"})
                datos.push({text:subject.final,style:"grades"})
    
                data.push(datos);
                
              }); 
              createPDF(role, data, info).getBase64(response => setB64(response));
              console.log("info",info);
              
              dismiss();
            });

      } 
        
  }

  if(isLoading){
    return <IonLoading isOpen />
  }

  return (
    <IonPage>
      <Joyride steps={steps} continuous = {true} run = {tutorial}/>
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
           <IonItem className='ion-text-center'> <h2>Bienvenido/a al módulo de reportes.</h2> </IonItem>
          <IonItem className='ion-text-justify' lines='none'>
            <p >
              Seleccione {role === "teacher"?"una materia":"un periodo académico"} de la lista para generar un archivo PDF con las calificaciones del {role ==="teacher"?"período académico actual":"estudiante"}.
            </p>
            
          </IonItem>
          <IonItem hidden = {role === "teacher"}>
          <IonSelect class={role==='student'?'step8':""} placeholder='Seleccionar período académico'  onIonChange={(e)=>{
            
            periodList.map((period)=>{
              if(e.detail.value === period.name){ 
                setAcademicPeriod(period.id);
                handleReport({period:period.id});
              }      
            });
            
          }}>
          {periodList.map((period)=>
              <IonSelectOption key={period.id}>
                {period.name}
              </IonSelectOption>
            )
          }
        </IonSelect>
          </IonItem>


        <IonItem hidden={role === "student"}>
        
        <IonSelect class={role==='teacher'?'step8':""} placeholder='Seleccionar materia'  onIonChange={(e)=>{
            
            subjectList.map((subject)=>{
              if(e.detail.value === (role ==="teacher"?subject.name:subject.subject_name)){ //Compara el nombre seleccionado con el del arreglo de estudiantes
                setSubjectName(subject.name);
                handleReport({id:subject.id});
              }      
            });
            
          }}>
          {subjectList.map((subject)=>
              <IonSelectOption key={role ==="teacher"?subject.id:subject.subject_id}>
                {subject.name}
                
              </IonSelectOption>
            )
          }
        </IonSelect>
        </IonItem>

          <IonButton class='step9' disabled ={role === "teacher"?subjectName === "": academicPeriod===""} className='ion-margin-top' expand='block' onClick ={e=>{console.log({"info":info,"data":data});downloadPDF(role,data, info);setData([])}}>Generar reporte</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default ReportPage;
