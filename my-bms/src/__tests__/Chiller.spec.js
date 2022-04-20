/**
 * Chiller unit tests, it tests the Chiller component
 * makes sure the device displays the correct information
 * based on the data from its state.
 * 
 * @author Kamil Kawka
 * 
 */

import * as reactModule from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chiller from '../components/buildings/b1/assets/Chiller';

Enzyme.configure({ adapter: new Adapter() });

/*
    * Test with values 0, corresponding to OFF state
*/
describe('Chiller Test with values 0, corresponding to OFF state', () => {
    const initState = {
        'Mode': 0,
        'Flow Temperature': 0,
        'Return Temperature': 0,
    };
    reactModule.useState = jest.fn(() => [initState, () => {}]);
	const wrapper = shallow(<Chiller deviceName='NAME-TEST' />);

	it('Should display the device name as NAME-TEST', () => {
		const chillerTitle = wrapper.find('#chillers-title');
        expect(chillerTitle.text()).toContain('NAME-TEST');
	});

    it('Should display the device mode OFF', () => {
		const mode = wrapper.find('#mode');
        expect(mode.text()).toContain('OFF');
	});

    it('Should display the device flow temperature 0', () => {
		const mode = wrapper.find('#flowTemp');
        expect(mode.text()).toContain('0');
	});

    it('Should display the device mode OFF', () => {
		const mode = wrapper.find('#returnTemp');
        expect(mode.text()).toContain('0');
	});
});


/*
    * Test with values 1, corresponding to ON state
*/
describe('Chiller Test with values 1, corresponding to ON state', () => {
    const initState = {
        'Mode': 1,
        'Flow Temperature': 6,
        'Return Temperature': 10,
    };
    reactModule.useState = jest.fn(() => [initState, () => {}]);
	const wrapper = shallow(<Chiller deviceName='NAME-TEST' />);

    it('Should display the device mode ON', () => {
		const mode = wrapper.find('#mode');
        expect(mode.text()).toContain('ON');
	});

    it('Should display the device flow temperature of 5 degrees celcius', () => {
		const mode = wrapper.find('#flowTemp');
        expect(mode.text()).toContain('6');
	});

    it('Should display return temperature of 10 degrees celcius', () => {
		const mode = wrapper.find('#returnTemp');
        expect(mode.text()).toContain('10');
	});
});


/*
    * Test Mode with value 2, corresponding to AUTO state
*/
describe('Chiller Test Mode value 2, corresponding to AUTO state', () => {
    const initState = {
        'Mode': 2
    };
    reactModule.useState = jest.fn(() => [initState, () => {}]);
	const wrapper = shallow(<Chiller deviceName='NAME-TEST' />);

    it('Should display the device mode AUTO', () => {
		const mode = wrapper.find('#mode');
        expect(mode.text()).toContain('AUTO');
	});
});