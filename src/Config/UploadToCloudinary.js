export const uploadToCloudinary = async(image)=>{
    if(image){
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","instagram")
        data.append("cloud_name", "dnovba54g")


        const res = await fetch("https://api.cloudinary.com/v1_1/dnovba54g/image/upload",{
            method:"POST",
            body: data,
        })
        const fileData = await res.json();
        console.log("fileData ",fileData)
        return fileData.url.toString();

    }
}