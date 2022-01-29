function toll_gate () {
    toll_deducter()
    redgreenled()
    if (is_toll_recieved == true) {
        open_gate()
        control.waitMicros(5000000)
        is_toll_recieved = false
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
function redgreenled () {
    if (is_toll_recieved == true) {
        pins.analogWritePin(AnalogPin.P5, 1023)
        pins.analogWritePin(AnalogPin.P4, 0)
    } else {
        pins.analogWritePin(AnalogPin.P4, 1023)
        pins.analogWritePin(AnalogPin.P5, 0)
    }
}
makerbit.onUltrasonicObjectDetected(10, DistanceUnit.CM, function () {
	
})
function close_gate () {
    servos.P1.setAngle(90)
    redgreenled()
}
input.onButtonPressed(Button.A, function () {
    recharge()
})
function toll_deducter () {
    index = 0
    fastag1 = list[index]
    if (fastag1 >= toll) {
        fastag1 = fastag1 - toll
        is_toll_recieved = true
    } else {
        is_toll_recieved = false
        buzzer()
    }
    list[index] = fastag1
    basic.showNumber(fastag1)
}
function buzzer () {
    music.playMelody("C5 B C5 B C5 B C5 B ", 120)
}
input.onButtonPressed(Button.B, function () {
    if (is_toll_recieved == true) {
        is_toll_recieved = false
        redgreenled()
    } else {
        is_toll_recieved = true
        redgreenled()
    }
})
function open_gate () {
    servos.P1.setAngle(0)
}
function recharge () {
    list[1023 + fastag1] = index
}
let fastag1 = 0
let index = 0
let is_toll_recieved = false
let list: number[] = []
let toll = 0
toll = 100
list = [1023]
is_toll_recieved = false
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
