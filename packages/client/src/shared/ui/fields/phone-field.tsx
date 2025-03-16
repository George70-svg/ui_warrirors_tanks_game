import { Form, Input } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function PhoneField({ showLabel = false }: { showLabel: boolean }) {
  return (
    <Item
      name="phone"
      key="phone"
      rules={VALIDATIONS.phone}
      {...VALIDATIONS_RULES}
      label={showLabel ? 'Phone' : ''}
    >
      <Input
        placeholder={showLabel ? '' : 'Phone'}
        prefix={<PhoneOutlined />}
      />
    </Item>
  )
}
