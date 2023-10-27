const userName = document.querySelector(".user-name");

/* User contains:                          */
/* User info like name, bday, and w/e else */
/* Categories created by user.             */

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
  contructor(label){
    this.label = label;
  }
}

/* Activity contains time spent on given activity.        */
/* Maybe I'll just make this an array inside of Category. */

class Activity {
  constructor(label) {
    this.label = label;
  }
}


const user = new User("Jason");
userName.textContent = user.name;

const data = {
  labels: ["CS360", "CS317", "STATS360", "CS425"],
  datasets: [
    {
      label: 'School',
      data: [3.6, 2, 2, 3], // Replace with your actual data values
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#EAF6FF"], // Colors for each section
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
