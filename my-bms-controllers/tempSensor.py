###
#
# This is a temperature sensor class.
# It is responsible for generating a random temperature value
# to simulate the flow and return temperature of coolant
# supplied by an associated chiller.
# 
# @author: XA1NE
#
###

from firebaseconfig import *

import random
import time

class TempSensor:

    def __init__(self, sensorName:str, staticFlowTemp:int, staticReturnTemp:int):
        self.__sensorName = sensorName
        self.__staticFlowTemp = staticFlowTemp
        self.__staticReturnTemp = staticReturnTemp
        self.__realisticFlowTemp = 0
        self.__realisticReturnTemp = 0
        self.__heartbeat = 0
    
    def temperatureSimulator(self):
        # simulate sensor data. Around 5/6 degrees celcius is the optimal range of the coolant's flow temperature after being chilled.                                                              
        flowTemp = random.randint(self.__staticFlowTemp, self.__staticFlowTemp + 1)               # In reality the temperature will be different throughout the day
        returnTemp = random.randint(self.__staticReturnTemp, self.__staticReturnTemp + 1)         # flow and return temperature is unrealistic to always be exact.
        return flowTemp, returnTemp                                                               # so we will simulate a random number between
                                                                                                  # and return temperature.
    def run(self):
        simulatedTemps = self.temperatureSimulator()
        self.__realisticFlowTemp = simulatedTemps[0]
        self.__realisticReturnTemp = simulatedTemps[1]

        self.__heartbeat = time.time()

        props = {
            'Flow Temperature' : self.__realisticFlowTemp,
            'Return Temperature' : self.__realisticReturnTemp,
        }

        # Update the TempSensor properties in the database
        db.child(self.__sensorName).update(props)

        # Update the Temp. Sensor heartbeat in the Firebase Realtime Database
        db.child('Heartbeats').update({f"{self.__sensorName}-Heartbeat" : self.__heartbeat})

        print(f"*** {self.__sensorName} running... ***")
        print("Flow Temperature", self.__realisticFlowTemp)
        print("Return Temperature", self.__realisticReturnTemp)
        print(f"*** {self.__sensorName} updated. ***")
        print("\n")