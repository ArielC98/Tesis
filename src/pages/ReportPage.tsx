import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import { createPDF } from '../data/PDFFile';
import { Browser } from '@capacitor/browser';
import { useAuth } from '../data/auth';
import { teacherReport } from '../data/report';
import { teacherSubjects } from '../data/subjects';
import { studentGrades } from '../data/grades';


const ReportPage: React.FC = () => {

  const {role} = useAuth();
  const [isLoading,setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [info,setInfo] = useState([]);
  const [subjectList] = useState([]);
  const [academicPeriod, setAcademicPeriod] = useState("1");

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

  async function handleReport(id: string){
    
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
            
          }); 
          

          setIsLoading(false)
    });
  }

  if(isLoading){
    return <IonLoading isOpen />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reporte1</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Pagina de reporte</h1>

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



          <IonButton onClick ={e=>{createPDF(role,data, info);setData([])}}>Reporte</IonButton>
          
          

      </IonContent>
    </IonPage>
  );
};

export default ReportPage;
