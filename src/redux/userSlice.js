import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    getAuth, 
    signOut ,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    sendEmailVerification} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = createAsyncThunk('user/login',async({email,password})=>{

    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        
        const user  = userCredential.user;
        const token = user.stsTokenManager.accessToken;
        //console.log("16-2",token);
        const userData={
            token,
            user:user,
        }
         //console.log("token21",userData)
        await AsyncStorage.setItem('userToken',token)
        //console.log("23",userData);
        return userData
    } catch (error) {
        //console.log("useSlice",error)
        throw error // eski hali deneme yapiyorum
    }
});

// kullanici otomatik giris islemleri 
export const autoLogin = createAsyncThunk('user/autoLogin', async() =>{
    //console.log("girdi33")
    try {
        const token = await AsyncStorage.getItem('userToken');
        //console.log("token",token)
        if(token){
            //console.log("36",token);
            return token
        }
        else{
            //console.log("token1",token)
            throw new Error("kullanıcı bulunamadı")
        }
    } catch (error) {
        throw error
    }
})

// kullanici cikis islemleri
export const logout = createAsyncThunk('user/logout',async()=>{
    try{
        const auth = getAuth();
        
        await signOut(auth);
        await AsyncStorage.removeItem('userToken');
        
        return null;
    }
    catch{
        throw error;
        
    }
})
//kullanici kayit islemleri
export const register = createAsyncThunk('user/register',async({email,password})=>{
    //console.log("register",email,password)
    try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);

        //console.log("register",userCredential)
        const user = userCredential.user;
        const token = userCredential.stsTokenManager.accessToken;
// kullanıcı email onaylasın diye
        await sendEmailVerification(user);

        await AsyncStorage.setItem('userToken');
        return token;

    } catch (error) {
        throw error;
    }
})

const initialState={
    email: null,
    password: null,
    isLoading: false,
    isAuth: false,
    token: null,
    user: null,
    error: null,
  /*  users:{
        userEmail:"test@test.com",
        userPassword:"123456"
    }*/
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setEmail:(state,action) =>{
           // console.log("email",state);
            const loverCaseEmail = action.payload.toLowerCase();
            state.email = loverCaseEmail
        },
        setPassword:(state ,action)=>{
            state.password = action.payload
        },
        setIsLoading:(state,action)=>{
            state.isLoading = action.payload
        },
        setLogin:(state)=>{
            if((state.email === state.user.userEmail)
                && (state.password === state.user.userPassword)){
               // console.log(true)
            }
            else{
                //console.log(false);
                //alert("hata");
            }
          
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading = true;
            state.isAuth = false;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            console.log("ERRORRR2222222------------",action.error);
            state.error ="giris basarili";
          
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false;
            state.isAuth = false;
            //state.error = action.error.message;
            //state.error = "kullanıcı adı veya şifre hatalı";

            // hatali geldiginde action.error.code auth/invalid-email
           console.log("ERRORRR------------",action.error)
            if(action.error.code == "auth/invalid-email" )
            {
                console.log("if ici")
                state.error ="kullanıcı adı veya şifre hatalı";
            }
            else
            {
                console.log(   "else ici")
                state.error ="giris basarili";
            }
        })
        .addCase(autoLogin.pending,(state)=>{
            state.isLoading = true;
            state.isAuth = false;
        })
        .addCase(autoLogin.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isAuth = true;
            state.token = action.payload;

        })
        .addCase(autoLogin.rejected,(state,action)=>{
            state.isLoading = false;
            state.isAuth = false;
            state.token = null;
        })
        .addCase(logout.pending,(state)=>{
            //console.log("logout pendig");
            state.isLoading = true;
        })
        .addCase(logout.fulfilled,(state)=>{
            state.isLoading = false;
            state.isAuth = false;
            state.token = null;
           // state.error = null;
           state.error ="cikis basarili";
          
        })
        .addCase(logout.rejected,(state, action)=>{
            state.isLoading = false;
            //state.error = action.payload;
        })
        .addCase(register.pending,(state)=>{
           // console.log("register175")
            state.isLoading = true;
            state.isAuth = false;
            state.error = null;
        })
        .addCase(register.fulfilled,(state,action)=>{
            //console.log("register180")
            state.isLoading = true;
            state.isAuth = true;
            state.token = action.payload;
            state.error = null;
        })
        .addCase(register.rejected,(state,action)=>{
            // aynısı girilirse payload undefinedgeldi
            state.isLoading = false;
            state.isAuth = false;
            //state.error ="email veya şifre kontrol";
            if(action.error.code)
            {
                state.error ="email veya şifre kontrol";
            }
            else
            {
                state.error ="kayit basarili";
            }
        })
    }
})

export const {setEmail,setPassword,setIsLoading,setLogin}=userSlice.actions
export default userSlice.reducer;
//export { login }; // yeni ekledim 6.12.2024