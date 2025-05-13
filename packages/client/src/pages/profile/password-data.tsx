import { InputField } from '../../shared/ui'
import { useAppDispatch } from '../../shared/lib'
import { updatePassword } from '../../entities/user'
import { ProfileForm } from './profile-form'
import { FormInstance } from 'antd'

interface Fields {
  oldPassword: string
  newPassword: string
}

export function PasswordData() {
  const dispatch = useAppDispatch()

  const handleSubmit = async (values: Fields, form: FormInstance<Fields>) => {
    await dispatch(updatePassword(values))
    form.resetFields()
  }

  return (
    <ProfileForm onSubmit={handleSubmit}>
      <InputField name="oldPassword" showLabel={true} />
      <InputField name="newPassword" showLabel={true} />
    </ProfileForm>
  )
}
