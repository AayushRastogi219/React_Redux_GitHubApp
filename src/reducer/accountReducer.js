// const accountReducer=(states={gitUserName:'AayushRastogi219', gitUserProfileData:'',gitUserRepoData:''}, action)=>{
const accountReducer=(states={gitUserName:'', gitUserProfileData:'', gitUserRepoData:''}, action)=>{
  switch (action.type) {
    case 'CHANGE_GIT_USERNAME':
      return{ ...states, gitUserName:action.payload};

    case 'CHANGE_GIT_USER_PROFILE_DATA':
      return{ ...states, gitUserProfileData:action.payload};

    case 'CHANGE_GIT_USER_REPO_DATA':
      return{ ...states, gitUserRepoData:action.payload};

    default:
      return states;
  }
}
export default accountReducer;
