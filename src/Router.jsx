import React from 'react';
import {Route, Switch} from "react-router";
// import Auth from './Auth'
import {RPG, Right, AnimationComp} from "./templates";

const Router = () => {
    return(
        <Switch>
            <Route exact path={"(/)?"} component={RPG} />
            <Route exact path={"/2d"} component={Right} />
            <Route exact path={"/animation"} component={AnimationComp} />
        </Switch>
    );
};

export default Router;