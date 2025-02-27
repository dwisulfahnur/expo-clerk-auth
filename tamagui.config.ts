import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { tokens } from '@tamagui/themes'
import { themes } from './themes'


const interFont = createInterFont()

const config = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont
  },
  themes,
  tokens,
  shorthands,
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig { }
}

export default config 