import Gtk from "types/@girs/gtk-3.0/gtk-3.0";

type SystemInfo = {
  type: string;
  poll: (self: Gtk.Label) => void;
  boxpoll: (self: Gtk.Box) => void;
  label?: string;
  tooltip_text?: string;

}
const Indicator = (props: SystemInfo) =>
  Widget.Box({
    class_name: `SystemInfoIndicator ${props.type}`,
    vexpand: true,
    vpack: "center",

    children: [
      Widget.Label({
        class_name: "type",
        label: props.type,
      }),
      Widget.Label({ class_name: "value" })
        .poll(2000, props.poll),
    ],
  }).poll(2000, props.boxpoll);

export const cpu = {
  type: " ",

  poll: (self: Gtk.Label) =>
    Utils.execAsync([
      "sh",
      "-c",
      `top -bn1 | rg '%Cpu' | tail -1 | awk '{print 100-$8}'`,
    ])
      .then((r) => (self.label = Math.round(Number(r)) + "%"))
      .catch((err) => print(err)),

  boxpoll: (self: Gtk.Box) =>
    Utils.execAsync([
      "sh",
      "-c",
      "lscpu --parse=MHZ",
    ])
      .then((r) => {
        const mhz = r.split("\n").slice(4).map((value) => value.split(",")[0]);
        const freq = mhz.reduce((acc, e) => acc + Number(e), 0) / mhz.length;
        self.tooltip_text = Math.round(freq) + " MHz";
      })
      .catch((err) => print(err)),
};


export const ram = {
  type: " ",
  poll: (self: Gtk.Label) =>
    Utils.execAsync([
      "sh",
      "-c",
      `free | tail -2 | head -1 | awk '{print $3/$2*100}'`,
    ])
      .then((r) => (self.label = Math.round(Number(r)) + "%"))
      .catch((err) => print(err)),

  boxpoll: (self: Gtk.Box) =>
    Utils.execAsync([
      "sh",
      "-c",
      "free --si -h | tail -2 | head -1 | awk '{print $3}'",
    ])
      .then((r) => self.tooltip_text = r)
      .catch((err) => print(err)),
};

export const temperature: SystemInfo = {
  type: " ",
  poll: (self: Gtk.Label) =>
    Utils.execAsync([
      "sh",
      "-c",
      `sensors 'coretemp-*' | awk '{print $3}' | head -4 | tail -1`,
    ]).then((r) => {
      self.label = r.slice(1);
    })
      .catch((err) => print(err)),

  boxpoll: () => { },


}


export default Indicator
