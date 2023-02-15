import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../data/auth';
import { userData, updateProfileData, updateProfilePic } from '../data/information';
import './ProfilePage.css';


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
    const {role} = useAuth();
    


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
        <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
            <IonTitle>Perfil</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonGrid className='ion-margin-bottom'>
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
                
                    <IonButton expand='block' disabled = {address === "" || mobilePhone === "" || homePhone === "" || email === "" || (role === "student" && photo ==='')} onClick={() =>{updateInfo(); console.log(role)}
                    }>Guardar</IonButton>
                
            </IonList>
        </IonContent>
        </IonPage>
    );
};

export default ProfilePage;