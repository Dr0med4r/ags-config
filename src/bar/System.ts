import Backlight from "./System/Backlight";
import BatteryProgress from "./System/Battery";
import Indicator, { cpu, ram, temperature } from "./System/SystemInfo";


export default () =>
  Widget.EventBox({
    on_primary_click: () => Utils.execAsync(["missioncenter"]),

    child: Widget.Box({
      class_name: "SystemInfo module",

      children: [
        Backlight(),
        BatteryProgress(),
        Indicator(temperature),
        Indicator(cpu),
        Indicator(ram),
      ],
    }),
  });
