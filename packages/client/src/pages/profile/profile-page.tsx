import {
  Avatar,
  Button,
  Flex,
  Form,
  FormProps,
  Modal,
  Skeleton,
  Typography,
  Upload,
} from 'antd'
import { useUserInfo } from '../../entities/user'
import { CSSProperties, useEffect, useState } from 'react'
import { useUserEditInfo } from '../../entities/user/use-user-change-profile'
import { UserInfoDto } from '../../entities/user/types'
import { UploadOutlined } from '@ant-design/icons'
import styles from './profile-page.module.pcss'
import {
  DisplayNameField,
  EmailField,
  FirstNameField,
  LoginField,
  PhoneField,
  SecondNameField,
} from '../../shared/ui'

const paragraphStyle: CSSProperties = { margin: 0 }

export const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)

  const { data, isLoading } = useUserInfo()
  const { changeInfo, changeAvatar, isLoading: userLoading } = useUserEditInfo()
  const [form] = Form.useForm()

  const onFinish: FormProps<UserInfoDto>['onFinish'] = async (values) => {
    await changeInfo(values).then((res) => {
      if (res) {
        form.setFieldsValue(res)
      }
    })
  }

  const beforeUpload = async (file: File) => {
    setAvatar(file)
  }

  const handleUpdateAvatar = async () => {
    if (avatar) {
      const data = new FormData()
      data.append('avatar', avatar)
      await changeAvatar(data).then((res) => {
        if (res) {
          form.setFieldsValue(res)
        }
      })
      setAvatar(null)
      setIsModalOpen(false)
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setAvatar(null)
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  if (isLoading) {
    return <Skeleton avatar paragraph={{ rows: 2 }} />
  }

  return (
    <Flex justify="space-around" className={styles.container}>
      <Flex gap={140}>
        <Flex align="center" justify="space-between" gap={17}>
          <Avatar
            onClick={showModal}
            style={{ cursor: 'pointer' }}
            src={
              'https://ya-praktikum.tech/api/v2/resources' +
              form.getFieldValue('avatar')
            }
            size={107}
          />
          <Flex vertical align="flex-start" gap={1}>
            <Typography.Paragraph style={paragraphStyle}>
              {data?.display_name || 'No name'}
            </Typography.Paragraph>
            <Typography.Paragraph style={paragraphStyle}>
              {'@' + data?.login}
            </Typography.Paragraph>
          </Flex>
        </Flex>
      </Flex>
      <Form
        form={form}
        layout="horizontal"
        name="basic"
        labelCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <DisplayNameField showLabel={true} />
        <EmailField showLabel={true} />
        <FirstNameField showLabel={true} />
        <SecondNameField showLabel={true} />
        <LoginField showLabel={true} />
        <PhoneField showLabel={true} />

        <Form.Item<UserInfoDto>>
          <Button loading={userLoading} htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Upload avatar"
        open={isModalOpen}
        onOk={handleUpdateAvatar}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !avatar }}
      >
        <Upload
          accept={'.jpg, .jpeg, .png, .gif, .webp'}
          beforeUpload={beforeUpload}
          maxCount={1}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess?.('ok')
            }, 0)
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>
    </Flex>
  )
}
