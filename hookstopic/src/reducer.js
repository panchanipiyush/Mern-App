export const reducer = (state,action) =>{

        if(action.type === "HOME_UPDATE"){
            return {
                ...state,
                name: action.payload.name,
                Age: action.payload.Age,
            }
        }
        if(action.type === "ABOUT_UPDATE"){
            return {
                ...state,
                name: action.payload.name,
                Age: action.payload.Age,
            }
        }


   return state
}