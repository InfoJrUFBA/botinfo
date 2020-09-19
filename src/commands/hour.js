import { formatISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

module.exports = {
  async run (client, message) {
    const now = new Date()
    await message.channel.send(formatISO(now))
    message.channel.send(`${format(now, 'hh:mm')} até ${format(now, 'hh:mm')} do dia ${format(now, 'dd')} de ${format(now, 'MMMM', { locale: ptBR })}`)
  },

  get config () {
    return {
      name: 'hour',
      description: 'printa a hora no servidor',
      usage: 'hour',
      type: 'message'
    }
  }
}
