import { API_ENDPOINT, Device } from "./api";
import { auth } from "./firebase";

export function calibrateFragment(
    start_time: number,
    delay: number,
    lightCount: number
) {
    let start_seconds = start_time / 1000;
    let delay_seconds = delay / 1000;
    return `calibrate_fragment, ${lightCount}, ${start_seconds}, ${delay_seconds}`;
}

export async function sendPatternRequest(deviceId: string, patternId: string) {

    try {
        const idToken = await auth.currentUser?.getIdToken();

        if (!idToken) {
            console.error("not logged in");
            return;
        }


        const assign_res = await fetch(API_ENDPOINT + "/user/device_pattern", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: idToken,
            },
            body: JSON.stringify({
                device_id: deviceId,
                pattern_id: patternId,
            }),
        });

        const assign_ret = await assign_res.json();
        console.log({ assign_ret });
    } catch (e) {
        console.error("failed to set pattern: ", e)
    }


}

export async function sendCalibrateRequest(
    deviceId: string,
    lightCount: number,
    time: number,
    delay: number,
    setMessage: (a: string) => void
) {
    try {
        setMessage("sending");

        const idToken = await auth.currentUser?.getIdToken();

        if (!idToken) {
            setMessage("not logged in");
            return;
        }

        const pattern_res = await fetch(API_ENDPOINT + "/user/pattern", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: idToken,
            },
            body: JSON.stringify({
                content: calibrateFragment(time, delay, lightCount),
            }),
        });

        const pattern_ret = await pattern_res.json();

        if (!pattern_ret.id) {
            setMessage("couldn't create pattern");
        }

        const assign_res = await fetch(API_ENDPOINT + "/user/device_pattern", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: idToken,
            },
            body: JSON.stringify({
                device_id: deviceId,
                pattern_id: pattern_ret.id,
            }),
        });

        const assign_ret = await assign_res.json();
        console.log({ assign_ret });

        setMessage("sent");
    } catch (e) {
        console.log(e);
        setMessage("failed");
    }
}
