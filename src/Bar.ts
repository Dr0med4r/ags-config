import Left from "./bar/Left"
import Center from "./bar/Center"
import Right from "./bar/Right"
const time = Variable('', {
    poll: [1000, function() {
        return Date().toString()
    }],
})

export default (/** @type {number} */ monitor: number) => Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        start_widget: Left(),
        center_widget: Center(),
        end_widget: Right(),
    }),
})
