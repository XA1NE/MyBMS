/**
 * This is a storage component that allows you
 * to store and retrieve data from the database.
 * 
 * @author Kamil Kawka
 * 
 */

import { getDatabase, ref, get, set, onValue } from 'firebase/database';

// Function provides a set of methods to store and retrieve data from the database.
const useDeviceStore = () => {
    
    // Function gets a single device data from the database
    const retrieveDevice = async (deviceName, callback) => {
		const db = getDatabase();
		const tableRef = ref(db, deviceName);
		return await get(tableRef).then(callback);
	}

    // Function gets all the devices data from the database
	const retrieveAllDevices = async (callback) => {
		const db = getDatabase();
		const tableRef = ref(db);
		return await get(tableRef).then(callback);
    }
    
    // Function updates device data in the database
    const updateDevice = async (deviceName, key, newValue) => {
        const db = getDatabase();
		const tableRef = ref(db, `${deviceName}/${key}`);
        return await set(tableRef, newValue);
    }

    // When value changes in the device data in the database this function is called
    const onUpdateDevice = async (deviceName, callback) => {
		const db = getDatabase();
        const tableRef = ref(db, deviceName);
        return await onValue(tableRef, callback);
    }

    // Returns functions
	return {
        retrieveDevice,
        retrieveAllDevices,
        updateDevice,
        onUpdateDevice
    }
}

export default useDeviceStore