
import multiprocessing as mp
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import matplotlib.gridspec as gridspec
from matplotlib.widgets import Button

def plot_realtime(q):

    # Create figure for plotting
    fig = plt.figure(figsize=(12, 6))
    plt.subplots_adjust(bottom=0.2)

    # Create sub plots
    gs = gridspec.GridSpec(2, 2, figure = fig)

    max_len = 100

    xs = [0] * max_len
    ys = [0] * max_len
    setpoint_xs = [0] * max_len
    setpoint_ys = [0] * max_len

    # This function is called periodically from FuncAnimation
    def animate(i, xs, ys, setpoint_xs, setpoint_ys):

        x_offset = 44
        y_offset = 10
        
        while not q.empty():
            args = q.get().split(',')
            if args[0] == "Camara/x":
                xs.append(float(args[1])-x_offset)
                animate.counter += 1

            if args[0] == "Camara/y":
                ys.append(float(args[1])-y_offset)
            
            if args[0] == "Set_Point/x":
                setpoint_xs.append(float(args[1])-x_offset)
            
            if args[0] == "Set_Point/y":
                setpoint_ys.append(float(args[1])-y_offset)

        ticks = np.linspace(animate.counter - max_len+1, animate.counter, max_len)

        xs = xs[-max_len:]
        ys = ys[-max_len:]
        setpoint_xs = setpoint_xs[-max_len:]
        setpoint_ys = setpoint_ys[-max_len:]

        ax = plt.subplot(gs[:, 0]) # all rows, col 0

        ax.clear()
        for j in range(1, max_len):
            ax.plot(xs[j-1:j+1], ys[j-1:j+1], 'gray', lw= 1 + 5*j/max_len)

        for j in range(1, max_len):
            ax.plot(setpoint_xs[j-1:j+1], setpoint_ys[j-1:j+1], color='firebrick', linestyle='--', lw= (1 + 5*j/max_len)/2)
        
        ax.plot(setpoint_xs[-1], setpoint_ys[-1], color='firebrick', marker='x', markersize = 15)

        ax.plot(xs[-1], ys[-1], color='limegreen', marker='o', markersize = 20)

        ax.set_title('Camara')
        ax.grid()
        ax.set_xlim((0,130))
        ax.set_ylim((0,130))
        ax.invert_yaxis()
        
        ax = plt.subplot(gs[0, 1])
        ax.clear()
        ax.plot(ticks, xs, 'b', label = 'Camara X')
        ax.plot(ticks, setpoint_xs, 'k--', label = 'Set Point X')
        ax.grid()
        ax.set_ylim((0,130))
        ax.legend(loc='upper right')

        ax = plt.subplot(gs[1, 1])
        ax.clear()
        ax.plot(ticks, ys, 'r', label = 'Camara Y')
        ax.plot(ticks, setpoint_ys, 'k--', label = 'Set Point Y')
        ax.grid()
        ax.set_ylim((0,130))
        ax.legend(loc='upper right')

    animate.counter  = 0

    # Set up plot to call animate() function periodically
    ani = animation.FuncAnimation(fig, animate, fargs=(xs, ys, setpoint_xs, setpoint_ys), interval=500)

    plt.show()