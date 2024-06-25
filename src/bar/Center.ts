
const audio = await Service.import('audio')

/** @param {'speaker' | 'microphone'} type */
const VolumeSlider = (type: 'speaker' | 'microphone' = 'speaker') => Widget.Slider({
    hexpand: true,
    drawValue: false,
    css: "min-width: 50px",
    onChange: ({ value }) => audio[type].volume = value,
    value: audio[type].bind('volume'),
})

const speakerSlider = VolumeSlider('speaker')
const micSlider = VolumeSlider('microphone')

const VolumeControl = () => Widget.Revealer({
    css: "background-color: black;",
    revealChild: true,
    child: Widget.Box({
        vertical: true,
        children: [speakerSlider, micSlider],
    })
})
export default () => Widget.Box({
    children: [VolumeControl(),]
})
