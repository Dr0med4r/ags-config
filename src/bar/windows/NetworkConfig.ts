const network = await Service.import("network")

const TypeOfConnection = () => Widget.CenterBox({
    startWidget: Widget.EventBox({
        child: Widget.Label({ label: "Wifi" })
    }),
    centerWidget: Widget.EventBox({
        child: Widget.Label({ label: "Wired" })
    }),
    endWidget: Widget.EventBox({
        child: Widget.Label({ label: "VPN" })
    })
})

const WifiSettings = () => Widget.Box({
    vertical: true,
    children: [
        Widget.Box({
            children: [
                Widget.Switch({
                    onActivate: () => network.toggleWifi(),
                }),
                Widget.Button({
                    on_clicked: () => network.wifi.scan(),
                    child: Widget.Label({ label: "Scan" })
                })
            ]
        }),
        WifiConnections(),
    ]
})

function connections() {
    return network.wifi.access_points
        .filter((ap) => ap.active)
        .sort((ap1, ap2) => ap1.lastSeen - ap2.lastSeen)
        .map(WifiConnection)
}

const WifiConnection = (access_point: {
    bssid: string | null;
    address: string | null;
    lastSeen: number;
    ssid: string | null;
    active: boolean;
    strength: number;
    frequency: number;
    iconName: string | undefined;
}) => Widget.Box({
    children: [
        Widget.Icon({ icon: access_point.iconName }),
        Widget.Label({ label: access_point.ssid }),
    ]

})

const WifiConnections = () => Widget.Scrollable({
    vscroll: "always",
    hscroll: "never",
    child: Widget.Box({
        children: connections(),
    })
})

const ConnectionSettings = () => Widget.Stack({
    children: {
        wifi: WifiSettings(),
        // wired: WiredSettings(),
        // vpn: VPNSettings(),
    },

})

const NetworkConfig = (monitor: number) => Widget.Window({
    visible: false,
    monitor,
    name: `networkConfig${monitor}`,
    anchor: ["top"],
    className: "NetworkConfig",
    child: Widget.Box({
        vertical: true,
        children: [
            TypeOfConnection(),
            ConnectionSettings(),
        ],

    })
});

export default NetworkConfig
