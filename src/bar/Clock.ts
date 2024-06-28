
const Clock = () => Widget.Label()
    .poll(60000, self => {
        Utils.execAsync('date "+%d.%m %H:%M"')
            .then((date) => self.label = date)
    })


export default Clock
