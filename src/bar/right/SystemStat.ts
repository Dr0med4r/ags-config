import Box from "types/widgets/box";
import Label from "types/widgets/label";

type SystemInfo = {
  type: string;
  poll: (self: Label<unknown>) => void;
  boxpoll: (self: Box<Label<unknown>, unknown>) => void;
  label?: string;
  tooltipText?: string;

}
const Indicator = (props: SystemInfo) =>
  Widget.Box({
    className: `SystemInfo ${props.type}`,
    vexpand: true,
    vpack: "center",

    children: [
      Widget.Label({
        className: "type",
        label: props.type,
      }),
      Widget.Label({ className: "value" })
        .poll(2000, props.poll),
    ],
  }).poll(2000, props.boxpoll);

const cpu = {
  type: " ",

  poll: (self: Label<unknown>) =>
    Utils.execAsync([
      "sh",
      "-c",
      `top -bn1 | rg '%Cpu' | tail -1 | awk '{print 100-$8}'`,
    ])
      .then((r) => (self.label = Math.round(Number(r)) + "%"))
      .catch((err) => print(err)),

  boxpoll: (self: Box<Label<unknown>, unknown>) =>
    Utils.execAsync([
      "sh",
      "-c",
      "lscpu --parse=MHZ",
    ])
      .then((r) => {
        const mhz = r.split("\n").slice(4).map((value) => value.split(",")[0]);
        const freq = mhz.reduce((acc, e) => acc + Number(e), 0) / mhz.length;
        self.tooltipText = Math.round(freq) + " MHz";
      })
      .catch((err) => print(err)),
};


const ram = {
  type: " ",
  poll: (self: Label<unknown>) =>
    Utils.execAsync([
      "sh",
      "-c",
      `free | tail -2 | head -1 | awk '{print $3/$2*100}'`,
    ])
      .then((r) => (self.label = Math.round(Number(r)) + "%"))
      .catch((err) => print(err)),

  boxpoll: (self: Box<Label<unknown>, unknown>) =>
    Utils.execAsync([
      "sh",
      "-c",
      "free --si -h | tail -2 | head -1 | awk '{print $3}'",
    ])
      .then((r) => self.tooltipText = r)
      .catch((err) => print(err)),
};

const temperature: SystemInfo = {
  type: " ",
  poll: (self: Label<unknown>) =>
    Utils.execAsync([
      "sh",
      "-c",
      `sensors 'coretemp-*' | awk '{print $3}' | head -4 | tail -1`,
    ]).then((r) => {
      self.label = r.slice(1);
    })
      .catch((err) => print(err)),

  boxpoll: (self) => { },


}


export default () =>
  Widget.EventBox({
    onPrimaryClick: () => Utils.execAsync(["missioncenter"]),

    child: Widget.Box({
      className: "system-info module",

      children: [
        Indicator(temperature),
        Indicator(cpu),
        Indicator(ram),
      ],
    }),
  });
