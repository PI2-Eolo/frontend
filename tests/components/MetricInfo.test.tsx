import React from 'react';
import renderer from 'react-test-renderer';
import MetricInfo from '../../src/components/MetricInfo';

describe('Header component test', () => {
    it('component snapshot', () => {
        const consumptionComponent = renderer.create(
            <MetricInfo label="Consumption" value={13.3} unit="kW/h"/>,
        );
        expect(consumptionComponent.toJSON()).toMatchSnapshot();
        const energyComponent = renderer.create(
            <MetricInfo label="Energy production" value={25.1} unit="kw/h" decimalPlaces={3}/>
        );
        expect(energyComponent.toJSON()).toMatchSnapshot();
    })
})