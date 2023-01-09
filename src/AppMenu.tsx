import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';


interface Props{
  loggedIn: boolean;
}

const AppMenu: React.FC<Props> = ({loggedIn}) => {

  if(!loggedIn){
    return <Redirect to={"/login"}/>
  }
  
  return (

    <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/my/entries">
        <HomePage />
      </Route>
      <Route exact path="/my/entries/:id">
        <EntryPage />
      </Route>
      <Route exact path="/my/settings">
        <SettingsPage />
      </Route>
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/my/entries">
        <IonIcon icon={homeIcon} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/my/settings">
        <IonIcon icon={settingsIcon} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>

  );
};

export default AppMenu;
