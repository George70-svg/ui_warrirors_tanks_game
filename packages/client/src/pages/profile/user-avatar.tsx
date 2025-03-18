import { Avatar, Button, Flex, Modal, Typography, Upload } from 'antd'
import { useAppDispatch, useAppSelector } from '../../shared/lib'
import {
  selectIsUserDataUpdating,
  selectUserData,
  uploadAvatar,
} from '../../entities/user'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { RESOURCE_URL } from '../../shared/config'
import styles from './user-avatar.module.pcss'

const { Text } = Typography

export function UserAvatar() {
  const dispatch = useAppDispatch()
  const isUserDataUpdating = useAppSelector(selectIsUserDataUpdating)
  const data = useAppSelector(selectUserData)!

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)

  const beforeUpload = (file: File) => {
    setAvatar(file)
    return false
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setAvatar(null)
    setIsModalOpen(false)
  }

  const handleUpdateAvatar = async () => {
    if (avatar) {
      const data = new FormData()
      data.append('avatar', avatar)
      await dispatch(uploadAvatar(data))
      setAvatar(null)
      setIsModalOpen(false)
    }
  }

  return (
    <>
      <Flex align="center" justify="space-between" gap={17}>
        <Avatar
          onClick={showModal}
          className={styles.avatar}
          src={RESOURCE_URL + data.avatar}
          size={107}
        />
        <Flex vertical align="flex-start" gap={1}>
          <Text>{data.display_name || 'No name'}</Text>
          <Text>{'@' + data.login}</Text>
        </Flex>
      </Flex>
      <Modal
        title="Upload avatar"
        open={isModalOpen}
        onOk={handleUpdateAvatar}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !avatar || isUserDataUpdating }}
        cancelButtonProps={{ disabled: isUserDataUpdating }}
      >
        <Upload
          accept={'.jpg, .jpeg, .png, .gif, .webp'}
          beforeUpload={beforeUpload}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>
    </>
  )
}
