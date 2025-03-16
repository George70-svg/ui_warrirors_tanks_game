import { Form } from 'antd'
import { VALIDATIONS_RULES } from './validations'
import { FIELD_CONFIG, InputName } from './config'

const { Item } = Form

export function InputField({
  name,
  showLabel,
}: {
  name: InputName
  showLabel?: boolean
}) {
  const { Component, text, rules, Icon } = FIELD_CONFIG[name]
  return (
    <Item
      name={name}
      key={name}
      label={showLabel ? text : ''}
      rules={rules}
      {...VALIDATIONS_RULES}
    >
      <Component placeholder={showLabel ? '' : text} prefix={<Icon />} />
    </Item>
  )
}
