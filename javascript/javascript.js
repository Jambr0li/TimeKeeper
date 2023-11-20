const userName = document.querySelector(".user-name");
const createActivityButton = document.querySelector("#create-new-activity");
const activityNameInput = document.querySelector("#new-activity-name");
const activityTimeSpentInput = document.querySelector("#new-activity-time-spent");
const activityColorInput = document.querySelector("#new-activity-color");

/* User contains:                          */
/* User info like name, bday, and w/e else */
/* Categories created by user.             */
/* Will also contain log in infor from     */
/* Firebase probably.                      */

class User {
  constructor(name) {
    this.name = name;
  }
}

/* Category contains:                          */
/* Category info like name and w/e else        */
/* The different activities within the category*/
/* Total time spent in category                */

class Category {
  labels = [];
  data = [];
  colors = [];

  contructor(label){
    this.label = label;
  }

  addLabel(label,time,color){
    this.labels.push(label);
    this.data.push(time);
    this.colors.push(color);
  }
}


const user = new User("Jason");
userName.textContent = user.name;

const testCategory = new Category("School");
testCategory.addLabel("CS360", 2, getRandomHexColor());
testCategory.addLabel("CS317", 1.5, getRandomHexColor());
testCategory.addLabel("STATS360", 1, getRandomHexColor());

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#EAF6FF"];
const blackArray = ["#000000","#000000","#000000","#000000"]

const data = {
  labels: testCategory.labels,
  datasets: [
    {
      label: testCategory.label,
      data: testCategory.data, // Replace with your actual data values
      backgroundColor: testCategory.colors, // Colors for each section
    },
  ],
};

const ctx = document.getElementById("myPieChart").getContext("2d");
const myPieChart = new Chart(ctx, {
  type: "pie",
  data: data,
}); 

// git add .
// git commit -m "message"
// git push origin master



const createActivity = function() {
  const name = activityNameInput.value.trim();
  const time = activityTimeSpentInput.value.trim();
  let color = activityColorInput.value.trim();
  const ret = manageNewActivityInput(activityNameInput,activityTimeSpentInput,activityColorInput,name,time,color);
  if (!ret) return;
  if (color == "") color = getRandomHexColor(); 
  addActivity(testCategory,name,time,color);
}

const manageNewActivityInput = function(el1, el2, el3, content1, content2, content3){
  if (content1 == "") el1.style.borderColor = 'red';
  else el1.style.borderColor = 'black';
  if (content2 == "") el2.style.borderColor = 'red';
  else el2.style.borderColor = 'black';
  if (!isValidHexColor(content3) && content3 !== "") el3.style.borderColor = 'red';
  else el3.style.borderColor = 'black';
  if (!(content1 == "" | content2 == "" | (!isValidHexColor(content3) && content3 !== ""))) {
    activityNameInput.value = "";
    activityTimeSpentInput.value = "";
    activityColorInput.value = "";
    return 1;
  }
  else return 0;
}

const addActivity = function(category,name,time,color){
  if (color == "") color = getRandomHexColor();
  category.addLabel(name,Number(time),color);
  myPieChart.update();
}

function getRandomHexColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
}
const isValidHexColor = function(hex) {
  const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  return regex.test(hex);
}

createActivityButton.addEventListener('click',createActivity);