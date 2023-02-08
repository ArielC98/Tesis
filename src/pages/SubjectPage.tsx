import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonLoading, IonPage, IonRefresher, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, RefresherEventDetail, useIonAlert, useIonLoading } from '@ionic/react';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { studentsList } from '../data/students';
import { studentGrades, teacherGrades } from '../data/grades';
import { updateGrades } from '../data/grades';
import { useAuth } from '../data/auth';
import { log } from 'console';




interface RouteParams {
  id:string;
}

const SubjectPage: React.FC = () => {

  const [students] = useState([]);
  const {role} = useAuth();
  const {id} = useParams<RouteParams>(); //return an object with the parameters passed in the URL
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState([{}]);
  const [subjects, setSubjects] = useState([]);
  const [present, dismiss] = useIonLoading();
  const [showAlert, hideAlert] = useIonAlert();
  const [subjectName, setSubjectName] = useState("");
  const gridRef = useRef<AgGridReact>();
  
  
  

  const isCellNoEditable = (params) => {    
    return params.data["descripción"] === "Final" ||  params.data["descripción"] === "Quimestre 1" || params.data["descripción"] === "Quimestre 2"
  };

  const columnTypes = useMemo(() => {
    return {
      editableColumn: {
        editable: (params) => {
          return !isCellNoEditable(params);
        },
        cellStyle: (params) => {
          if (isCellNoEditable(params)) {
            return { backgroundColor: '#ffe080' };
          }
        },
      },
    };
  }, []);

  

    
  useEffect(() => {
    

    if(role === "teacher"){
      studentsList(id).then((response) => {response.students.map((student) => {students.push(student)});console.log(students);
      setIsLoading(false);
      handleGrades({studentId :students[0].id ,subjectId:id});
      })
    }
    else{
      studentGrades("1").then((response) => {response.grades.map((subject) => {if(subject.subject_id === +id){subjects.unshift(subject)}else{subjects.push(subject)}});
      console.log("subjects",subjects);
      setIsLoading(false);
      handleGrades({academicPeriod :"1"});
      })
    }

  },[id,role,students]);

  //Function to get grades

  async function handleGrades ({studentId = "" , subjectId="", academicPeriod = "", subjectNameParam = ""}) {

    
    present({
      message: 'Cargando notas...',

    })

    if(role === "teacher"){
      await teacherGrades(studentId,subjectId).then(response =>{console.log("notas",response.grades[0]);grades.push(response.grades[0]);grades.shift();setSubjectName(response.grades[0].subject_name);dismiss()});
    }

    else{
      console.log(subjects);
        await studentGrades(academicPeriod).then(response => {
          if(subjectNameParam === ""){
          grades.push(response.grades.find(grade => grade.subject_id === +id  )); 
          console.log("grades",grades)}
          else{
            grades.push(response.grades.find(grade => grade.subject_name === subjectNameParam))
          }
          grades.shift();dismiss();
        }
      );
    }
    
    

    setRowDataTeacher([
      {'descripción': "Parcial 1 Q 1", puntaje: grades[0]["p1q1"]?.toFixed(2)},
      {'descripción': "Parcial 2 Q 1", puntaje: grades[0]["p2q1"]?.toFixed(2)},
      {'descripción': "Parcial 3 Q 1", puntaje: grades[0]["p3q1"]?.toFixed(2)},
      {'descripción': "Quimestre 1", puntaje: grades[0]["q1"]?.toFixed(2)},
      {'descripción': "Parcial 1 Q 2", puntaje: grades[0]["p1q2"]?.toFixed(2)},
      {'descripción': "Parcial 2 Q 2", puntaje: grades[0]["p2q2"]?.toFixed(2)},
      {'descripción': "Parcial 3 Q 2", puntaje: grades[0]["p3q2"]?.toFixed(2)},
      {'descripción': "Quimestre 2", puntaje: grades[0]["q2"]?.toFixed(2)},
      {'descripción': "Final", puntaje: grades[0]["final"]?.toFixed(2)},
      {'descripción': "Supletorio", puntaje: grades[0]["supletorio"]?.toFixed(2)},
      {'descripción': "Remedial", puntaje: grades[0]["remedial"]?.toFixed(2)},
      {'descripción': "Gracia", puntaje: grades[0]["gracia"]?.toFixed(2)},
      
    ])
    

  }

  async function handleUpdate (studentId: string, subjectId: string) {

    //Se actualizan las unicas notas que deberian modificarse
    
    const tempGrades = {
      p1q1:rowDataTeacher[0].puntaje,
      p2q1:rowDataTeacher[1].puntaje,
      p3q1:rowDataTeacher[2].puntaje,
      p1q2:rowDataTeacher[4].puntaje,
      p2q2:rowDataTeacher[5].puntaje,
      p3q2:rowDataTeacher[6].puntaje,
      supletorio:rowDataTeacher[9].puntaje,
      remedial:rowDataTeacher[10].puntaje,
      gracia:rowDataTeacher[11].puntaje
    }

    if(tempGrades.supletorio === undefined){tempGrades.supletorio = ""};
    if(tempGrades.remedial === undefined){tempGrades.remedial = ""};
    if(tempGrades.gracia === undefined){tempGrades.gracia = ""};

    const isBetweenValues = (currentValue: number) => currentValue <= 10.00 && currentValue >= 0.00;
    console.log(!Object.values(tempGrades).slice(0,6).every(isBetweenValues));
    console.log(tempGrades.supletorio);
    console.log(Object.values(tempGrades).slice(-3).some(item => !(item === "" || item === null) && !isBetweenValues(item)));
    if(!Object.values(tempGrades).slice(0,6).every(isBetweenValues) || Object.values(tempGrades).slice(-3).some(item => !(item === undefined || item === "" || item === null) && !isBetweenValues(item))){
      
      showAlert("Las notas deben ser números decimales separados por punto entre 0.00 y 10.00");
      
    }
    else{
      
      present({
        message: 'Cargando...',
      })
      console.log(tempGrades);
      await updateGrades(studentId,subjectId,tempGrades).then(response =>{dismiss();showAlert(response.message)});
      
    }  
  }



  const [rowDataTeacher, setRowDataTeacher] = useState([
      {'descripción': "Parcial 1 Q 1", puntaje: grades[0]["p1q1"]?.toFixed(2)},
      {'descripción': "Parcial 2 Q 1", puntaje: grades[0]["p2q1"]?.toFixed(2)},
      {'descripción': "Parcial 3 Q 1", puntaje: grades[0]["p3q1"]?.toFixed(2)},
      {'descripción': "Quimestre 1", puntaje: grades[0]["q1"]?.toFixed(2)},
      {'descripción': "Parcial 1 Q 2", puntaje: grades[0]["p1q2"]?.toFixed(2)},
      {'descripción': "Parcial 2 Q 2", puntaje: grades[0]["p2q2"]?.toFixed(2)},
      {'descripción': "Parcial 3 Q 2", puntaje: grades[0]["p3q2"]?.toFixed(2)},
      {'descripción': "Quimestre 2", puntaje: grades[0]["q2"]?.toFixed(2)},
      {'descripción': "Final", puntaje: grades[0]["final"]?.toFixed(2)},
      {'descripción': "Supletorio", puntaje: grades[0]["supletorio"]?.toFixed(2)},
      {'descripción': "Remedial", puntaje: grades[0]["remedial"]?.toFixed(2)},
      {'descripción': "Gracia", puntaje: grades[0]["gracia"]?.toFixed(2)},
  ]);

  const columnDefsTeacher = [
      { field: 'descripción', width: 175},
      { field: 'puntaje', width: 120, type: 'editableColumn'},
      
  ]

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
    
        <IonItem className='ion-no-margin ion-text-center' lines='none'>
          <IonLabel style={{marginTop:-35, marginBottom:-15}}>{subjectName}</IonLabel>
        </IonItem>
        <IonItem style={{marginTop:-20}}>
        <IonLabel position='stacked'>Seleccionar {role === "teacher"?"Estudiante":"Materia"}</IonLabel>
          <IonSelect   placeholder='Estudiante' value = {role === "teacher"?students[count].name+ " " + students[count].last_name : subjects[count].subject_name} onIonChange={(e)=>{
              
              (role==="teacher"?students:subjects).map((item,position)=>{
                if(e.detail.value === (role==="teacher"?item.name + " " + item.last_name:item.subject_name)){ //Compara el nombre seleccionado con el del arreglo de estudiantes
                  setCount(position) 
                  
                  if(role ==="teacher"){
                  handleGrades({studentId:item.id,subjectId:id}) //Pasa los parametros del id del estudiante y materia
                  }
                  else{
                    handleGrades({academicPeriod:"1", subjectNameParam:e.detail.value})
                    
                  }
                }      
              })
              
            }}>
            {role === "teacher"?
            students.map((student)=>
                <IonSelectOption key={student.id}>
                  {student.name + " " + student.last_name}
                </IonSelectOption>
              )
              :
              subjects.map((subject) =>
                <IonSelectOption key={subject.subject_id}>
                  {subject.subject_name}
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
                  columnTypes={columnTypes}
                  ref={gridRef}
                  rowData={rowDataTeacher}
                  columnDefs={columnDefsTeacher}>
                </AgGridReact>
              </div>
            
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          </IonGrid>
            
          <IonGrid>
          <IonRow>
            <IonCol >
              <IonButton  expand='block' onClick={()=>{count === 0? setCount((role === "teacher"?students:subjects).length-1) : setCount(count-1);
              }}> Anterior</IonButton>
            </IonCol>
            <IonCol >
              <IonButton expand ='block' onClick={()=>{count === ((role === "teacher"?students:subjects).length - 1) ? setCount(0) : setCount(count+1);
            }}>Siguiente</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
              <IonCol size='7'>
              <IonButton className={role === "teacher"?'':"ion-hide"}  expand= 'block' color="warning"
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
