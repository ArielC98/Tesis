import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../data/auth';
import { studentGrades } from '../data/grades';
import { teacherSubjects } from '../data/subjects';


const HomePage: React.FC = () => {
  const {role} = useAuth();
  const [subjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [academicPeriod, setAcademicPeriod] = useState("1");
  
  

  useEffect(() => {


    
    if(role === "teacher"){
      teacherSubjects().then((response) => response.subjects.map((subject) => {subjectList.push(subject);setIsLoading(false);}));
    
      console.log(subjectList);
    
    }
    else{
      studentGrades(academicPeriod).then(response => response.grades.map((subject) => {subjectList.push(subject);setIsLoading(false);})
      )
    }
    
    
  },[]);
  
  if(isLoading){
    return <IonLoading isOpen/>
  }
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLabel className='ion-text-center'><h1>Sistema de Gestión de Notas</h1></IonLabel>

        <IonRow className='ion-justify-content-center'>
        <IonItem>
          <IonImg style={{width:250}} src='../assets/icon/logo.png'/>
        </IonItem>
        </IonRow>
        <IonItem className='ion-text-justify' lines='none'>
            <p >
              Seleccione una materia para obtener información de las calificaciones del período académico.
            </p>    
        </IonItem>
        <IonItem lines='none'>
        <IonLabel><h1>Lista de materias</h1></IonLabel>
        </IonItem>
        <IonList>
          {role==="teacher"? //Si el rol es de profesor
            subjectList.map((subject)=>
              <IonItem 
                button 
                detail
                key={subject.id}
                routerLink={`/my/subjects/${subject.id}`}
                >
                  
                  <IonLabel>
                    <h3>{subject.name}</h3>
                    <p>{subject.course + " " + subject.parallel}</p>
                  </IonLabel>
                </IonItem>
            ): //Si el rol es de estudiante
            subjectList.map((subject)=>
              <IonItem 
                button 
                detail
                key={subject.id}
                routerLink={`/my/subjects/${subject.subject_id}`}
                >
                  
                  <IonLabel>
                    <h2>{subject.subject_name}</h2>
                  
                  </IonLabel>
                </IonItem>
            )
          }
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
