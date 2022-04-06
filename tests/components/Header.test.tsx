import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../src/components/Header';

describe('Header component test', () => {
    it('component snapshot', () => {
        const component = renderer.create(
            <Header />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})