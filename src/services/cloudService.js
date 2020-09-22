export const cloudService = {
    uploadImg
}
async function uploadImg(file) {
    
    const CLOUD_NAME = "dyslqd6pn"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData();
    // const file = ev.target.files[0]
    console.log(file)
    formData.append('file', file)
    formData.append('upload_preset', 'ld9rlgmy');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        return data.secure_url
    } catch (err) {
        console.log(err);
    }
}