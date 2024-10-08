const network = await Service.import('network')

const WifiIndicator = () => Widget.Box({
    children: [
        Widget.Icon({
            icon: network.wifi.bind('icon_name'),
        }),
        Widget.Label({
            label: network.wifi.bind('ssid')
                .as(ssid => ssid || 'Unknown'),
        }),
    ],
})

const WiredIndicator = () => Widget.Icon({
    icon: network.wired.bind('icon_name'),
})

const NetworkIndicator = () => Widget.EventBox({
    on_primary_click: () => {
        const window = `networkConfig`
        App.toggleWindow(window)
    },
    child: Widget.Stack({
        class_name: "NetworkIndicator",
        children: {
            wifi: WifiIndicator(),
            wired: WiredIndicator(),
        },
        shown: network.bind('primary').as(p => p || 'wifi'),
    }),
})


export default NetworkIndicator
