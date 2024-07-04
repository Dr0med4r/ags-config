import brightness from "./BrightnessService"


const Backlight = () => Widget.Slider({
    visible: brightness.screen_value < 0 ? false : true,
    orientation: 1,
    inverted: true,
    draw_value: false,
    class_name: "Brightness",
    on_change: self => brightness.screen_value = self.value,
    value: brightness.bind("screen_value"),
    tooltip_text: brightness.bind("screen_value").as(v => `${Math.floor(v * 100)}`),
});

export default Backlight
