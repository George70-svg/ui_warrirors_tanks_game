import { Button, Form, FormInstance } from 'antd'
import styles from './profile-form.module.pcss'
import { useAppSelector } from '../../shared/lib'
import { selectIsUserDataUpdating } from '../../entities/user'
import { ReactNode } from 'react'

export function ProfileForm<T>({
  onSubmit,
  children,
  initialValues,
}: {
  onSubmit: (values: T, form: FormInstance<T>) => void
  children: ReactNode
  initialValues?: T
}) {
  const isUserDataUpdating = useAppSelector(selectIsUserDataUpdating)
  const [form] = Form.useForm<T>()

  return (
    <Form<T>
      form={form}
      layout="horizontal"
      name="basic"
      labelCol={{ span: 8 }}
      size="large"
      onFinish={(values) => onSubmit(values, form)}
      autoComplete="off"
      className={styles.form}
      initialValues={{
        ...initialValues,
      }}
    >
      {children}
      <Form.Item<T> className={styles.button}>
        <Button disabled={isUserDataUpdating} htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
