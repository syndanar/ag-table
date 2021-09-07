import { TButton } from '@/common/vuetify/types'

export default function (defs: TButton): TButton {
  return {
    color: defs.color || 'primary',
    depressed: defs.depressed || false,
    icon: defs.icon || false,
    outlined: defs.outlined || false,
    plain: defs.plain || false,
    rounded: defs.rounded || false,
    text: defs.text || false,
    tile: defs.tile || false,
    block: defs.block || false,
    small: defs.small || false,
    xSmall: defs.xSmall || false,
    large: defs.large || false,
    xLarge: defs.xLarge || false
  }
}
