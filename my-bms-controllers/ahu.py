###
# This is an Air Handling Unit (AHU) model.
# It is a simple model that can be used to simulate the operation of an AHU.
# It is based on the following assumptions:
# - The AHU is modeled as a single zone, with a single supply air path.
# - The AHU is modeled as a single zone, with a single exhaust air path.
# Depending on the type of air handler (AHU-1 or AHU-2), the AHU
# operates as a primary or secondary system when the mode is set to AUTO.
#
# @author: K. Kawka    OFF = 0, ON = 1/Running = 1, AUTO = 2/Standby = 2
# @version: 1.0
###

# Import Firebase Real-Time Database API
from firebaseconfig import *

import time

class AHU:

    # Initialize the AHU
    def __init__(self, ahuNum:int):
        self.__ahuName = f"AHU-{ahuNum}"
        self.__mode = 0
        self.__runningState = 0
        self.__supplyFanSpeed = 0
        self.__extractFanSpeed = 0
        self.__damperState = 0
        self.__humidifierState = 0
        self.__thermalWheelState = 0
        self.__coolantBypassActuatorState = 0
        self.heartbeat = 0

    # Getter function for the AHU name
    @property
    def ahuName(self):
        return self.__ahuName

    # Getter function (external values)
    def __getDatabaseBuildingVals(self):
        firebaseDataBuilding = db.child("Building").get()
        firebaseBuildingValues = firebaseDataBuilding.val()
        return firebaseBuildingValues
    
    def __getDatabaseAhuVals(self):
        firebaseDataAHU = db.child(self.__ahuName).get()
        return firebaseDataAHU.val()
    
    def __getDatabaseOtherAhuVals(self, otherAHUName:str):
        firebaseDataOtherAHU = db.child(otherAHUName).get()
        return firebaseDataOtherAHU.val()

    ###
    # Main method to run the AHU.
    # This method is called by the main program (simulator.py).
    # It is responsible for updating the state of the AHU.
    # @param otherAhuName: The name of the other AHU (AHU-1 = Primary, AHU-2 = Secondary).
    # @return: None
    ###
    def run(self, otherAhuName:str):
        buildingValues = self.__getDatabaseBuildingVals()
        currentAhuVals = self.__getDatabaseAhuVals()
        otherAhuVals = self.__getDatabaseOtherAhuVals(otherAhuName)
        otherAhuMode = otherAhuVals['Mode']

        self.__heartbeat = time.time()

        # When the unit is OFF
        if(currentAhuVals['Mode'] == 0):
            self.__supplyFanSpeed = 0
            self.__extractFanSpeed = 0
            self.__mode = 0
            self.__coolantBypassActuatorState = 0
            self.__damperState = 0
            self.__humidifierState = 0
            self.__thermalWheelState = 0
            self.__runningState = 0

        # When the unit is ON
        if(currentAhuVals['Mode'] == 1):
            self.__supplyFanSpeed = 100
            self.__extractFanSpeed = 100
            self.__mode = 1
            self.__damperState = currentAhuVals['Damper State']
            self.__humidifierState = currentAhuVals['Humidifier State']
            self.__thermalWheelState = currentAhuVals['Thermal Wheel State']
            self.__coolantBypassActuatorState = currentAhuVals['Coolant Bypass Actuator State']
            self.__runningState = 1

        # When the unit is set to AUTO
        if(currentAhuVals['Mode'] == 2):
            self.__mode = 2

            # When the other unit is OFF
            if (otherAhuMode == 0):
                self.__runningState = 1

                if (buildingValues['Occupancy'] <= 0):
                    self.__runningState = 2
                    self.__supplyFanSpeed = 0
                    self.__extractFanSpeed = 0

                if (buildingValues['Occupancy'] > 0 and buildingValues['Occupancy'] <= 20):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 40
                    self.__extractFanSpeed = 40

                if (buildingValues['Occupancy'] > 20 and buildingValues['Occupancy'] <= 40):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 80
                    self.__extractFanSpeed = 80

                if (buildingValues['Occupancy'] > 40):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 100
                    self.__extractFanSpeed = 100

            # When the other unit is ON
            if (otherAhuMode == 1):
                if (buildingValues['Occupancy'] > 40 and buildingValues['Occupancy'] <= 60):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 20
                    self.__extractFanSpeed = 20

                if (buildingValues['Occupancy'] > 60 and buildingValues['Occupancy'] <= 80):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 60
                    self.__extractFanSpeed = 60

                if (buildingValues['Occupancy'] > 80):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 100
                    self.__extractFanSpeed = 100

                else:
                    self.__runningState = 1
                    self.__supplyFanSpeed = 0
                    self.__extractFanSpeed = 0
                    

            # When the other unit is set to AUTO and current unit is AHU-1
            if (otherAhuMode == 2 and self.__ahuName == 'AHU-1'):
                if (buildingValues['Occupancy'] > 0 and buildingValues['Occupancy'] <= 20):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 40
                    self.__extractFanSpeed = 40

                if (buildingValues['Occupancy'] > 20 and buildingValues['Occupancy'] <= 40):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 60
                    self.__extractFanSpeed = 60

                if (buildingValues['Occupancy'] > 40 and buildingValues['Occupancy'] <= 60):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 80
                    self.__extractFanSpeed = 80
                
                if (buildingValues['Occupancy'] > 60):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 100
                    self.__extractFanSpeed = 100

            # When the other unit is set to AUTO and current unit is AHU-2
            if (otherAhuMode == 2 and self.__ahuName == 'AHU-2'):
                if (buildingValues['Occupancy'] > 0 and buildingValues['Occupancy'] <= 20):
                    self.__runningState = 2
                    self.__supplyFanSpeed = 0
                    self.__extractFanSpeed = 0

                if (buildingValues['Occupancy'] > 20 and buildingValues['Occupancy'] <= 40):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 20
                    self.__extractFanSpeed = 20

                if (buildingValues['Occupancy'] > 40 and buildingValues['Occupancy'] <= 60):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 40
                    self.__extractFanSpeed = 40
                
                if (buildingValues['Occupancy'] > 60 and buildingValues['Occupancy'] <= 80):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 60
                    self.__extractFanSpeed = 60

                if (buildingValues['Occupancy'] > 80):
                    self.__runningState = 1
                    self.__supplyFanSpeed = 80
                    self.__extractFanSpeed = 80


            if(self.__supplyFanSpeed > 0 and self.__extractFanSpeed > 0):

                # Compare indoor temperature with the setpoint temperature and turn on cooling when setpoint < indoor temperature.
                if (buildingValues['Temperature Setpoint'] < buildingValues['Indoor Temperature']):
                    self.__coolantBypassActuatorState = 1
                else:       
                    self.__coolantBypassActuatorState = 0

                # Check the CO2 levels and open/close damper separating extract and supply air flow to reuse air as much as possible to preserve atmoshphere and reduce energy usage.
                if(buildingValues['CO2 Levels'] == 'Low' or buildingValues['CO2 Levels'] == 'Medium'):
                    self.__damperState = 1
                else:
                    self.__damperState = 0
                    self.__supplyFanSpeed = 100
                    self.__extractFanSpeed = 100

            
                # Check the humidity levels and turn on the humidifier if humidity levels are too low.
                if(buildingValues['Indoor Humidity'] < 40 or buildingValues['Outdoor Humidity'] < 40):
                    self.__humidifierState = 1
                else:
                    self.__humidifierState = 0

                # check the humidity levels and turn on the thermal wheel if the humidity levels are too high.
                if(buildingValues['Indoor Humidity'] > 40 or buildingValues['Outdoor Humidity'] > 40):
                    self.__thermalWheelState = 1
                else:
                    self.__thermalWheelState = 0
            
        # Properties of an AHU
        props = {
            'Running State' : self.__runningState,
            'Damper State' : self.__damperState,
            'Supply Fan Speed' : self.__supplyFanSpeed,
            'Extract Fan Speed' : self.__extractFanSpeed,
            'Humidifier State' : self.__humidifierState,
            'Thermal Wheel State' : self.__thermalWheelState,
            'Coolant Bypass Actuator State' : self.__coolantBypassActuatorState,
            'Mode' : self.__mode,
        }

        # Update the AHU properties in the database
        db.child(self.__ahuName).update(props)

        # Update the AHU heartbeat in the Firebase Realtime Database
        db.child('Heartbeats').update({f"{self.__ahuName}-Heartbeat" : self.__heartbeat})

        # Print the AHU properties in the console
        print(f"*** {self.__ahuName} running... ***") 
        print("Running State: " + str(self.__runningState))
        print("Damper State: " + str(self.__damperState))
        print("Supply Fan Speed: " + str(self.__supplyFanSpeed))
        print("Extract Fan Speed: " + str(self.__extractFanSpeed))
        print("Humidifier State: " + str(self.__humidifierState))
        print("Thermal Wheel State: " + str(self.__thermalWheelState))
        print("Coolant Bypass Actuator State: " + str(self.__coolantBypassActuatorState))
        print("Mode: " + str(self.__mode))
        print(f"*** {self.__ahuName} updated. ***")
        print("\n")