import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { userData, updateProfileData } from '../data/information';
import { usePhotoGallery } from '../data/information';





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
    const {photos,takePhoto} = usePhotoGallery();

    
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
    async function updateInput(){
    
        const response = await updateProfileData({
            "personal_phone":mobilePhone,
            "home_phone":homePhone,
            "email":email,
            "address":address
        });
        
        console.log(response);
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
            <IonGrid>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol size='6'>
                        <IonImg style={{width:"150px", height:"200px"}} src={photos.length>0? photos[0].webviewPath:avatar}/>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
        
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol><IonButton onClick={()=>takePhoto()}>Editar foto</IonButton></IonCol>
                    <IonCol></IonCol>
                </IonRow>
            </IonGrid>


            <IonLabel>INFORMACIÓN PERSONAL</IonLabel>

        

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

            <IonLabel>INFORMACIÓN DE CONTACTO</IonLabel>

        

            <IonList>
                <IonItem>
                    <IonLabel position='stacked'>Correo</IonLabel>
                    <IonInput type='email' value={email} onIonChange={changeEmail}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Teléfono fijo</IonLabel>
                    <IonInput type='text' value={homePhone} onIonChange={changeHomePhone}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Teléfono celular</IonLabel>
                    <IonInput type='text' value={mobilePhone} onIonChange={changeMobilePhone}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Dirección</IonLabel>
                    <IonTextarea  value={address} onIonChange={changeAddress}/>
                </IonItem>
                
                    <IonButton expand='block' onClick={updateInput}>Guardar</IonButton>
                
            </IonList>
        </IonContent>
        </IonPage>
    );
};

export default ProfilePage;