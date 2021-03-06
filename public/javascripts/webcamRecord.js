var recorder = null; 
var video;

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function postBlob(event){
    if (event.data && event.data.size > 0){
        sendBlobAsBase64(event.data);
    }
}

function sendBlobAsBase64(blob){
    const reader = new FileReader();

    reader.addEventListener('load', ()=>{
        const dataUrl = reader.result;
        const base64EncodedData = dataUrl.split(',')[1];
        sendDataToBackend(base64EncodedData);
    });
}

function sendDataToBackend(b64data){
	text1 = document.getElementById('title').value;
	text2 = document.getElementById('description');
	text3temp = document.getElementById('tags');
	text3 = JSON.stringify(text3temp.split(" "));
    const body = JSON.stringify({data:b64data, title:$("#title").val(), description : $("#description").val(), tags:JSON.stringify($("#tags").val().split(",").split(" ")), user:user, obj:obj });
    fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    }).then(res => {
        return res.json();
    });
}

function upload() {
	text1 = document.getElementById('title').value;
	text2 = document.getElementById('description').value;
	text3 = document.getElementById('tags').value;
	if(text1.length == 0 || text2.length == 0 || text3.length == 0){
		alert("Los datos no están llenos. Llenar los datos y luego volver a presionar el boton subir");
		return;
	}
	
    document.getElementById('btn-start-recording').disabled = true;
    document.getElementById('btn-stop-recording').disabled = true;
    
    var csrftoken = getCookie('csrftoken');
    var blob = recorder.getBlob();
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
    var formData = new FormData(document.getElementById('form'));
    formData.append("blob", blob, 'video'); //not using name
                                            // so it's called video
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './upload', true);
    xhr.setRequestHeader("X-CSRFToken", csrftoken );
    //xhr.setRequestHeader("PromptID", String(promptID).split("_")[0]);
    //xhr.setRequestHeader("length", recordingTime);
/*
    //progressBar = document.getElementById('progress');
    //progressBar.value = 0;
    //$('#progress').show();

    // Visualize upload progress
    xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
            progressBar.value = (e.loaded / e.total) * 100;
            progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
        }
    };
*/
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
                window.location.replace("./success.html");
        } else if (xhr.readyState == 4 && xhr.status == 400 || xhr.readyState == 4 && xhr.status == 500) {
            alert("Error while Uploading - The admins have been notified. Please try again later")
        }
    };
    xhr.send(formData);
};

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('No se puede accesar a la cámara. Avisar al administrador');
        console.error(error);
    });
};

function stopRecordingCallback() {
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());
};

//SETTER for HTML
function startRec() {
    if(recorder !== null){
        recorder.camera.stop();
        recorder.destroy();
        recorder = null;
    };
    video = document.querySelector('video');
    this.disabled = true;
    captureCamera(function(camera) {
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
        recorder = RecordRTC(camera, {
            type: 'video/webm;codecs=vp8'
        });
        recorder.startRecording();
        recorder.camera = camera;
        document.getElementById('btn-upload').disabled = true;
        document.getElementById('btn-stop-recording').disabled = false;
    });
};

function stopRec() {
    this.disabled = true;
    document.getElementById("btn-upload").disabled = false;
    recorder.stopRecording(stopRecordingCallback);
};








