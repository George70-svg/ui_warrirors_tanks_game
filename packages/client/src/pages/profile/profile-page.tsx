import { Flex, Select } from 'antd'

import styles from './profile-page.module.pcss'
import { PersonnelData } from './personnel-data'
import { UserAvatar } from './user-avatar'
import { useState } from 'react'
import { PasswordData } from './password-data'

type OptionValue = 'personnel' | 'password'

type Option = {
  label: string
  value: OptionValue
}

const SELECT_OPTIONS: Option[] = [
  { value: 'personnel', label: 'Personnel data' },
  { value: 'password', label: 'Password data' },
]

export const ProfilePage = () => {
  const [option, setOption] = useState<OptionValue>(() => 'personnel')

  return (
    <Flex className={styles.container} vertical={true} gap={24}>
      <Select
        options={SELECT_OPTIONS}
        onChange={(value) => setOption(value)}
        value={option}
        className={styles.select}
      />
      <Flex
        gap={20}
        align="start"
        className={styles.formContainer}
        justify="space-between"
      >
        <UserAvatar />
        {option === 'personnel' ? <PersonnelData /> : <PasswordData />}
      </Flex>
    </Flex>
  )
}
