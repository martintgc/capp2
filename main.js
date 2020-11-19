$(document).ready(() => {

    console.log("adapter.js says this is " + adapter.browserDetails.browser + " " + adapter.browserDetails.version);
    if (!navigator.getUserMedia) {
        alert('You need a browser that supports WebRTC');
        $("div").hide();
        return;
    }

};)

function gum(candidate, device) {
    console.log("trying " + candidate.label + " on " + device.label);

    //Kill any running streams;
    if (stream) {
        stream.getTracks().forEach((track) => {
            track.stop();
        });
    }

    //create constraints object
    let constraints = {
        audio: false,
        video: {
            deviceId: device.id ? {exact: device.id} : undefined,
            width: {exact: candidate.width},    //new syntax
            height: {exact: candidate.height}   //new syntax
        }
    };

    setTimeout(() => {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotStream)
            .catch((error) => {
                console.log('getUserMedia error!', error);

                if (scanning) {
                    captureResults("fail: " + error.name);
                }
            });
    }, (stream ? 200 : 0));  //official examples had this at 200

