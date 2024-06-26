import SystemStat from "./right/SystemStat"
import Systemtray from "./right/Systemtray"

export default () => Widget.Box({
    hpack: "end",
    children: [
        SystemStat(),
        Systemtray()
    ]
})
