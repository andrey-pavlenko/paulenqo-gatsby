import React from 'react';
import ColorBulletComponent from './ColorBullet';

export default {
  title: 'Components/Colors',
  component: ColorBulletComponent,
  argTypes: {
    name: { control: 'text' },
    value: { control: 'color' },
    isActive: { control: 'boolean' },
    onClick: { action: 'clicked' }
  }
};

const Template = (args) => (
  <div>
    <ColorBulletComponent {...args} />
  </div>
);

export const ColorBullet = Template.bind({});
ColorBullet.args = {
  name: 'Light',
  value: '#AFB',
  isActive: false,
  onClick: undefined
};

export const ColorBulletCanClick = Template.bind({});
ColorBulletCanClick.args = {
  name: 'White',
  value: '#fff',
  isActive: false
};
