import { Button, Form } from 'antd'
import styles from './profile-form.module.pcss'
import { InputField } from '../../shared/ui'
import { useAppDispatch, useAppSelector } from '../../shared/lib'
import {
  selectIsUserDataUpdating,
  updateProfile,
  selectUserData,
} from '../../entities/user'

interface Fields {
  display_name: string
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
}

export function ProfileForm() {
  const dispatch = useAppDispatch()
  const isUserDataUpdating = useAppSelector(selectIsUserDataUpdating)
  const data = useAppSelector(selectUserData)!
  const [form] = Form.useForm<Fields>()

  const handleSubmit = (values: Fields) => {
    dispatch(updateProfile(values))
  }

  return (
    <Form<Fields>
      form={form}
      layout="horizontal"
      name="basic"
      labelCol={{ span: 8 }}
      size="large"
      onFinish={handleSubmit}
      autoComplete="off"
      className={styles.form}
      initialValues={{
        display_name: data.display_name,
        first_name: data.first_name,
        second_name: data.second_name,
        login: data.login,
        email: data.email,
        phone: data.phone,
      }}
    >
      <InputField name="display_name" showLabel={true} />
      <InputField name="email" showLabel={true} />
      <InputField name="first_name" showLabel={true} />
      <InputField name="second_name" showLabel={true} />
      <InputField name="login" showLabel={true} />
      <InputField name="phone" showLabel={true} />

      <Form.Item<Fields> className={styles.button}>
        <Button disabled={isUserDataUpdating} htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
