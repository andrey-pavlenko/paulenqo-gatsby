import React from 'react';
import PriceSuperscripted from './PriceSuperscripted';
import '../styles/_reset.sass';
import '../styles/_fonts.sass';

export default {
  title: 'Components/PriceSuperscripted',
  component: PriceSuperscripted,
  argTypes: {
    currency: { control: 'text', defaultValue: '$' },
    value: { control: 'number', defaultValue: 100 }
  }
};

const Template = (args) => (
  <h1>
    <PriceSuperscripted {...args} />
  </h1>
);

export const Normal = Template.bind({});
