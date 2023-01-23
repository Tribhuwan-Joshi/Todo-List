import {auth,provider} from "./firebase-config";
import {signInWithPopup} from 'firebase/auth'
import Cookies from "universal-cookie/cjs/Cookies";
import { async } from "@firebase/util";
import { setAuth } from "./index";

const cookies = new Cookies();

export    const signInWithGoogle = async() =>{
        try{
            const result = await signInWithPopup(auth,provider);
            cookies.set("auth-token" , result.user.refreshToken);
            setAuth(true);


        }
        catch(err){
            console.error(err);
        }
    }