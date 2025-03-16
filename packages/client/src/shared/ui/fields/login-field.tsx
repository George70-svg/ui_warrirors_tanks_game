import { Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function LoginField({ showLabel = false }: { showLabel: boolean }) {
  return (
    <Item
      name="login"
      key="login"
      rules={VALIDATIONS.login}
      {...VALIDATIONS_RULES}
      label={showLabel ? 'Login' : ''}
    >
      <Input placeholder={showLabel ? '' : 'Login'} prefix={<UserOutlined />} />
    </Item>
  )
}
