import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import Joyride,{ Step } from 'react-joyride';
import { useAuth } from '../data/auth';
import { userData, updateProfileData, updateProfilePic } from '../data/information';


interface State{
    run: boolean;
    steps: Step[];
}

const ProfilePage: React.FC = () => {



    const [isLoading, setIsLoading] = useState(true);
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [id, setId] = useState(null);
    const [birthDate, setBirthdate] = useState(null);
    const [email, setEmail] = useState(null);
    const [homePhone, setHomePhone] = useState(null);
    const [mobilePhone, setMobilePhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [photo, setPhoto] = useState("");
    const [present, dismiss] = useIonLoading();
    const [showAlert, hideAlert] = useIonAlert();
    const [image, setImage] = useState<FormData>();
    const {role, tutorial} = useAuth();
    const [{run,steps}, setSteps] = useState<State>({
        run:true,
        steps:[
            {
                target: 'body',
                placement:'center',
                content: <h3>Bienvenido/a a la sección de su perfil personal</h3>,
                showProgress:true,
                locale:{next:"Siguiente"}
            },
            {
                target: '.step4',
                title:"Foto de perfil",
                content: 'Aquí podrá cambiar su foto de perfil por otra que se encuentre en su dispositivo',
                showProgress:true,
                locale:{next:"Siguiente", back:"Anterior"}
            },
            {
                target: '.step5',
                content: 'También podrá observar su información personal',
                showProgress:true,
                locale:{next:"Siguiente", back:"Anterior"}
            },
            {
                target: '.step6',
                content: `Y ${role === "teacher"?"editar":""} su información de contacto ${role === "teacher"?"en caso de ser necesario":""}`,
                showProgress:true,
                locale:{next:"Siguiente", back:"Anterior"}
            },
            {
                target: '.step7',
                content: 'Cuando haya realizado los cambios necesarios haga clic en el botón guardar para almacenar su información en el sistema',
                showProgress:true,
                locale:{next:"Siguiente", back:"Anterior", last:"Final"}
            },
        
        ]
    })


    function changeImage(event){
        
        const foto = event.target.files[0];
        const data = new FormData();
        data.append('image',foto,'user-avatar.jpg');
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            setPhoto(reader.result.toString());
        }
        setImage(data);        
    }




    
    
    const changeEmail = (e) =>{
        e.preventDefault();
        setEmail(e.target.value);
        
    }
    const changeHomePhone = (e) =>{
        e.preventDefault();
        setHomePhone(e.target.value);
        
    }
    const changeMobilePhone = (e) =>{
        e.preventDefault();
        setMobilePhone(e.target.value);
        
    }
    const changeAddress = (e) =>{
        e.preventDefault();
        setAddress(e.target.value);
        
    }
    async function updateInfo(){
        
        present({
            message:"Un momento..."
        })

        if(role === "teacher"){
            await updateProfileData({
                "personal_phone":mobilePhone,
                "home_phone":homePhone,
                "email":email,
                "address":address
            }).catch(e=>console.log(e));
            await updateProfilePic(image).catch(e=>console.log(e));
        }
        else{
            await updateProfilePic(image).catch(e =>console.error(e))
            
        }
        dismiss();
        showAlert("Información actualizada con éxito");
    }
    
    

    useEffect(() => {
        const information = userData();
        
        information.then(response => {
            setAvatar(response.data.avatar);
            setName(response.data.user.name);
            setLastName(response.data.user.last_name);
            setId(response.data.user.identification);
            setBirthdate(response.data.user.birthdate);
            setEmail(response.data.user.email);
            setHomePhone(response.data.user.home_phone);
            setMobilePhone(response.data.user.personal_phone);
            setAddress(response.data.user.address);
            setIsLoading(false);
        })
        }, []);

    if(isLoading){
        return(
            <IonLoading isOpen/>
        );
    }

    return (
        <IonPage>
        <Joyride 
            steps={steps} 
            continuous={true} 
            run={tutorial && !(localStorage.getItem("repeatProfile") ==="no")}
            callback={()=>{localStorage.setItem("repeatProfile","no")}}
            />
        <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
            <IonTitle>Perfil</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonGrid className='ion-margin-bottom' class='step4'>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol>
                        <IonImg  style={{width:"150px", height:"200px"}} src={photo === ""? avatar:photo}/>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
                
                <IonRow>
                    
                    <IonCol></IonCol>
                    <IonCol>
                    <input id='foto' hidden type={'file'} accept={'.png'} onChange={e => changeImage(e)}/>
                            <IonButton onClick={()=>  document.getElementById('foto').click()}>Editar Foto</IonButton>
                    </IonCol>
                    <IonCol></IonCol>

                    
                </IonRow>
            </IonGrid>

            <div className='step5'>
            <IonLabel  style={{fontWeight:"bold"}}>INFORMACIÓN PERSONAL</IonLabel>

        

            <IonList className='ion-margin-bottom'>
                <IonItem>
                    <IonLabel position='stacked'>Nombres</IonLabel>
                    <IonInput type='text' value={name} readonly/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Apellidos</IonLabel>
                    <IonInput type='text' value={lastName} readonly/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Identificación</IonLabel>
                    <IonInput type='text' value={id} readonly/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Fecha de nacimiento</IonLabel>
                    <IonInput type='text' value={birthDate} readonly/>
                </IonItem>
            </IonList>
            </div>

            <div className='step6'>
            <IonLabel style={{fontWeight:"bold"}}>INFORMACIÓN DE CONTACTO</IonLabel>

            <IonList>
                <IonItem>
                    <IonLabel position='stacked'>Correo</IonLabel>
                    <IonInput readonly = {role === "student"} type='email' value={email} onIonChange={changeEmail}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Teléfono fijo</IonLabel>
                    <IonInput readonly = {role === "student"} type='text' value={homePhone} onIonChange={changeHomePhone}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Teléfono celular</IonLabel>
                    <IonInput readonly = {role === "student"} type='text' value={mobilePhone} onIonChange={changeMobilePhone}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Dirección</IonLabel>
                    <IonTextarea readonly = {role === "student"} value={address} onIonChange={changeAddress}/>
                </IonItem>
                
                
            </IonList>
            </div>
            <IonButton class='step7' expand='block' disabled = {address === "" || mobilePhone === "" || homePhone === "" || email === "" || (role === "student" && photo ==='')} onClick={() =>{updateInfo(); console.log(role)}
            }>Guardar</IonButton>
        </IonContent>
        </IonPage>
    );
};

export default ProfilePage;