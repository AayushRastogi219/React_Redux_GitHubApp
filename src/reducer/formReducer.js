const formReducer=(states={userEmailID:'aayush@gmail.com', userFirstName:'aayush', userSecondName:'rastogi', userPassword:'Aayush@219', userConfirmPassword:'Aayush@219', userGender:false}, action)=>{
// const formReducer=(states={userEmailID:'', userFirstName:'', userSecondName:'', userPassword:'', userConfirmPassword:'', userGender:false}, action)=>{
  switch (action.type) {
    case 'CHANGE_EMAILID':
      return{ ...states, userEmailID:action.payload};

    case 'CHANGE_FIRSTNAME':
      return{ ...states, userFirstName:action.payload}

    case 'CHANGE_SECONDNAME':
      return{ ...states, userSecondName:action.payload}

    case 'CHANGE_PASSWORD':
      return{ ...states, userPassword:action.payload}

    case 'CHANGE_CONFIRMPASSWORD':
      return{ ...states, userConfirmPassword:action.payload}

    case 'CHANGE_GENDER':
      return{ ...states, userGender:action.payload}

    default:
      return states;
  }

}
export default formReducer;
