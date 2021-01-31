import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './pages/Home';
import Signin from './pages/Signin';
import Account from './pages/Account';
import Collections from './pages/Collections';
import LogIn from './pages/Login';
import LoggedHome from './pages/LoggedHome';
import MyCollections from './pages/MyCollections';
import CreateCollection from "./pages/CreateCollection";
import Items from "./pages/Items";
import MyItems from "./pages/MyItems";
import CreateItem from "./pages/CreateItem";

export const useRoutes = (isAuth, userId, token) => {
    if (isAuth) {
        return (
            <Switch>
                <Route exact path="/home" render={() => <LoggedHome userId={userId} />} />
                <Route exact path="/my_account" render={() => <Account userId={userId} token={token} />} />
                <Route exact path="/hasnt_collections" render={() => <Collections />} />
                <Route exact path="/my_collections" render={() => <MyCollections userId={userId} />} />
                <Route path="/my_items/:id" render={() => <MyItems />} />
                <Route path="/create_collection" render={() => <CreateCollection userId={userId} />} />
                <Route path="/create_item/:id" render={() => <CreateItem />} />
                <Route path="/collection/:id" render={() => <Items userId={userId} isAuth={isAuth} />} />
                <Redirect to="/home" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/signin" render={() => <Signin />} />
                <Route path="/login" render={() => <LogIn />} />
                <Route path="/collection/:id" render={() => <Items userId={userId} isAuth={isAuth} />} />
                <Redirect to="/" />
            </Switch>
        )
    }
} 