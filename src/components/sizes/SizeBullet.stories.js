import React from 'react';
import SizeBulletComponent from './SizeBullet';

export default {
  title: 'Components/Sizes',
  component: SizeBulletComponent,
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    isActive: { control: 'boolean' },
    onClick: { action: 'clicked' }
  }
};

const Template = (args) => (
  <div>
    <SizeBulletComponent {...args} />
  </div>
);

export const SizeBullet = Template.bind({});
SizeBullet.args = {
  name: 'Small',
  value: 'S',
  isActive: false,
  onClick: undefined
};

export const SizeBulletCanClick = Template.bind({});
SizeBulletCanClick.args = {
  name: 'Large',
  value: 'L',
  isActive: false
};
