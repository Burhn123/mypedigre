import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const login = createAsyncThunk('user/login',async({username,password})=>{

    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth,username,password);
        
        const user  = userCredential.user;
        const token = user.stsTokenManager.accesToken;

        const userData={
            token,
            user:user,
        }
        
        return userData
    } catch (error) {
       // console.log("useSlice",error)
        throw error
    }
})

const initialState={
    email: null,
    password: null,
    isLoading: false,
    isAuth: false,
    token: null,
    user: null,
    error: null
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
            console.log("email",state);
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
                &&(state.password === state.user.userPassword)){
               // console.log(true)
            }
            else{
                //console.log(false);
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

        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.error.message;
        })
    }
})

export const {setEmail,setPassword,setIsLoading,setLogin}=userSlice.actions
export default userSlice.reducer;
//export { login }; // yeni ekledim 6.12.2024