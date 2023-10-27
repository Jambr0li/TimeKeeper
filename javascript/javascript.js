const userName = document.querySelector(".user-name");

class User {
  constructor(name) {
    this.name = name;
  }
}

class Category {
  contructor(label){
    this.label = label;
  }
}

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
      data: [3, 2, 2, 3], // Replace with your actual data values
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
