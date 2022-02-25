'use strict';

let employeeForm = document.getElementById('form1');
let empSection = document.getElementsByClassName('newEmployeeList');
let sort = document.getElementById('admin');
let sort1 = document.getElementById('markt');
let sort2 = document.getElementById('deve');
let sort3 = document.getElementById('fina');

let allEmployee = [];
checkLocalAndPush();


function Employee(FullName, Department, Level, ImageURL) {

    this.employeeID = 0;
    this.fullname = FullName;
    this.department = Department;
    this.level = Level;
    this.ImageURL = ImageURL;
    this.Salary = 0;
}


let id = 1000;
Employee.prototype.generateID = function () {

    this.employeeID = id;
    id++;
}
Employee.prototype.netSalary = function () {
    var s = 0;
    var tax = 0;
    if (this.level == "Senior") {
        s = Math.random() * (2000 - 1500) + 1500;
        tax = s * 0.075;
        this.Salary = Math.ceil(s - tax);
    }
    else if (this.level == "Mid-Senior") {
        s = Math.random() * (1500 - 1000) + 1000;
        tax = s * 0.075;
        this.Salary = Math.ceil(s - tax);
    }
    else if (this.level == "Junior") {
        s = Math.random() * (1000 - 500) + 500;
        tax = s * 0.075;
        this.Salary = Math.ceil(s - tax);
    }

}


function render(employeeFromLS) {

    sort.innerHTML = "";
    sort1.innerHTML = "";
    sort2.innerHTML = "";
    sort3.innerHTML = "";
    empSection.textContent = "";
    for (let i = 0; i < employeeFromLS.length; i++) {

        let employee = employeeFromLS[i];

        if (employee.department == "Adminstration") { }

        else if (employee.department == "Marketing") {
            sort = sort1;
        }

        else if (employee.department == "Development") {
            sort = sort2;
        }
        else if (employee.department == "Finance") {
            sort = sort3;
        }

        sort.style.cssText = 'vertical-align: center;text-align: center;width: 33.33%;float: left;background-color:#08383d';

        let img = document.createElement('img');
        sort.appendChild(img);
        img.setAttribute('src', employee.ImageURL);
        img.setAttribute('alt', employee.fullname);
        img.style.cssText = 'display: flex;align-items: center;width: 250px;height: 250px;padding-left: 120px';


        let p = document.createElement('p');
        sort.appendChild(p);
        p.textContent = `Name: ${employee.fullname}- ID: ${employee.employeeID}`;
        p.style.cssText = 'display: flex;align-items: center;padding-top:260px;display: block;color: white';

        let p1 = document.createElement('p');
        sort.appendChild(p1);
        p1.textContent = `Department: ${employee.department} - Level: ${employee.level}`;
        p1.style.cssText = 'display: flex;align-items: center;display: block;color: white';


        let p2 = document.createElement('p');
        sort.appendChild(p2);
        p2.textContent = `Salary: ${employee.Salary}`;
        p2.style.cssText = 'margin-bottom: 50px;display: flex;align-items: center;display: block;color: white';
    }



}

function collectData(event) {
    event.preventDefault();
    let fname = event.target.fullname.value;
    let dep = event.target.department.value;
    let lev = event.target.level.value;
    let img = event.target.imagelLink.value;

    let newEmployee = new Employee(fname, dep, lev, img);
    newEmployee.generateID();
    newEmployee.netSalary();

    allEmployee.push(newEmployee);
    let jsonArr = toJSON();
    saveToLocalS(jsonArr);
    render(readFromLocalS());

}


function checkLocalAndPush() {
    if (allEmployee.length == 0) {
        let arr = readFromLocalS();
        if (arr.length != 0) {
            allEmployee = arr;
        }
    }
}

function readFromLocalS() {
    let jsonArr = localStorage.getItem('allEmployee');
    let arr = JSON.parse(jsonArr);
    if (arr !== null) {
        return arr;
    } else {
        return [];
    }
}

function toJSON() {
    let jsonArr = JSON.stringify(allEmployee);
    return jsonArr;
}
function saveToLocalS(jsonArray) {
    localStorage.setItem('allEmployee', jsonArray)
}

render(readFromLocalS());
employeeForm.addEventListener('submit', collectData);