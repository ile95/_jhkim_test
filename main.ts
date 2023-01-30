let cal_slope = 0
let cal_diff_y = 0
let cal_diff_x = 0
let y_end = 0
let x_end = 0
let y_begin = 0
let x_begin = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
basic.forever(function () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultArrow)) {
        x_begin = huskylens.readeArrow(1, Content2.xOrigin)
        y_begin = huskylens.readeArrow(1, Content2.yOrigin)
        x_end = huskylens.readeArrow(1, Content2.xTarget)
        y_end = huskylens.readeArrow(1, Content2.yTarget)
        cal_diff_x = x_begin - x_end
        cal_diff_y = y_begin - y_end
        cal_slope = cal_diff_x * 10 / cal_diff_y
        huskylens.writeOSD(convertToText(cal_slope), 200, 180)
        if (x_end < 120) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
        } else if (x_end < 200) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        }
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
    basic.pause(100)
})
