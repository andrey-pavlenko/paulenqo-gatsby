import React from 'react';
import AvaibleColors from './AvaibleColors';
import '../styles/_reset.sass';
import '../styles/_fonts.sass';

export default {
  title: 'Components/AvaibleColors',
  component: AvaibleColors,
  argTypes: {
    colors: { control: 'object', defaultValue: [] }
  }
};

const Template = (args) => (
  <label>
    Avaible colors&emsp;
    <AvaibleColors {...args} />
  </label>
);

export const Empty = Template.bind({});
export const RedGreenBlue = Template.bind({});
RedGreenBlue.args = {
  colors: [
    { name: 'Red', value: '#f00' },
    { name: 'Green', value: '#0f0' },
    { name: 'Blue', value: '#00f' }
  ]
};
export const CyanMagentaYellowBlack = Template.bind({});
CyanMagentaYellowBlack.args = {
  colors: [
    { name: 'Cyan', value: '#00FFFF' },
    { name: 'Magenta', value: '#FF00FF' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Black', value: '#000000' }
  ]
};
export const BlackGrayWhite = Template.bind({});
BlackGrayWhite.args = {
  colors: [
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#D3D3D3' },
    { name: 'White', value: '#FFFFFF' }
  ]
};
