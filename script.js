let itemsContainer = document.getElementById("itemsContainer");
let inputElement = document.getElementById("inputElement")
let saveBtn = document.getElementById("saveBtn");
let addBtn = document.getElementById("addBtn");

let count = 0;

function getItemsFromLocalStorage() {
    let stringifyedItems = localStorage.getItem("items");
    let parsedItems = JSON.parse(stringifyedItems);
    if (parsedItems === null) {
        return [];
    }
    else {
        return parsedItems;
    }
}

let newList = getItemsFromLocalStorage();

saveBtn.onclick = function () {
    localStorage.setItem("items", JSON.stringify(newList));
    const messageBox = document.getElementById('savedMessage');
    messageBox.style.display = 'block';

    // Hide the message after 3 seconds
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

function statusChange(checkboxId, labelId, itemId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    if (checkboxElement.checked === true) {
        labelElement.classList.add("checked");
    }
    else {
        labelElement.classList.remove("checked");
    }
    let itemIndex = newList.findIndex(function(each) {
        let eachId = "item" + each.count;
        if (eachId === itemId) {
            return true;
        }
        else {
            return false;
        }
    });
    let itemObject = newList[itemIndex];
    if (itemObject.isChecked === true) {
        itemObject.isChecked = false;
    }
    else {
        itemObject.isChecked = true;
    }
}

function createAndAppend(newItem) {
    
    let checkboxId = "myCheckbox" + newItem.count;
    let labelId = "label" + newItem.count;
    let itemId = "item" + newItem.count;

let itemContainer = document.createElement("li");
itemContainer.classList.add("itemContainer");
itemContainer.id = itemId;
itemsContainer.appendChild(itemContainer);

let checkboxElement = document.createElement("input");
checkboxElement.type = "checkbox";
checkboxElement.id = checkboxId;
checkboxElement.checked = newItem.isChecked;
checkboxElement.classList.add("checkbox");
checkboxElement.onclick = function () {
    statusChange(checkboxId, labelId, itemId);
};
itemContainer.appendChild(checkboxElement);

let labelContainer = document.createElement("div");
labelContainer.classList.add("labelContainer");
itemContainer.appendChild(labelContainer);

let labelElement = document.createElement("label");
labelElement.htmlFor = checkboxId;
labelElement.textContent = newItem.item;
labelElement.id = labelId;
if (newItem.isChecked === true) {
    labelElement.classList.add("checked");
}
labelElement.classList.add("labelElement");
labelContainer.appendChild(labelElement);

let deleteIconContainer = document.createElement("div");
deleteIconContainer.classList.add("deleteIconContainer");
labelContainer.appendChild(deleteIconContainer);

let deleteIcon = document.createElement("i");
deleteIcon.classList.add("fa", "fa-trash-o", "deleteIcon")
deleteIcon.onclick = function () {
    let itemContainer = document.getElementById(itemId);
    itemsContainer.removeChild(itemContainer);
    let deleteIndex = newList.findIndex(function(each) {
        let eachId = "item" + each.count;
        if (eachId === itemId) {
            return true;
        }
        else {
            return false;
        }
    });
    newList.splice(deleteIndex, 1);
}
deleteIconContainer.appendChild(deleteIcon)

}

addBtn.onclick = function () {
    let inputElement = document.getElementById("inputElement");
    let inputElementValue = inputElement.value;
    if (inputElementValue === "") {
        alert("Please, Enter Valid Text!");
        return;
    }
    else {
        count = count + 1;
        let newItem = {
            item : inputElementValue,
            count : count,
            isChecked : false
        };
        newList.push(newItem);
        createAndAppend(newItem);
        const messageBox = document.getElementById('addedMessage');
        messageBox.style.display = 'block';

        // Hide the message after 3 seconds
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
        inputElement.value = "";
    } 
};

for (each of newList) {
    createAndAppend(each);
}