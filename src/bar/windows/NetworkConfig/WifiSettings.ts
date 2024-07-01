import { Wifi } from "types/service/network";
import { Connections } from "../NetworkConfig";

const network = await Service.import("network")


const WifiConnection = (access_point: Wifi["access_points"][number]) => Widget.EventBox({
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

const WifiConnections = () => Connections("Wifi", connections)

const WifiSettings = () => {
    try {
        return Widget.Box({
            vertical: true,
            children: [
                Widget.Label({ label: network.wifi.bind("state") }),
                Widget.Box({
                    children: [
                        Widget.Switch({
                            className: "WifiSwitch",
                            onActivate: () => network.toggleWifi(),
                            active: network.wifi.bind("enabled"),
                        }),
                        Widget.Label({ label: "Toggle Wifi", css: "margin-left: 0.2em; margin-right: 2em;" }),
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
    }
    catch (e) {
        if(!(e instanceof TypeError)) {
            print(e)
        }
        return Widget.Label({ label: "No Wifi device" })
    }
}

export default WifiSettings
