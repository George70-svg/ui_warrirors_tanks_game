export const VALIDATIONS = {
  login: [
    { required: true, message: 'Should not be empty' },
    {
      pattern: /^.{3,20}$/,
      message: 'Must contain between 3 and 20 characters',
    },
    {
      pattern: /^(?!\d+$).+/,
      message: 'Should not consist only of numbers',
    },
    {
      pattern: /^[a-zA-Z0-9_-]+$/,
      message:
        'Only Latin characters, numbers, hyphens and underscores are allowed.',
    },
  ],
  name: [
    { required: true, message: 'Should not be empty' },
    {
      pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
      message: 'Latin or Cyrillic characters and hyphens are allowed',
    },
    {
      pattern: /^[A-ZА-ЯЁ]/,
      message: 'The first letter must be capitalized',
    },
  ],
  email: [
    { required: true, message: 'Should not be empty' },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
      message: 'Invalid email format',
    },
  ],
  password: [
    { required: true, message: 'Should not be empty' },
    {
      pattern: /^.{8,40}$/,
      message: 'Must contain between 8 and 40 characters',
    },
    {
      pattern: /(?=.*[A-Z])(?=.*\d)/,
      message: 'There must be at least one capital letter or number',
    },
  ],
  phone: [
    { required: true, message: 'Should not be empty' },
    {
      pattern: /^\+?\d+$/,
      message: 'Must consist of numbers (may start with a plus)',
    },
    {
      pattern: /^.{10,15}$/,
      message: 'Must contain between 10 and 15 characters',
    },
  ],
}

export const VALIDATIONS_RULES = {
  validateTrigger: 'onBlur',
  validateFirst: true,
}
