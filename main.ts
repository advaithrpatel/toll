makerbit.onUltrasonicObjectDetected(20, DistanceUnit.CM, function () {
    toll_gate()
})
input.onButtonPressed(Button.A, function () {
    toll_gate()
})
function close_gate () {
    servos.P0.setAngle(90)
}
function toll_gate () {
    toll_deducter()
    if (is_toll_recieved == true) {
        open_gate()
        control.waitMicros(5000000)
        close_gate()
    }
}
function toll_deducter () {
    index = 0
    fastag1 = list[index]
    if (fastag1 >= toll) {
        fastag1 = fastag1 - toll
        is_toll_recieved = true
    } else {
        is_toll_recieved = false
    }
    list[index] = fastag1
    basic.showNumber(fastag1)
}
function open_gate () {
    servos.P0.setAngle(0)
}
let fastag1 = 0
let index = 0
let is_toll_recieved = false
let list: number[] = []
let toll = 0
toll = 100
list = [1023]
close_gate()
basic.forever(function () {
	
})
