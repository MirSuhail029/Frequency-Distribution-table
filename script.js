const section = document.getElementById("tableContainer");

// Creating the table dynamically
const table = document.createElement("table");
table.setAttribute("id", "table");
section.append(table);

// function for setting attributes on the calling elements
const attributeSetter = function (elem, attr) {
  for (let key in attr) {
    elem.setAttribute(key, attr[key]);
  }
};

// Creating the table heading
const tableHeading = document.createElement("thead");
table.append(tableHeading);
const tableHeadRow = document.createElement("tr");
tableHeading.append(tableHeadRow);
const tableHead1 = document.createElement("th");
const tableHead2 = document.createElement("th");
const tableHead3 = document.createElement("th");
const tableHead4 = document.createElement("th");
const tableHead5 = document.createElement("th");
const tableHead6 = document.createElement("th");
tableHead1.setAttribute("class", "tableHead");
tableHead2.setAttribute("class", "tableHead");
tableHead3.setAttribute("class", "tableHead");
tableHead4.setAttribute("class", "tableHead");
tableHead5.setAttribute("class", "tableHead");
tableHead6.setAttribute("class", "tableHead");
tableHead1.textContent = "Class (xi)";
tableHead2.textContent = "Frequency (fi)";
tableHead3.textContent = "Mid-Point (xi)";
tableHead4.textContent = "(fi*xi)";
tableHead5.textContent = "|xi-mean|";
tableHead6.textContent = "(xi-mean)2";
tableHeadRow.append(tableHead1);
tableHeadRow.append(tableHead2);
tableHeadRow.append(tableHead3);
tableHeadRow.append(tableHead4);
tableHeadRow.append(tableHead5);
tableHeadRow.append(tableHead6);

// Creating the table body
const tableBody = document.createElement("tbody");
table.append(tableBody);
// creating individual rows that contain table data elements corresponding to each column and inside each table data element there is an input element for holding values
const createRow = function () {
  const tableBodyRow = document.createElement("tr");
  tableBody.append(tableBodyRow);
  for (let i = 1; i <= 6; i++) {
    const tableBodyData = document.createElement("td");
    tableBodyRow.append(tableBodyData);
    const tableBodyInput = document.createElement("input");
    if (i <= 2) {
      attributeSetter(tableBodyInput, {
        type: "text",
        class: "dataInput",
      });
    } else {
      attributeSetter(tableBodyInput, {
        type: "text",
        class: "dataInput",
        disabled: "true",
      });
    }
    tableBodyData.append(tableBodyInput);
  }
};
for (let i = 1; i < 3; i++) {
  createRow();
}
// Creating the table footer
const tableFooter = document.createElement("tfoot");
const tableFootRow = document.createElement("tr");
const tableFoot1 = document.createElement("td");
const tableFoot2 = document.createElement("td");
const tableFoot3 = document.createElement("td");
const tableFoot4 = document.createElement("td");
const tableFoot5 = document.createElement("td");
tableFoot1.textContent = "Total";
tableFoot2.textContent = "";
tableFoot3.textContent = "";
tableFoot4.textContent = "";
tableFoot5.textContent = "";
tableFootRow.append(tableFoot1);
tableFootRow.append(tableFoot2);
tableFootRow.append(tableFoot3);
tableFootRow.append(tableFoot4);
tableFootRow.append(tableFoot5);
tableFooter.append(tableFootRow);
table.append(tableFooter);
tableFoot1.setAttribute("class", "tableFoot");
tableFoot2.setAttribute("class", "tableFoot");
tableFoot3.setAttribute("class", "tableFoot");
tableFoot4.setAttribute("class", "tableFoot");
tableFoot5.setAttribute("class", "tableFoot");
// creating the calculate button
const calculateButton = document.createElement("input");
calculateButton.setAttribute("type", "submit");
calculateButton.setAttribute("value", "Calculate");
tableFooter.append(calculateButton);

//funtion for calculating fi*xi, mean deviation and standard deviation
const calculateFunc = function () {
  let mean;
  const row = tableBody.childNodes; // tr (table row)
  for (let i = 0; i < row.length; i++) {
    const cell = row[i].childNodes; // td (table data)
    const classXi = cell[0].firstChild.value;
    const frequencyFi = cell[1].firstChild.value;
    let midPoint = cell[2].firstChild;
    let fiXi = cell[3].firstChild;
    if (classXi !== "" && frequencyFi !== "") {
      if (
        classXi.includes("-") &&
        !classXi.startsWith("-") &&
        !classXi.endsWith("-")
      ) {
        // calculate fi*xi for data with range
        // split the class range into lower and upper class and then generate the mid-point for that class
        let [lowerClass, upperClass] = classXi.split("-");
        lowerClass = Number(lowerClass);
        upperClass = Number(upperClass);
        console.log(upperClass, lowerClass);
        midPoint.value = (upperClass + lowerClass) / 2;
        fiXi.value = frequencyFi * midPoint.value;
      } else {
        // calculate fi*xi for data without range
        fiXi.value = Number(classXi) * Number(frequencyFi);
      }
    } else {
      console.log("Not available");
    }
  }
  // const mDeviation = cell[3].firstChild.value;
  // const sDeviation = cell[4].firstChild.value;
};

// making the calculate button fire the calculate function
calculateButton.addEventListener("click", calculateFunc);
