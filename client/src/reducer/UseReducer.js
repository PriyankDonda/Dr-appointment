export const intialState = false
// export const intialState = {admin:false,doctor:false,patient:false}

export const reducer = (state,action) => {
    if(action.type === "USER"){
        return action.payload
    }
    return state

    // switch (action.type) {
    //     case 'USER':
    //         return action.payload
    //     case 'DOCTOR':
    //         return action.payload
    //     case 'PATIENT':
    //         return action.payload
    //     default:
    //       throw new Error();
    //   }
}