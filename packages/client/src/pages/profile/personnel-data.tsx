import { InputField } from '../../shared/ui'
import { useAppDispatch, useAppSelector } from '../../shared/lib'
import { updateProfile, selectUserData } from '../../entities/user'
import { ProfileForm } from './profile-form'

interface Fields {
  display_name: string
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
}

export function PersonnelData() {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectUserData)!

  const handleSubmit = (values: Fields) => {
    dispatch(updateProfile(values))
  }

  return (
    <ProfileForm
      onSubmit={handleSubmit}
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
    </ProfileForm>
  )
}
