import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../data/auth';
import { studentGrades } from '../data/grades';
import { reportFilters } from '../data/report';
import { teacherSubjects } from '../data/subjects';


const HomePage: React.FC = () => {
  const {role} = useAuth();
  const [subjectList, setSubjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [academicPeriod, setAcademicPeriod] = useState("1");
  const [periodList] = useState([]);
  const [present, dismiss] = useIonLoading();
  
  
  useEffect(() => {
    
    
    
    if(role === "teacher"){
      teacherSubjects().then((response) => response.subjects.map((subject) => {subjectList.push(subject);setIsLoading(false);}));
      
      console.log(subjectList);
      
    }
    else{
      
      reportFilters().then(data => {data.academic_periods.map(period => periodList.push(period));console.log(periodList);setIsLoading(false)
        })
      
    }
    
    
  },[]);


  async function handleStudentGrades(period: string) {
    present({message:"Cargando materias..."});
    const materias = []
    await studentGrades(period).then(response => {response.grades.map((subject) => {materias.push(subject);setIsLoading(false);setSubjectList(materias)});dismiss()})
    
  }
  
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
          <IonImg style={{width:180}} src='../assets/icon/logo.png'/>
        </IonItem>
        </IonRow>
        <IonItem className='ion-text-justify' lines='none'>
            <p >
              Seleccione una materia para {role === "student"?"obtener":"editar la"} información de las calificaciones del período académico {role === "teacher"? "actual": "seleccionado"}.
            </p>    
        </IonItem>
        
        <IonSelect className='ion-margin-bottom' hidden = {role === "teacher"} placeholder='Seleccionar período académico'  onIonChange={(e)=>{
          
            periodList.map((period)=>{
              
              if(e.detail.value === period.name){ 
                
                console.log(true);
                handleStudentGrades(period.id);
                console.log(subjectList);
                setAcademicPeriod(period.id);
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
        <IonItem>
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
                routerLink={`/my/subjects/${subject.subject_id}/${academicPeriod}`}
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
