function skillsMember() {
    var skill = document.getElementById("skillsMember").value;
    var skillList = document.getElementById("skillsList");
    var skillItem = document.createElement("li");
    skillItem.innerHTML = skill;
    skillList.appendChild(skillItem);
    document.getElementById("skillsMember").value = "";
}