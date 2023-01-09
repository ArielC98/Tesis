import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppMenu from './AppMenu';
import { AuthContext } from './auth';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {

  //Se crean variables con el hook useState para declarar el estado inicial de inicio de sesion del usuario
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`rendering App wih loggedIn: ${loggedIn}`);
  
  
  return (
    <IonApp>
      <AuthContext.Provider value = {{loggedIn}}>
  
          <IonReactRouter>
            {/* Se usa Switch para renderizar exclusivamente una ruta */}
            <Switch>
              <Route exact path = "/login">
                {/* Si el estado del usuario ya es verdadero se redirige a la pagina principal y si no, se carga la pagina de inicio de sesion con estado loggedIn verdadero  */}
                  <LoginPage onLogin={()=>setLoggedIn(true)}/>

              </Route>

              <Route path={"/my"}>
                <AppMenu/>
              </Route>
              <Redirect exact path="/" to="my/entries" />
              <Route>
                <NotFoundPage/>
              </Route>
            </Switch>

          </IonReactRouter>
      
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
