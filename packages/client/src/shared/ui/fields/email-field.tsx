import { Form, Input } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function EmailField({ showLabel = false }: { showLabel: boolean }) {
  return (
    <Item
      name="email"
      key="email"
      rules={VALIDATIONS.email}
      {...VALIDATIONS_RULES}
      label={showLabel ? 'Email' : ''}
    >
      <Input placeholder={showLabel ? '' : 'Email'} prefix={<MailOutlined />} />
    </Item>
  )
}
