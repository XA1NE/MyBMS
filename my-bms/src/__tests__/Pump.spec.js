/**
 * Pump test file, it tests the Pump component
 * makes sure the device displays the correct information
 * based on the data from its state.
 * 
 * @author Kamil Kawka
 * 
 */

import * as reactModule from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pump from '../components/buildings/b1/assets/Pump';

Enzyme.configure({ adapter: new Adapter() });

/*
    * Test with values 0, corresponding to OFF state
*/
describe('Pump', () => {
    const initState = {
        'Mode': 0,
        'Pump Speed': 0,
    };
    reactModule.useState = jest.fn(() => [initState, () => {}]);
	const wrapper = shallow(<Pump deviceName='NAME-TEST' />);

	it('Should display the device name as NAME-TEST', () => {
		const pumpTitle = wrapper.find('#pumps-title');
        expect(pumpTitle.text()).toContain('NAME-TEST');
	});

    it('Should display the device mode as OFF', () => {
		const mode = wrapper.find('#mode');
        expect(mode.text()).toContain('OFF');
	});

    it('Should display the device pump speed as 0', () => {
        const pumpSpeed = wrapper.find('#pumpSpeed');
        expect(pumpSpeed.text()).toContain('0');
    });
});


/*
    * Test with values 1, corresponding to ON state
*/
describe('Pump', () => {
    const initState = {
        'Mode': 1,
        'Pump Speed': 50,
    };
    reactModule.useState = jest.fn(() => [initState, () => {}]);
	const wrapper = shallow(<Pump deviceName='NAME-TEST' />);

    it('Should display the device mode as OFF', () => {
		const mode = wrapper.find('#mode');
        expect(mode.text()).toContain('ON');
	});

    it('Should display the device pump speed as 50Hz', () => {
        const pumpSpeed = wrapper.find('#pumpSpeed');
        expect(pumpSpeed.text()).toContain('50');
    });
});


/*
    * Test Mode with value 2, corresponding to AUTO state
*/
describe('Pump', () => {
    const initState = {
        'Mode': 2,
    };
    reactModule.useState = jest.fn(() => [initState, () => {}]);
	const wrapper = shallow(<Pump deviceName='NAME-TEST' />);

    it('Should display the device mode as AUTO', () => {
		const mode = wrapper.find('#mode');
        expect(mode.text()).toContain('AUTO');
	});
});