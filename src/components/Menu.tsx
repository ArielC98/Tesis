import {
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, code, codeOutline, grid, gridOutline, heartOutline, heartSharp, home, homeOutline, link, linkOutline, list, mailOutline, mailSharp, newspaperOutline, paperPlaneOutline, paperPlaneSharp, person, personOutline, settings, settingsOutline, shareSocial, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inicio',
    url: '/my/dashboard',
    iosIcon: homeOutline,
    mdIcon: home
  },
  {
    title: 'Perfil',
    url: '/my/profile',
    iosIcon: personOutline,
    mdIcon: person
  },
  {
    title: 'Reportes',
    url: '/my/reports',
    iosIcon: list,
    mdIcon: list
  },
  {
    title: 'Redes',
    url: '/my/links',
    iosIcon: shareSocial,
    mdIcon: shareSocial
  },
  {
    title: 'Ajustes',
    url: '/my/settings',
    iosIcon: settingsOutline,
    mdIcon: settings
  },

];



const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonImg src='../assets/icon/user_icon.png' style={{width:190}}/>
          <IonListHeader>Ariel Calderon</IonListHeader>
          <IonNote>1750051755</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>


      </IonContent>
    </IonMenu>
  );
};

export default Menu;