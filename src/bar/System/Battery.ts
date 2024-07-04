const battery = await Service.import('battery')

const BatteryProgress = () => Widget.CircularProgress({
    visible: battery.bind('available'),
    value: battery.bind('percent').as(p => p > 0 ? p / 100 : 0),
    class_name: "BatteryProgress",
    start_at: 0.75,
    inverted: true,
})
    .hook(battery, (self) => {
        const critical_percent = 0.15
        self.toggleClassName("critical", battery.percent < critical_percent)
        self.toggleClassName("charging", battery.charging)
        const seconds_in_hour = 3600
        const time_remaining = battery.time_remaining
        const hours = Math.floor(time_remaining / seconds_in_hour)
        const minutes = Math.floor(time_remaining / 60) - hours * 60
        const tooltip_time = `${hours}h, ${minutes}min left`
        self.tooltip_text =
            battery.percent + "%\n"
            + tooltip_time

    })

export default BatteryProgress
