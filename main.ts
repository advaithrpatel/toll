function toll_gate () {
    toll_deducter()
    if (is_toll_recieved == true) {
        open_gate()
        control.waitMicros(5000000)
        close_gate()
    }
}
function lcd_1602_display () {
    if (is_toll_recieved == true) {
        makerbit.showStringOnLcd1602("Authorized access. Please move.", makerbit.position1602(LcdPosition1602.Pos1), 1, TextOption.AlignLeft)
    } else {
        makerbit.showStringOnLcd1602("Unathorized access. Please recharge.", makerbit.position1602(LcdPosition1602.Pos1), 1, TextOption.AlignLeft)
    }
}
makerbit.onUltrasonicObjectDetected(10, DistanceUnit.CM, function () {
    toll_gate()
})
function close_gate () {
    servos.P0.setAngle(90)
}
input.onButtonPressed(Button.A, function () {
    toll_gate()
})
function toll_deducter () {
    index = 0
    fastag1 = list2[index]
    if (fastag1 >= toll) {
        fastag1 = fastag1 - toll
        is_toll_recieved = true
    } else {
        is_toll_recieved = false
    }
    list2[index] = fastag1
    basic.showNumber(fastag1)
}
function open_gate () {
    servos.P0.setAngle(0)
}
let distance = 0
let fastag1 = 0
let index = 0
let is_toll_recieved = false
let list2: number[] = []
let toll = 0
toll = 100
list2 = [1023]
I2C_LCD1602.LcdInit(63)
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P3, DigitalPin.P6)
I2C_LCD1602.BacklightOff()
close_gate()
basic.forever(function () {
    distance = makerbit.getUltrasonicDistance(DistanceUnit.CM)
    basic.showNumber(distance)
})
