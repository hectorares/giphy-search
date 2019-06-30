import { User } from './../models/user.model';
import { LocalstorageName } from './../constants/localstorage-name.constant';
import { Injectable } from "@angular/core";
import { async } from "q";

@Injectable()

export class AuthService {

    constructor() {
    }

    async login(user: User) {
        return this.setSession(user);
    }

    async getUser() {
        return localStorage.getItem(LocalstorageName.USER);
    }


    public authenticated() {
        const user = localStorage.getItem(LocalstorageName.USER);
        return user;
        //  return user && user.id;
    }

    private setSession(user: User) {
        return localStorage.setItem(LocalstorageName.USER, JSON.stringify(user));
    }

    public logout() {
        return localStorage.removeItem(LocalstorageName.USER)
    }

}