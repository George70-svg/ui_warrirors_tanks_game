import { Form, Input } from 'antd'
import { IdcardOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function SecondNameField({ showLabel = false }: { showLabel: boolean }) {
  return (
    <Item
      name="second_name"
      key="second_name"
      rules={VALIDATIONS.name}
      {...VALIDATIONS_RULES}
      label={showLabel ? 'Second name' : ''}
    >
      <Input
        placeholder={showLabel ? '' : 'Second name'}
        prefix={<IdcardOutlined />}
      />
    </Item>
  )
}
