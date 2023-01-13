import { IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react';


import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './auth';
import Menu from './components/Menu';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';




const AppMenu: React.FC = () => {

  const {loggedIn} = useAuth();
  console.log("App Menu", loggedIn);
  

  if(!loggedIn){
    return <Redirect to="/login"/>
  }
  console.log("App Menu2", loggedIn);
  return (
    <IonPage>
      <IonSplitPane contentId="main">
          <Menu />
        <IonRouterOutlet id='main'>
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
      </IonSplitPane>
    </IonPage>



  );
};

export default AppMenu;
