def on_ultrasonic_object_detected_cm():
    toll_gate()
makerbit.on_ultrasonic_object_detected(10, DistanceUnit.CM, on_ultrasonic_object_detected_cm)

def on_button_pressed_a():
    toll_gate()
input.on_button_pressed(Button.A, on_button_pressed_a)

def close_gate():
    servos.P0.set_angle(90)
def lcd_1602_display():
    if is_toll_recieved == True:
        makerbit.show_string_on_lcd1602("Authorized access. Please move.",
            makerbit.position1602(LcdPosition1602.POS1),
            1,
            TextOption.ALIGN_LEFT)
    else:
        makerbit.show_string_on_lcd1602("Unathorized access. Please recharge.",
            makerbit.position1602(LcdPosition1602.POS1),
            1,
            TextOption.ALIGN_LEFT)
def toll_gate():
    toll_deducter()
    if is_toll_recieved == True:
        open_gate()
        control.wait_micros(5000000)
        close_gate()
def toll_deducter():
    global index, fastag1, is_toll_recieved
    index = 0
    fastag1 = list2[index]
    if fastag1 >= toll:
        fastag1 = fastag1 - toll
        is_toll_recieved = True
    else:
        is_toll_recieved = False
    list2[index] = fastag1
    basic.show_number(fastag1)
def open_gate():
    servos.P0.set_angle(0)
distance = 0
fastag1 = 0
index = 0
is_toll_recieved = False
list2: List[number] = []
toll = 0
toll = 100
list2 = [1023]
makerbit.connect_lcd(127)
makerbit.connect_ultrasonic_distance_sensor(DigitalPin.P3, DigitalPin.P6)
close_gate()

def on_forever():
    global distance
    distance = makerbit.get_ultrasonic_distance(DistanceUnit.CM)
    basic.show_number(distance)
basic.forever(on_forever)
