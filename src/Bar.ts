import Workspaces from "./bar/Workspaces"
import VolumeIndicator, { VolumeControl } from "./bar/Volume"
import SystemStat from "./bar/right/SystemStat"
import Systemtray from "./bar/right/Systemtray"
import Clock from "./bar/Clock"



const Left = () => Widget.Box({
    children: [
        Workspaces(),
    ],
})

const Center = () => Widget.Box({
    children: [VolumeIndicator(),],
})



const Right = () => Widget.Box({
    hpack: "end",
    children: [
        SystemStat(),
        Clock(),
        Systemtray(),
    ]
})

export default (monitor: number) => Widget.Window({
    monitor: monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        start_widget: Left(),
        center_widget: Center(),
        end_widget: Right(),
    }),
    setup: () => {
        App.add_window(VolumeControl(monitor))
    },
})
