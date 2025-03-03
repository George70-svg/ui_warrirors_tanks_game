import { Button, Card, Form, Input, Typography } from 'antd'
import { Rule } from 'antd/es/form'
import React, { ReactNode } from 'react'
import './auth-form.pcss'

const { Title } = Typography

export interface FormField {
  name: string
  placeholder: string
  rules?: Rule[]
  prefix?: ReactNode
  type?: 'text' | 'password' | 'email' | 'tel'
}

export interface FormValues {
  [key: string]: string
}

interface AuthFormProps {
  title: string
  fields: FormField[]
  submitButtonText: string
  footer?: ReactNode
  onSubmit?: (values: FormValues) => void
}

export function AuthForm({
  title,
  fields,
  submitButtonText,
  footer,
  onSubmit,
}: AuthFormProps): React.ReactElement {
  const [form] = Form.useForm<FormValues>()

  const handleSubmit = (values: FormValues) => {
    if (onSubmit) {
      onSubmit(values)
    }
  }

  return (
    <Card bordered={false} className="auth-form-container">
      <Title level={2} className="auth-form-title">
        {title}
      </Title>

      <Form
        form={form}
        layout="vertical"
        className="auth-form"
        onFinish={handleSubmit}
      >
        {fields.map((field) => (
          <Form.Item key={field.name} name={field.name} rules={field.rules}>
            {field.type === 'password' ? (
              <Input.Password
                prefix={field.prefix}
                placeholder={field.placeholder}
                className="auth-form-input"
              />
            ) : (
              <Input
                prefix={field.prefix}
                placeholder={field.placeholder}
                type={field.type || 'text'}
                className="auth-form-input"
              />
            )}
          </Form.Item>
        ))}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            block
          >
            {submitButtonText}
          </Button>
        </Form.Item>
      </Form>

      {footer && <div className="auth-form-footer">{footer}</div>}
    </Card>
  )
}
