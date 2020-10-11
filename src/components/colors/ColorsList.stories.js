import React from 'react';
import ColorsList from './ColorsList';

export default {
  title: 'Components/Colors',
  component: ColorsList,
  argTypes: {
    colors: { control: 'object' },
    currentColor: { control: 'object' },
    onSelect: { action: 'selected' }
  }
};

const Template = (args) => (
  <div>
    <ColorsList {...args} />
  </div>
);

export const ColorsListRGB = Template.bind({});
ColorsListRGB.args = {
  colors: [
    { name: 'Red', value: '#f00' },
    { name: 'Green', value: '#0f0' },
    { name: 'Blue', value: '#00f' }
  ],
  currentColor: { name: 'Green', value: '#0f0' }
};
export const ColorsListCMYK = Template.bind({});
ColorsListCMYK.args = {
  colors: [
    { name: 'Cyan', value: '#00FFFF' },
    { name: 'Magenta', value: '#FF00FF' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Black', value: '#000000' }
  ]
};
export const ColorsListBW = Template.bind({});
ColorsListBW.args = {
  colors: [
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#D3D3D3' },
    { name: 'White', value: '#FFFFFF' }
  ],
  currentColor: { name: 'White', value: '#FFFFFF' }
};
