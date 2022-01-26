function toll_gate () {
    toll_deducter()
    if (is_toll_recieved == true) {
        open_gate()
        control.waitMicros(5000000)
        close_gate()
    }
}
makerbit.onUltrasonicObjectDetected(20, DistanceUnit.CM, function () {
	
})
function lcd_1602_display () {
    if (is_toll_recieved == true) {
        makerbit.showStringOnLcd1602("Authorized access. Please move.", makerbit.position1602(LcdPosition1602.Pos1), 1, TextOption.AlignLeft)
    } else {
        makerbit.showStringOnLcd1602("Unathorized access. Please recharge.", makerbit.position1602(LcdPosition1602.Pos1), 1, TextOption.AlignLeft)
    }
}
makerbit.onUltrasonicObjectDetected(10, DistanceUnit.CM, function () {
	
})
function close_gate () {
    servos.P1.setAngle(90)
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
    servos.P1.setAngle(0)
}
let fastag1 = 0
let index = 0
let is_toll_recieved = false
let list2: number[] = []
let toll = 0
toll = 100
list2 = [1023]
servos.P1.setRange(0, 180)
close_gate()
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P3, 0)
    control.waitMicros(20)
    pins.digitalWritePin(DigitalPin.P3, 1)
    control.waitMicros(40)
    pins.digitalWritePin(DigitalPin.P3, 0)
    if (pins.pulseIn(DigitalPin.P2, PulseValue.High) / 58 <= 30) {
        toll_gate()
    } else {
        basic.showIcon(IconNames.Heart)
    }
})
