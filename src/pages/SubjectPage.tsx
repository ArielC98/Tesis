import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, RefresherEventDetail, useIonAlert, useIonLoading } from '@ionic/react';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {  useParams } from 'react-router';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { studentsList } from '../data/students';
import { studentGrades, teacherGrades } from '../data/grades';
import { updateGrades } from '../data/grades';
import { useAuth } from '../data/auth';
import Joyride,{ Step } from 'react-joyride';



interface RouteParams {
  id:string;
  period:string;
}
interface State{
  run: boolean;
  steps: Step[];
}

const SubjectPage: React.FC = () => {

  const [students] = useState([]);
  const {role, tutorial} = useAuth();
  const {id, period} = useParams<RouteParams>(); //return an object with the parameters passed in the URL
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [{quim1,quim2}, setQuimEnd] = useState({quim1:"",quim2:""});
  const [grades] = useState([{}]);
  const [subjects] = useState([]);
  const [present, dismiss] = useIonLoading();
  const [showAlert] = useIonAlert();
  const [subjectName, setSubjectName] = useState("");
  const gridRef = useRef<AgGridReact>();
  const [repetir, setRepetir] = useState(false);
  const [{steps}] = useState<State>({
    run:true,
    steps:[
        {
            target: 'body',
            placement:'center',
            content: <h3>Bienvenido/a a la sección de calificaciones</h3>,
            locale:{next:"Siguiente"}
        },
        {
            target: '.step12',
            title:`Lista de ${role === "teacher"?"Estudiantes":"Materias"}`,
            content: 'Seleccione una opción para deplegar las notas correspondientes',
            locale:{next:"Siguiente", back:"Anterior"}
        },
        {
            target: '.step13-teacher',
            content: 'En la tabla puede editar las notas de los parciales y, en caso de que el/la estudiante tenga menos de 7 de promedio final, se despliegan las celdas de exámenes extra.',
            locale:{next:"Siguiente", back:"Anterior"}
        },
        {
            target: '.step13-student',
            content: 'En la tabla puede observar las notas de los parciales, quimestrales, nota final y exámentes extra en caso de tener un promedio menor a 7.',
            locale:{next:"Siguiente", back:"Anterior"}
        },
        {
            target: '.step14',
            content: 'Utilice los botones para navegar entre las diferentes tablas de calificaciones',
            locale:{next:"Siguiente", back:"Anterior"}
        },
        {
            target: '.step15',
            content: 'Al terminar de editar las notas, pulse el botón Guardar y la información se subirá al sistema.',
            locale:{next:"Siguiente", back:"Anterior", last:"Final"}
        },
      
    
    ]
})

  
  //Funcion para manejar la recarga de la pagina
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      role === "teacher" ? handleGrades({studentId :students[0].id ,subjectId:id}): handleGrades({academicPeriod:period});
      event.detail.complete();
    }, 1000);
  }

  //Celdas no editables de la tabla
  const isCellNoEditable = (params) => {    
      return params.data["descripción"] === "Final" ||  params.data["descripción"] === "Quimestre 1" || params.data["descripción"] === "Quimestre 2"  
  };

  //Control de celdas individuales de la tabla
  const columnTypes = useMemo(() => {
    return {
      editableColumn: {
        editable: (params) => {
          return !isCellNoEditable(params) && role === "teacher";
        },
        cellStyle: (params) => {
          if (isCellNoEditable(params)) {
            if(params.data["descripción"] === "Quimestre 1" || params.data["descripción"] === "Quimestre 2"){
              return { backgroundColor: '#ffe080' }
            }
            if(params.data["descripción"] === "Final"){
              return { backgroundColor: '#7a2f27', color: "white" }
            }
          }
        },
      },
    };
  }, []);

  
  //Operaciones iniciales 
    
  useEffect(() => {

    if(role === "teacher"){
      studentsList(id).then((response) => {response.students.map((student) => {students.push(student)});
      setIsLoading(false);
      handleGrades({studentId :students[0].id ,subjectId:id});
      }).catch(()=> {showAlert({header:'Materia no disponible', buttons:[{text:"Ok"}]}); setIsLoading(false);})
    }
    else{
      studentGrades(period,localStorage.getItem("access_token")).then((response) => {response.grades.map((subject) => {if(subject.subject_id === +id){subjects.unshift(subject)}else{subjects.push(subject)}});
      setIsLoading(false);
      handleGrades({academicPeriod :period});
      
      })
    }

    

  },[id,role,students]);


  //Funcion para obtener las calificaciones

  async function handleGrades ({studentId = "" , subjectId="", academicPeriod = "", subjectNameParam = ""}) {

    
    present({
      message: 'Cargando notas...',

    })

    if(role === "teacher"){
      await teacherGrades(studentId,subjectId,localStorage.getItem("access_token")).then(response =>{setQuimEnd({quim1:response.finq1,quim2:response.finq2});grades.push(response.grades[0]);grades.shift();setSubjectName(response.grades[0].subject_name);
      dismiss(); setRepetir(true)});
    }

    else{
        await studentGrades(academicPeriod, localStorage.getItem("access_token")).then(response => {
          if(subjectNameParam === ""){
          grades.push(response.grades.find(grade => grade.subject_id === +id  ))}
          else{
            grades.push(response.grades.find(grade => grade.subject_name === subjectNameParam))
          }
          grades.shift();dismiss();setRepetir(true);
        }
      );
    }
    
    if(grades[0]["final"] < 7.00 && grades[0]["final"]){

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
    else{
      setRowDataTeacher([
        {'descripción': "Parcial 1 Q 1", puntaje: grades[0]["p1q1"]?.toFixed(2)},
        {'descripción': "Parcial 2 Q 1", puntaje: grades[0]["p2q1"]?.toFixed(2)},
        {'descripción': "Parcial 3 Q 1", puntaje: grades[0]["p3q1"]?.toFixed(2)},
        {'descripción': "Quimestre 1", puntaje: grades[0]["q1"]?.toFixed(2)},
        {'descripción': "Parcial 1 Q 2", puntaje: grades[0]["p1q2"]?.toFixed(2)},
        {'descripción': "Parcial 2 Q 2", puntaje: grades[0]["p2q2"]?.toFixed(2)},
        {'descripción': "Parcial 3 Q 2", puntaje: grades[0]["p3q2"]?.toFixed(2)},
        {'descripción': "Quimestre 2", puntaje: grades[0]["q2"]?.toFixed(2)},
        {'descripción': "Final", puntaje: grades[0]["final"]?.toFixed(2)}
      ])
    }

  }

  //Funcion para actualizar las calificaciones
  async function handleUpdate (studentId: string, subjectId: string) {

    const quim1Date = new Date(quim1);
    const quim2Date = new Date(quim2);
    const currentDate = new Date();

    const quim1GradesAvailable = quim1Date.getTime() >= currentDate.getTime(); 
    const quim2GradesAvailable = quim2Date.getTime() >= currentDate.getTime() && !quim1GradesAvailable; 
    //Se actualizan las unicas notas que deberian modificarse


    const tempGrades = {
      p1q1:rowDataTeacher[0]?.puntaje,
      p2q1:rowDataTeacher[1]?.puntaje,
      p3q1:rowDataTeacher[2]?.puntaje,
      p1q2:rowDataTeacher[4]?.puntaje,
      p2q2:rowDataTeacher[5]?.puntaje,
      p3q2:rowDataTeacher[6]?.puntaje,
      supletorio:rowDataTeacher[9]?.puntaje,
      remedial:rowDataTeacher[10]?.puntaje,
      gracia:rowDataTeacher[11]?.puntaje
    }
  
    if(tempGrades.p1q1 === undefined){tempGrades.p1q1 = ""};
    if(tempGrades.p2q1 === undefined){tempGrades.p2q1 = ""};
    if(tempGrades.p3q1 === undefined){tempGrades.p3q1 = ""};
    if(tempGrades.p1q2 === undefined){tempGrades.p1q2 = ""};
    if(tempGrades.p2q2 === undefined){tempGrades.p2q2 = ""};
    if(tempGrades.p3q2 === undefined){tempGrades.p3q2 = ""};
    if(tempGrades.supletorio === undefined){tempGrades.supletorio = ""};
    if(tempGrades.remedial === undefined){tempGrades.remedial = ""};
    if(tempGrades.gracia === undefined){tempGrades.gracia = ""};

    // if(quim1GradesAvailable){
    //   delete tempGrades.p1q2;
    //   delete tempGrades.p2q2;
    //   delete tempGrades.p3q2;
    //   delete tempGrades.supletorio;
    //   delete tempGrades.remedial;
    //   delete tempGrades.gracia;
    // }
    // else if(quim2GradesAvailable){
    //   delete tempGrades.p1q1;
    //   delete tempGrades.p2q1;
    //   delete tempGrades.p3q1;
    //   delete tempGrades.supletorio;
    //   delete tempGrades.remedial;
    //   delete tempGrades.gracia;
    // }
    // else{
    //   delete tempGrades.p1q1;
    //   delete tempGrades.p2q1;
    //   delete tempGrades.p3q1;
    //   delete tempGrades.p1q2;
    //   delete tempGrades.p2q2;
    //   delete tempGrades.p3q2;
    // }

    const isBetweenValues = (currentValue: number) => currentValue <= 10.00 && currentValue >= 0.00;
    const isNull = (currentValue) => currentValue === null  || currentValue === "" || currentValue === undefined;

    
    if(Object.values(tempGrades).some(item => !(isNull(item)) && !isBetweenValues(item))){

      showAlert("Las notas deben ser números decimales separados por punto entre 0.00 y 10.00");
      
    }
    else{
      
      present({
        message: 'Cargando...',
      })
      Object.values(tempGrades).some(item=> {if(item === undefined){item = ""}});
      await updateGrades(studentId,subjectId,localStorage.getItem("access_token"),tempGrades).then(response =>{
       dismiss();showAlert(response.message)}).catch(() => {dismiss();showAlert("Error en la actualizacion")});
      
    }  
  }

  //Valores iniciales de la tabla

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
  
  ]);

  //Definicion de las columnas de la tabla

  const columnDefsTeacher = [
      { field: 'descripción', width: 175},
      { field: 'puntaje', width: 120, type: 'editableColumn'},
      
  ]

  //Icono de carga

  if(isLoading){
    return <IonLoading isOpen/>
  }



  return (
    <IonPage>
      <Joyride 
        steps={steps} 
        continuous 
        run={tutorial && !(localStorage.getItem("repeatSubjects") ==="no")}
        callback={()=>{if(!(localStorage.getItem("repeatSubjects") === "no") && repetir){
          localStorage.setItem("repeatSubjects","no")
        }}}
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle>GESTIÓN DE NOTAS</IonTitle>
          <IonButtons slot="start">
          <IonBackButton  defaultHref="/my/dashboard" text=''/>
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonItem className='ion-no-margin ion-text-center' lines='none'>
          <IonLabel style={{marginTop:-35, marginBottom:-15}}>{subjectName}</IonLabel>
        </IonItem>
        <IonItem class='step12' style={{marginTop:-20}}>
        <IonLabel  position='stacked'>Seleccionar {role === "teacher"?"Estudiante":"Materia"}</IonLabel>
          <IonSelect   placeholder='Estudiante' value = {role === "teacher"?students[count]?.name+ " " + students[count]?.last_name : subjects[count]?.subject_name} onIonChange={(e)=>{
              
              (role==="teacher"?students:subjects).map((item,position)=>{
                if(e.detail.value === (role==="teacher"?item.name + " " + item.last_name:item.subject_name)){ //Compara el nombre seleccionado con el del arreglo de estudiantes
                  setCount(position) 
                  
                  if(role ==="teacher"){
                  handleGrades({studentId:item.id,subjectId:id}) //Pasa los parametros del id del estudiante y materia
                  }
                  else{
                    handleGrades({academicPeriod:period, subjectNameParam:e.detail.value})
                    
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
            <IonCol class={role==="teacher"?"step13-teacher":"step13-student"}>
            
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
          <IonRow class='step14'>
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
              <IonButton hidden = {role === "student"} className= {role === "teacher"?'step15':""}  expand= 'block' color="warning"
                onClick={() => handleUpdate (students[count].id,id)}
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
