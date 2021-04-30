import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EditEmployee from './components/EditEmployee';
import ListEmployee from './components/ListEmployee';

import App from './App';

export default function Routes() {
    return (
        <div>
            <BrowserRouter>
                <Switch> {/* Ce composant ne s'affichera pas à l'écran, il liste les chemins possibles */}
                    <Route exact path="/" component={App} /> {/* Chaque route est un composant <Route> */}
                    <Route path="/editEmployee/:id" component={EditEmployee} />
                    <Route path="/goToList" component={ListEmployee} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
