
const Clock = () => Widget.Label({
    class_name: "Clock",
})
    .poll(60000, self => {
        Utils.execAsync('date "+%d.%m %H:%M"')
            .then((date) => self.label = date)
    })


export default Clock
