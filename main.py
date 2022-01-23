def on_ultrasonic_object_detected_cm():
    pass
makerbit.on_ultrasonic_object_detected(20, DistanceUnit.CM, on_ultrasonic_object_detected_cm)

def on_button_pressed_a():
    toll_deducter()
input.on_button_pressed(Button.A, on_button_pressed_a)

def toll_deducter():
    global index, fastag1, is_toll_recieved
    index = 0
    fastag1 = list2[index]
    if fastag1 >= toll:
        fastag1 = fastag1 - toll
        is_toll_recieved = True
        servos.P0.set_angle(0)
    else:
        is_toll_recieved = False
    list2[index] = fastag1
    basic.show_number(fastag1)
is_toll_recieved = False
fastag1 = 0
index = 0
list2: List[number] = []
toll = 0
toll = 100
list2 = [1023]
servos.P0.set_angle(90)

def on_forever():
    pass
basic.forever(on_forever)
