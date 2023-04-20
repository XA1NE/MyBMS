###
#
# Simulator script that creates objects
# from classes and invokes main methods of
# simulated devices 
#
# @Author:   XA1NE
#
###

# Import configuration file for the DB connection
from firebaseconfig import *

# Import classes
from ahu import AHU
from chiller import Chiller
from pump import Pump
from tempSensor import TempSensor

import time
it = 0

# Initiate Simulator Objects
ahu1 = AHU(1)
ahu2 = AHU(2)
chiller1 = Chiller(1)
chiller2 = Chiller(2)
pump1 = Pump(1)
pump2 = Pump(2)
temp_sensor_1 = TempSensor('TempSensorSimulator-1', 5, 11) # Params: Sensor Name, Flow Temp, Return Temp
temp_sensor_2 = TempSensor('TempSensorSimulator-2', 5, 11) # Params: Sensor Name, Flow Temp, Return Temp

# Run Simulator Objects
while True:
    it += 1
    print(F"*************** Running Simulator, Iteration {it} ***************")
    print("\n")

    ahu1.run('AHU-2')
    ahu2.run('AHU-1')
    chiller1.run('Chiller-2')
    chiller2.run('Chiller-1')
    pump1.run('Pump-2', 'Chiller-2')
    pump2.run('Pump-1', 'Chiller-1')
    temp_sensor_1.run()
    temp_sensor_2.run()

    print(F"*************** Finished Iteration {it} ***************")
    print("\n")
    time.sleep(3)