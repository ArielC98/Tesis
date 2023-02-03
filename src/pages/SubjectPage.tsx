import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { studentsList } from '../data/students';
import { teacherGrades } from '../data/grades';
import { updateGrades } from '../data/grades';
import { useAuth } from '../data/auth';


interface RouteParams {
  id:string;
}

const SubjectPage: React.FC = () => {

  const [students] = useState([]);
  const {role} = useAuth();
  const {id} = useParams<RouteParams>(); //return an object with the parameters passed in the URL
  //const [actualStudent, setActualStudent] = useState("");
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState([{}]);
  const [present, dismiss] = useIonLoading();
  const [showAlert, hideAlert] = useIonAlert();
  const [subjectName, setSubjectName] = useState("");
  const gridRef = useRef<AgGridReact>();
  


  useEffect(() => {
    
    
    if(role === "teacher"){
      studentsList(id).then((response) => {response.students.map((student) => {students.push(student)});
      handleGrades(students[0].id,id);setIsLoading(false);
      })
    }
    else{
      
    }

    

  },[id,role,students]);

  async function handleGrades (studentId: string, subjectId: string) {
    
    present({
      message: 'Cargando...',
      duration: 4000
    })
    await teacherGrades(studentId,subjectId).then(response =>{grades.push(response.grades[0]);grades.shift();setSubjectName(response.grades[0].subject_name)});
    
    

    setRowData([
      {'descripción': "Parcial 1 Q 1", puntaje: grades[0]["p1q1"].toFixed(2)},
      {'descripción': "Parcial 2 Q 1", puntaje: grades[0]["p2q1"].toFixed(2)},
      {'descripción': "Parcial 3 Q 1", puntaje: grades[0]["p3q1"].toFixed(2)},
      {'descripción': "Quimestre 1", puntaje: grades[0]["q1"].toFixed(2)},
      {'descripción': "Parcial 1 Q 2", puntaje: grades[0]["p1q2"].toFixed(2)},
      {'descripción': "Parcial 2 Q 2", puntaje: grades[0]["p2q2"].toFixed(2)},
      {'descripción': "Parcial 3 Q 2", puntaje: grades[0]["p3q2"].toFixed(2)},
      {'descripción': "Quimestre 2", puntaje: grades[0]["q2"].toFixed(2)},
      {'descripción': "Supletorio", puntaje: grades[0]["supletorio"]?.toFixed(2)},
      {'descripción': "Remedial", puntaje: grades[0]["remedial"]?.toFixed(2)},
      {'descripción': "Gracia", puntaje: grades[0]["gracia"]?.toFixed(2)},
      
    ])
    

  }

  async function handleUpdate (studentId: string, subjectId: string) {
    
    const tempGrades = {
      p1q1:rowData[0].puntaje,
      p2q1:rowData[1].puntaje,
      p3q1:rowData[2].puntaje,
      p1q2:rowData[3].puntaje,
      p2q2:rowData[4].puntaje,
      p3q2:rowData[5].puntaje,
      supletorio:rowData[6].puntaje,
      remedial:rowData[7].puntaje,
      gracia:rowData[8].puntaje
    }

    const isBetweenValues = (currentValue: number) => currentValue <= 10.00 && currentValue >= 0.00;
    
    if(Object.values(tempGrades).every(isBetweenValues)){
      present({
        message: 'Cargando...',
      })
      await updateGrades(studentId,subjectId,tempGrades).then(response =>{dismiss();showAlert(response.message)});
    }
    else{
      
      showAlert("Las notas deben ser números decimales separados por punto entre 0.00 y 10.00");
      
    }  
  }

 

  const [rowData, setRowData] = useState([
      {'descripción': "Parcial 1 Q 1", puntaje: grades[0]["p1q1"]?.toFixed(2)},
      {'descripción': "Parcial 2 Q 1", puntaje: grades[0]["p2q1"]?.toFixed(2)},
      {'descripción': "Parcial 3 Q 1", puntaje: grades[0]["p3q1"]?.toFixed(2)},
      {'descripción': "Quimestre 1", puntaje: grades[0]["q1"]?.toFixed(2)},
      {'descripción': "Parcial 1 Q 2", puntaje: grades[0]["p1q2"]?.toFixed(2)},
      {'descripción': "Parcial 2 Q 2", puntaje: grades[0]["p2q2"]?.toFixed(2)},
      {'descripción': "Parcial 3 Q 2", puntaje: grades[0]["p3q2"]?.toFixed(2)},
      {'descripción': "Quimestre 2", puntaje: grades[0]["q2"]?.toFixed(2)},
      {'descripción': "Supletorio", puntaje: grades[0]["q2"]?.toFixed(2)},
      {'descripción': "Remedial", puntaje: grades[0]["q2"]?.toFixed(2)},
      {'descripción': "Gracia", puntaje: grades[0]["q2"]?.toFixed(2)},
  ]);

  const [columnDefs] = useState([
      { field: 'descripción', width: 175},
      { field: 'puntaje', width: 120, editable: role === "teacher"},
      
  ])

  if(isLoading){
    return <IonLoading isOpen/>
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GESTIÓN DE NOTAS</IonTitle>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/my/dashboard" text=''/>
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <IonTitle className='ion-text-center'>{subjectName}</IonTitle>

        <IonItem >
        <IonLabel position='stacked'>Seleccionar Estudiante</IonLabel>
          <IonSelect   placeholder='Estudiante' value = {students[count].name} onIonChange={(e)=>{
            console.log(students); 
              students.map((student,position)=>{
                if(e.detail.value === student.name){ //Compara el nombre seleccionado con el del arreglo de estudiantes
                  setCount(position)
                  console.log("activado");
              
                  handleGrades(student.id,id) //Pasa los parametros del id del estudiante y materia
                
                }      
              })
              
            }}>
            {students.map((student)=>
                <IonSelectOption key={student.id}>
                  {student.name}
                </IonSelectOption>
              )
            }
          </IonSelect>
        </IonItem>

        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
            <div className="ag-theme-alpine" style={{height: 520, width: 300, marginLeft:4}}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          </IonGrid>
            
          <IonGrid>
          <IonRow>
            <IonCol >
              <IonButton  expand='block' onClick={()=>{console.log("count",count);setCount(count-1);
              }}> Anterior</IonButton>
            </IonCol>
            <IonCol >
              <IonButton expand ='block' onClick={()=>{console.log("countInicial",count);setCount(count+1);
            }}>Siguiente</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
          
            <IonCol></IonCol>
              <IonCol size='7'>
              <IonButton  expand= 'block' color="warning"
                onClick={e =>  handleUpdate (students[count].id,id)}
              >Guardar</IonButton>
              </IonCol>
              <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        
          
            
          
          
      </IonContent>
    </IonPage>
  );
};

export default SubjectPage;
