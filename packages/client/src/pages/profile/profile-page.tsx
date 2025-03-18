import { Flex } from 'antd'

import styles from './profile-page.module.pcss'
import { ProfileForm } from './profile-form'
import { UserAvatar } from './user-avatar'

export const ProfilePage = () => {
  return (
    <Flex justify="space-around" className={styles.container}>
      <Flex>
        <UserAvatar />
      </Flex>
      <ProfileForm />
    </Flex>
  )
}
