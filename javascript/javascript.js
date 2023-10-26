const userName = document.querySelector(".user-name");

class User {
  constructor(name) {
    this.name = name;
  }
}

class Activity {
  constructor(label) {
    this.label = label;
  }
}
const user = new User("Jason");
userName.textContent = user.name;
// git add .
// git commit -m "message"
// git push origin master
