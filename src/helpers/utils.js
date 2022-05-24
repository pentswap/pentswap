import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import {
    storage
} from "./firebase.js";






export default function uploadImage(file, callback, errorCallback, progressCallback) {

    const storageRef = ref(storage, 'launchpads/logos/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressCallback(progress, snapshot.state);
        },
        (error) => {
            errorCallback(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                callback(downloadURL);
            });
        }
    );
}