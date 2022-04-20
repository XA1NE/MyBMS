/**
 * AHU test file, it tests the AHU component
 * makes sure the device displays the correct information
 * based on the data from its state.
 * 
 * @author Kamil Kawka
 * 
 */

import * as reactModule from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AHU from '../components/buildings/b1/assets/AHU';

Enzyme.configure({ adapter: new Adapter() });

/*
    * Test with values 0, corresponding to OFF state
*/
describe('AHU Test with values 0, corresponding to OFF state', () => {
    const initState = {
        'Mode': 0,
        'Coolant Bypass Actuator State': 0,
        'Thermal Wheel State': 0,
        'Humidifier State': 0,
        'Supply Fan Speed': 0,
        'Extract Fan Speed': 0,
        'Damper State': 0
    };
    reactModule.useState = jest.fn(() => [initState, () => {}]);
	const wrapper = shallow(<AHU deviceName='TEST_NAME' />);

	it('Should set the deviceName to TEST_NAME', () => {
		const ahuTitle = wrapper.find('#ahus-title');
        expect(ahuTitle.text()).toContain('TEST_NAME');
	});

    it('Should display the device mode as OFF', () => {
		const mode = wrapper.find('#mode');
        expect(mode.text()).toContain('OFF');
	});

    it('Should display the device coolant bypass state as CLOSED', () => {
        const coolantBypass = wrapper.find('#coolantBypass');
        expect(coolantBypass.text()).toContain('CLOSED');
    });

    it('Should display the device thermal wheel state as OFF', () => {
        const thermalWheelState = wrapper.find('#thermalWheelState');
        expect(thermalWheelState.text()).toContain('OFF');
    });

    it('Should display the device humidifier state as OFF', () => {
        const humidifierState = wrapper.find('#humidifierState');
        expect(humidifierState.text()).toContain('OFF');
    });

    it('Should display the device supply fan speed as 0', () => {
        const supplyFanSpeed = wrapper.find('#thermalWheelState');
        expect(supplyFanSpeed.text()).toContain('OFF');
    });

    it('Should display the device extract fan speed as 0', () => {
        const extractFanSpeed = wrapper.find('#extractFanSpeed');
        expect(extractFanSpeed.text()).toContain('0');
    });

    it('Should display the device damper state as CLOSED', () => {
        const damperState = wrapper.find('#damperState');
        expect(damperState.text()).toContain('CLOSED');
    });
});


/*
    * Test with values 1, corresponding to ON state
*/
describe('AHU Test with values 1, corresponding to ON state', () => {
    const initState = {
        'Mode': 1,
        'Coolant Bypass Actuator State': 1,
        'Thermal Wheel State': 1,
        'Humidifier State': 1,
        'Supply Fan Speed': 100,
        'Extract Fan Speed': 100,
        'Damper State': 1
    };
    reactModule.useState = jest.fn(() => [initState, () => {}]);
	const wrapper = shallow(<AHU deviceName='TEST_NAME' />);

    it('Should display the device mode ON', () => {
		const mode = wrapper.find('#mode');
        expect(mode.text()).toContain('ON');
	});

    it('Should display the device coolant bypass state as OPEN', () => {
        const coolantBypass = wrapper.find('#coolantBypass');
        expect(coolantBypass.text()).toContain('OPEN');
    });

    it('Should display the device thermal wheel state as ON', () => {
        const thermalWheelState = wrapper.find('#thermalWheelState');
        expect(thermalWheelState.text()).toContain('ON');
    });

    it('Should display the device humidifier state as ON', () => {
        const humidifierState = wrapper.find('#humidifierState');
        expect(humidifierState.text()).toContain('ON');
    });

    it('Should display the device supply fan speed as ON', () => {
        const supplyFanSpeed = wrapper.find('#thermalWheelState');
        expect(supplyFanSpeed.text()).toContain('ON');
    });

    it('Should display the device extract fan speed as 100', () => {
        const extractFanSpeed = wrapper.find('#extractFanSpeed');
        expect(extractFanSpeed.text()).toContain('100');
    });

    it('Should display the device damper state as OPEN', () => {
        const damperState = wrapper.find('#damperState');
        expect(damperState.text()).toContain('OPEN');
    });
});


/*
    * Test with Mode value 2, corresponding to AUTO state
*/
describe('AHU Test with values 2, corresponding to AUTO state', () => {
    const initState = {
        'Mode': 2,
    };
    reactModule.useState = jest.fn(() => [initState, () => {}]);
	const wrapper = shallow(<AHU deviceName='TEST_NAME' />);

    it('Should display the device mode AUTO', () => {
		const mode = wrapper.find('#mode');
        expect(mode.text()).toContain('AUTO');
	});
});