// remaining Model cart,and saving of cart
export class User{
    //tokenExiration remaining 
    constructor(public email:string,public id:string,private _token:string){}

    get token(){
        return this._token
    }
}