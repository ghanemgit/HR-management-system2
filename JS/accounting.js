'use strict';

let employeeInfo = document.getElementById('form2');
let sort = document.getElementById('adminTable');
let sort1 = document.getElementById('marktTable');
let sort2 = document.getElementById('deveTable');
let sort3 = document.getElementById('finaTable');

let allEmployee = [];
checkLocalAndPush();

var A = 0, M = 0, D = 0, F = 0, sum = 0, avg;

function DepInfo(Department, EmpDepNo, SalaryAvg, SalaryTot) {

    this.Department = Department;
    this.EmpDepNo = EmpDepNo;
    this.SalaryAvg = SalaryAvg;
    this.SalaryTot = SalaryTot;
}



function render(employeeFromLS) {

    sort.textContent = "";
    for (let i = 0; i < employeeFromLS.length; i++) {


        let employee = employeeFromLS[i];

        if (employee.department == "Adminstration") { }

        else if (employee.department == "Marketing") {
            sort = sort1;
        }

        else if (employee.department == "Development") {
            sort = sort2
        }
        else if (employee.department == "Finance") {
            sort = sort3;
        }

        let tableD = document.createElement('td');
        sort.appendChild(tableD);
        tableD.textContent = `${employee.Department}`;

        let tableNO = document.createElement('td');
        sort.appendChild(tableNO);
        //tableNO.textContent = `${employee.Department}`;

        let tableSavg = document.createElement('td');
        sort.appendChild(tableSavg);
        //tableSavg.textContent = `${employee.Department}`;

        let tableStot = document.createElement('td');
        sort.appendChild(tableStot);
        //tableStot.textContent = `${employee.Department}`;


    }
}

function handleData(event) {
    event.preventDefault();
    let arr = readFromLocalS();
    //let newInfo = new DepInfo(arr.Department);
    NoOfEmp(arr);
    allEmployee.push(newEmployee);

    render(readFromLocalS());

}

function NoOfEmp(depArr) {

    if (depArr.department == "Adminstration") {
        A++;
        return A;
    }

    else if (depArr.department == "Marketing") {
        M++;
        return M;
    }

    else if (depArr.department == "Development") {
        D++;
        return D;
    }
    else if (depArr.department == "Finance") {
        F++;
        return F;
    }
}


function salaryAvg(avgArr) {

    sum += avgArr.Salary;

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



render(readFromLocalS());
employeeInfo.addEventListener('handleData', handleData);