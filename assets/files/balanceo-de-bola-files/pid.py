import math
import time

class PID:

    def __init__(self,Kp,Ki,Kd,tau,int_dz = 0):
        self.prev_error = 0.0
        self.prev_time = time.time()

        self.P = 0.0
        self.I = 0.0
        self.D = 0.0

        self.Kp = Kp
        self.Ki = Ki
        self.Kd = Kd
        self.dt = 0.0

        self.tau = tau
        self.lp_n = 5
        self.lp_i = 0
        self.error_arr = [0]*self.lp_n
        self.error_lp_prev = 0
        
        self.int_dz = int_dz   # integral dead-zone
        self.Imax = 0.04/(self.Ki) if self.Ki != 0 else 0

    def calculate(self, error):
        
        self.error_arr[self.lp_i] = error
        self.lp_i = (self.lp_i+1)%self.lp_n
        
        # Set previous values for next time
        self.dt = time.time() - self.prev_time
        self.prev_time = time.time()

        self.P = self.Kp * error
        self.I = self.I + (self.Ki*error*self.dt if abs(error) > abs(self.int_dz) else 0)
        self.I = self.I if abs(self.I) < self.Imax else math.copysign(self.Imax, self.I)
        self.D = self.Kd * (sum(self.error_arr)/self.lp_n - self.error_lp_prev)/self.dt        

        output = self.P + self.I + self.D

        self.prev_error = error
        self.error_lp_prev = sum(self.error_arr)/self.lp_n

        return (output, self.dt)

    def set_Kp(self, newKp):
        self.Kp = newKp

    def set_Ki(self, newKi):
        self.Ki = newKi

    def set_Kd(self, newKd):
        self.Kd = newKd