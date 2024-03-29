if (localStorage.usersList && localStorage.currentUser) {
    allUsers = JSON.parse(localStorage.getItem("usersList"))
    onlineUser = JSON.parse(localStorage.getItem("currentUser"))
} else {
    window.location = "index.html"
}

console.log(onlineUser)
var pins = []
var enteredOldPin = false
var enteredNewPin = false
var confirmNewPin = false
console.log(pins.length)
pinTyped.addEventListener("input", () => {
    if (pinTyped.value.length > 4) {
        var slicedPin = pinTyped.value.slice(0, 4)
        pinTyped.value = slicedPin
    }
})
console.log(onlineUser.transactionPin)
const changePin = () => {
    if (pins.length == 0 && pinTyped.value.length == 4) {
        pins.push(pinTyped.value)
        pinTyped.value = ""
        console.log(pins)
        console.log("a")
        enteredOldPin = true
        pinToEnter.innerText = "Enter your New 4-digit PIN"
    } else if (enteredOldPin == true && enteredNewPin == false && confirmNewPin == false && pinTyped.value.length == 4) {
        pins.push(pinTyped.value)
        pinTyped.value = ""
        console.log(pins)
        console.log("b")
        enteredNewPin = true
        pinToEnter.innerText = "Confirm your New 4-digit PIN"
    } else if (enteredOldPin == true && enteredNewPin == true && confirmNewPin == false && pinTyped.value.length == 4) {
        pins.push(pinTyped.value)
        pinTyped.value = ""
        console.log(pins)
        console.log("c")
        confirmNewPin = true
        if (pins[0] == onlineUser.transactionPin && pins[1] == pins[2]) {
            onlineUser.transactionPin = pins[2]
            updateUser = allUsers.find((item, index) => item.accountnumber == onlineUser.accountnumber)
            updateUser.transactionPin = onlineUser.transactionPin
            localStorage.setItem("usersList", JSON.stringify(allUsers))
            localStorage.setItem('currentUser', JSON.stringify(onlineUser))
            // alert("PIN Changed")
            changePinSuccess.innerHTML = `
            <div class="text-center col-8 m-auto mt-5">
                <i class="fa-solid fa-check fs-1 text-light p-3 rounded-circle" style="background-color:#590140"></i>
                <h2 class="m-2 lh-base">Transaction-PIN successfully changed</h2>
                <a href="dashboard.html" class="btn text-light" style="background-color: #590140;">Go back to HOME</a>
            </div>
        `
            console.log(onlineUser.transactionPin)
        } else {
            alert("PINs does not match")
            pins = []
            enteredOldPin = false
            enteredNewPin = false
            confirmNewPin = false
            pinToEnter.innerText = "Enter your old PIN"
        }
    }
}
