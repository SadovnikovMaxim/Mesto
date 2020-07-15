class UserInfo{

  constructor(nameElement, jobElement, nameInput, jobInput){
    this.nameElement = nameElement;
    this.jobElement = jobElement;
    this.nameInput = nameInput;
    this.jobInput = jobInput;
  }

  setUserInfo(name, job){    

    this.nameInput.value = name;
    this.jobInput.value = job;   
  }

  updateUserInfo(name, job){
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
  }
}