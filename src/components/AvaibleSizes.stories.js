import React from 'react';
import AvaibleSizes from './AvaibleSizes';
import '../styles/_reset.sass';
import '../styles/_fonts.sass';

export default {
  title: 'Components/AvaibleSizes',
  component: AvaibleSizes,
  argTypes: {
    sizes: { control: 'object', defaultValue: [] }
  }
};

const Template = (args) => (
  <label>
    Avaible sizes&emsp;
    <AvaibleSizes {...args} />
  </label>
);

export const Empty = Template.bind({});
export const SmallLargeXlagre = Template.bind({});
SmallLargeXlagre.args = {
  sizes: [{ value: 'S' }, { value: 'L' }, { value: 'XL' }]
};
