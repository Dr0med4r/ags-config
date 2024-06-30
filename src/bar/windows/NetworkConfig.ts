const network = await Service.import("network")

const TypeOfConnection = () => Widget.CenterBox({
    className: "ConnectionTypes",
    startWidget: Widget.Button({
        child: Widget.Label({ label: "Wifi" })
    }),
    centerWidget: Widget.Button({
        child: Widget.Label({ label: "Wired" })
    }),
    endWidget: Widget.Button({
        child: Widget.Label({ label: "VPN" })
    })
})

const WifiConnections = () => Widget.Scrollable({
    className: "WifiConnections",
    vscroll: "always",
    hscroll: "never",
    child: Widget.Box({
        vertical: true,
        children: connections(),
    })
})


const WifiConnection = (access_point: {
    bssid: string | null;
    address: string | null;
    lastSeen: number;
    ssid: string | null;
    active: boolean;
    strength: number;
    frequency: number;
    iconName: string | undefined;
}) => Widget.EventBox({
    on_primary_click: () => {
        access_point.active = true;
        print("pressed")
    },
    child: Widget.Box({
        className: "WifiConnection",
        children: [
            Widget.Icon({ icon: access_point.iconName }),
            Widget.Label({ label: access_point.ssid }),
        ]

    }),
})

function connections() {
    return network.wifi.access_points
        .sort((ap1, ap2) => ap2.strength - ap1.strength)
        .map(WifiConnection)
}

const WifiSettings = () => Widget.Box({
    vertical: true,
    children: [
        Widget.Box({
            children: [
                Widget.Switch({
                    className: "WifiSwitch",
                    onActivate: () => network.toggleWifi(),
                    setup: (self) => self.active = network.wifi.enabled,
                }),
                Widget.Label({label: "Toggle Wifi", css: "margin-left: 0.2em; margin-right: 2em;"}),
                Widget.Button({
                    className: "ScanButton",
                    on_clicked: () => network.wifi.scan(),
                    child: Widget.Label({ label: "Scan" })
                })
            ]
        }),
        WifiConnections(),
    ]
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
