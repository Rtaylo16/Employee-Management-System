var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    

    password: "Rtaylo16",
    database: "Tracker_db"
});

connection.connect(function(err){
    if(err)throw err;
    choices();
});

function choices() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
        "Add Departments",
        "Add Roles",
        "Add Employees",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Role"
        ]
      }).then(function(answer) {
          switch (answer.action){
              case "Add Departments":
                addDepartments();
                break;

                case "Add Roles":
                    addRole();
                    break;

                case "Add Employees":
                    addEmployees();
                    break;

                case "View Departments":
                    viewDepartments();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "View Employees":
                    viewEmployees();
                    break;

                case "Update Employee Role":
                    Update();
                    break;
          }

      })
   
    };

function addEmployees(){
    inquirer
    .prompt([{
        name:"employeefirstnm",
        type: "input",
        message:"What is the employee's First name?"
    },{
        name:"employeelastnm",
        type: "input",
        message: "What is the employee's Last name?"
    },{
        name:"employeeroleid",
        type: "input",
        message: "What is the employee's Role?",
        
    },{
        name:"employeemanagerid",
        type: "input",
        message: "Who is the employee's Manager?",
        

    }]).then (function(answer){
        connection.query(
            "INSERT INTO employee SET ?", {
            first_name: answer.employeefirstnm,
            last_name: answer.employeelastnm,
            role_id: answer.employeeroleid,
            manager_id: answer.employeemanagerid
            },

            err => {
                if(err){
                    throw err;
                }
                console.log("You have successfully added the employee!");
                choices();
            }

        )
       
    })




};

function addRole(){
    inquirer
    .prompt([{
        name: "rolename",
        type: "input",
        message: "What is the name the role?"
        },{
        name: "salary",
        type:"input",
        message: "What is the role's salary?"
        },{
        name: "department",
        type: "input",
        message: "What department is this role in?"
            
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO role SET ?",
            {
            title: answer.rolename,
            salary: answer.salary,
            department_id: answer.department
            },
            
            err => {
                if(err){
                    throw err;
                }
                console.log("You have successfully added a role!")
                choices();

            }
        )
     
    
    })
};
    
function addDepartments(){
    inquirer.prompt(
        {
            name: "departName",
            type: "input",
            message: "Name your department"
        }
    ).then(function(answer){
        connection.query("INSERT INTO department SET ?", {name: answer.departName},err => {
            if(err){
                throw err;
            }
            console.log("You have successfully added a department!")
            choices();

        })
       
    })
};

function viewDepartments(){
    connection.query("SELECT name FROM department", function(err, res) {
        if (err) throw err;
console.table(res);
choices();
    })
};

function viewRoles(){
    connection.query("SELECT title, salary, department_id FROM role", function(err,res){
        if(err) throw err;
console.table(res);
choices();
    })
};

function viewEmployees(){
    connection.query("SELECT first_name, last_name, role_id, manager_id FROM employee", function(err,res){
        if(err) throw err;
    console.table(res);
    choices();
    })
};

function Update(){
    inquirer
    .prompt([{
        name: "Updaterole",
        type: "input",
        message: "What department ID will you use to update?"
    },{
    name : "newrole",
    type: "list",
    message: "What is going to be the new role?",
    choices:[
    "Sales Lead",
    "Salesperson",
    "Software Engineer",
    "Accountant",
    "Account Manager",
    "Legal Team"
   ]
}]).then( function(answer){
    connection.query("UPDATE role SET title = ? WHERE department_id = ?", [answer.newrole, answer.Updaterole], err => {
        if(err){
            throw err;
        }
        choices();
    })







})







}