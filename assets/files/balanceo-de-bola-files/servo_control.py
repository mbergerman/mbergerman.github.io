import pigpio

class Servo:
    
    def __init__(self, gpio):
        self.pi = pigpio.pi()
        self.gpio = gpio
    
    def value(self, val):
        self.pi.hardware_PWM(self.gpio, 50, int(((val + 1)*25000 + 50000)))

